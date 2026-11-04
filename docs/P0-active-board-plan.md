# P0 方案 · 顶部活跃区 + 未置顶待审批卡板内审批

> ⚠️ 已合并入 docs/P0优化方案.md，本文仅作历史参考。

> 注：板内视图结构经 P0-② 讨论后调整为「顶部固定栏 + 活跃/全部 切换」，本文 §5 的三段式渲染以 `docs/P0-view-toggle-plan.md` 为准（活跃判定/窗口/排序等核心逻辑不变）。


> 状态：**已定稿，待实现**（2026-11-03 讨论确认）
> 范围：DeepSeek Harness「Session Board」插件（`@local/dsh-session-board`）
> 约束：**纯客户端改动**，不改 Host、不改数据库 schema、不新增会话事件/投影、不写官方 pin 注册表。

---

## 1. 背景与目标

当前看板的「置顶区」完全依赖用户手动 pin（官方 `pinnedSessionIds` 注册表，与左侧栏共享、跨设备同步）。实际使用中，置顶区应该承载「我正在处理、需要盯着的会话」，但手动维护成本高、容易漏。

本方案把顶部改造成**两段**：

1. **置顶（手动）**：官方 pin 注册表里的会话，行为不变。
2. **正在处理（自动）**：由会话实时状态**派生**出的活跃会话（运行中 / 待审批 / 最近活跃的已完成），自动收纳、到期自动离开。

同时把「未置顶的待审批卡片」纳入**板内直接审批**——这些卡本来就会落进「正在处理」段，因此在段内展开审批抽屉即可，无需先置顶。

---

## 2. 已确认决策（决策记录）

| # | 决策 | 说明 |
|---|------|------|
| 1 | 新增「正在处理」活跃区，成员含「最近活跃」 | 见 §4 判定规则 |
| 2 | 清退只做「取消置顶 / 从活跃区移除」 | 不归档、不删除 |
| 3 | 顶部拆两段：上「置顶」(手动)、下「正在处理」(自动) | 来源清晰 |
| 4 | 活跃区按状态排序，越早完成越靠后 | pending → running → done，同级按 updatedAt 降序 |
| 5 | 状态一律用**卡片底色**表示 | 置顶段的已完成卡显示绿底，**不额外加「已完成」徽标** |
| 6 | 卡片底部的小状态标签（圆点+文字）**保留** | 作色觉辅助，与顶部图例呼应 |
| 7 | 活跃窗口默认 **1 小时**，设置页可改（30 分钟 / 1 小时 / 一直显示） | 见 §7 |

---

## 3. 数据模型与分区规则

每张卡片**只出现在一个区**，去重铁律：**手动置顶优先**。

| 分区 | 成员判定 | 排序 |
|------|----------|------|
| ① 置顶（手动） | 在官方 `pinnedSessionIds` 注册表里 | 沿用 registry 顺序（尊重手动排序） |
| ② 正在处理（自动） | 未手动置顶，且 `running` 或 `pending` 或（`done` 且 `updatedAt` 在窗口内） | pending(0) → running(1) → done(2)；同级按 `updatedAt` 降序 |
| ③ 下方工作区（已退场） | 未置顶、且已不活跃的 `done` | 沿用现有工作区分组 + 「显示全部」折叠 |

状态来源于既有函数（`client.js`）：
- `pendingKindOf`（L821）：`status.pendingInteraction.kind` ∈ approval / plan-review / question / unknown；
- `deriveCardStatus`（L840）：先判 pending，再判 running（含 `hasRunningChild` L828 子代理运行），否则 done。

---

## 4. 活跃判定与排序（函数骨架）

```js
// 新增偏好键（仿 useShowAllCards，L805 模式）
const ACTIVE_WINDOW_KEY = 'session-board:active-window-minutes' // '30' | '60' | '0'(一直显示)，默认 '60'
const ACTIVE_DISMISS_KEY = 'session-board:active-dismissed'     // { [id]: dismissedAtUpdatedAt }

// 活跃判定（纯派生，不写官方 pin 注册表）
function isActiveCard(card, windowMs, now, dismissed) {
  if (card.status.key === 'running' || card.status.key === 'pending') return true   // 在跑/等你，永远活跃
  if (windowMs !== 0 && now - (card.updatedAt || 0) > windowMs * 60000) return false // done 超出窗口 → 退场
  const d = dismissed[card.id]
  if (d !== undefined && d >= (card.updatedAt || 0)) return false                  // 手动 × 收掉，直到再次更新
  return true                                                                       // 窗口内的 done 仍活跃
}

const STATUS_RANK = { pending: 0, running: 1, done: 2 }
const byStatusThenRecency = (a, b) =>
  (STATUS_RANK[a.status.key] - STATUS_RANK[b.status.key]) || (b.updatedAt - a.updatedAt)

// 分区（去重：手动置顶优先）
const pinnedIds = new Set(pinnedCards.map(c => c.id))
const activeCards = cards
  .filter(c => !pinnedIds.has(c.id) && isActiveCard(c, windowMs, now, dismissed))
  .sort(byStatusThenRecency)
const retiredCards = cards.filter(c => !pinnedIds.has(c.id) && !activeCards.includes(c))
```

关键点：`running` 判定**不能只看 updatedAt**——长工具调用期间 `updatedAt` 可能很久不更新，但会话确实在跑；因此 `running` /`pending` 恒为活跃，窗口只作用于 `done`。

---

## 5. 渲染结构改动

把现有「置顶区 + 单一全局抽屉 + 下方分组」（`client.js` L1362–1428）重构为：

```text
<header>                                   （保留，图例/计数）
├─ Section「置顶」(手动)                    → 网格 + 段内抽屉
│    ├─ 段头：钉子图标 + 标题 + 计数 + 「手动固定」说明
│    ├─ dsb-grid(pinnedCards)
│    └─ expandedCard∈本段 ? <ApprovalDrawer/> : null
├─ Section「正在处理」(自动)                 → 网格 + 段内抽屉
│    ├─ 段头：运行/脉冲图标 + 标题 + 计数 + 「按最近活跃自动收纳 · 处置完自动离开」
│    ├─ dsb-grid(activeCards)              → SessionCard（pending 可展开审批；done 卡带 ×）
│    └─ expandedCard∈本段 ? <ApprovalDrawer/> : null
└─ 下方工作区分组(retiredCards)              → 沿用现有分组 + 「显示全部 N 个非活跃会话」
```

- 两段都可为空 → 各自不渲染，避免空壳；全空时仍走现有 `dsb-empty`。
- **抽屉内联**：`ApprovalDrawer` 不再作为独立块渲染在置顶区之后，而是渲染在「展开卡片所属段」的网格之后。
- `expandedCard` 需**跨两段查找**：`cards.find(c => c.id === expandedApprovalId && c.status.key === 'pending')`（原 L1256 仅查 pinnedCards）。

---

## 6. 审批交互改动（并入 P0-1）

- **去掉 pinned 门禁**：`handleActivate`（L1297）中 `if (pinned && card.status.key === 'pending')`（L1298）改为 `if (card.status.key === 'pending')`。任何待审批卡：首点展开抽屉，再点进入会话。
- `SessionCard` 的 `expandable` 由其自身状态决定（`card.status.key === 'pending'`），不再由父级写死 `false`；「置顶」「正在处理」两段统一。
- 下方区（retiredCards）只会是 `done`，不会出现 pending，因此无需在下方处理审批。
- 保留现有并发保护：`approvalBusyId`（防 `answer()` 双击）与 `approvalError`。
- 「已完成待审批」不会出现（pending 优先于 running/done，见 `deriveCardStatus`），无需特判。

---

## 7. 设置与偏好

### 7.1 活跃窗口（新增设置项）
仿 `useShowAllCards`（L805–819）新增 `useActiveWindow`：
- 模块级 `let activeWindow = readActiveWindow()`、`activeWindowListeners`、storage 事件；
- 设置页 `SettingsRow`（L968）/ `SettingsPage`（L987）新增一行**下拉**：30 分钟 / 1 小时 / 一直显示（值 `'30'|'60'|'0'`，默认 `'60'`）；
- 写入 `localStorage[ACTIVE_WINDOW_KEY]`，跨标签页经 storage 事件同步。

### 7.2 「从活跃区移除」= dismiss 集
- React state `dismissed`，初值 `readDismissed()`（`localStorage[ACTIVE_DISMISS_KEY]`，安全解析）。
- 仅对 `done` 卡在活跃段显示**小 × 按钮**：点击 `stopPropagation` → `dismissActive(card.id, card.updatedAt)`，写入 `{ [id]: updatedAt }` 并持久化。
- 语义：`d >= updatedAt` 时隐藏；会话一旦再次更新（`updatedAt` 变大），标记失效、可重新浮出。
- `running` / `pending` 卡**不显示 ×**（移掉也会因状态仍在而回弹）。

---

## 8. 定时重算（功能正确性前提）

`BoardPage` 新增：

```js
const [now, setNow] = React.useState(() => Date.now())
React.useEffect(() => {
  const id = setInterval(() => setNow(Date.now()), 60000)
  return () => clearInterval(id)
}, [])
```

`now` 同时驱动：① 活跃窗口判定（done 到期自动退场）；② `formatRelativeTime` 的「x 分钟前」刷新。**没有它，活跃区不会自动清退**。

---

## 9. 文案（i18n 词条，`locale` 与 client.js 内联字典同步）

新增（zh / en）：
- `group.active` = 「正在处理」/ `Active`
- `group.activeNote` = 「按最近活跃自动收纳 · 处置完自动离开」/ ...
- `settings.activeWindowTitle` / `settings.activeWindowCaption`
- `settings.activeWindow30` / `...60` / `...never`（一直显示）
- `card.dismissActive` = 「从活跃区移除」/ `Remove from active`
- 调整 `settings.title` / `settings.caption` 与 `collapsed.note` 措辞（`showAllCards` 语义从「下方显示全部」变为「是否展开已退场的已完成会话」）。

---

## 10. 代码落点清单（client.js）

| 位置 | 改动 |
|------|------|
| L805–819（`useShowAllCards` 模式） | 仿写 `useActiveWindow` / dismiss 集读写 |
| L821–845（状态函数） | 复用，无需改 |
| L1211–1256（`BoardPage` 取数/分区） | 重写为 pinned / active / retired 三组；`expandedCard` 跨段查找；接入 `now`、`windowMs`、`dismissed` |
| L1297–1310（`handleActivate`） | 去掉 `pinned` 门禁 |
| L1134–1197（`SessionCard`） | `expandable` 自决；`done` 活跃卡加 ×；保留底部状态标签（L1175–1181） |
| L1362–1428（渲染） | 拆两段 + 抽屉内联 + 下方 retained |
| L1389–1402（全局抽屉） | 移入各段网格之后 |
| L968–996（设置） | 新增活跃窗口下拉行 |
| L10–112（字典） | 新增/调整词条 |
| L307–330 / L448–464（CSS） | 卡片底色沿用；新增 × 按钮与活跃段样式 |

---

## 11. 边界与回归风险

1. 抽屉改 inline 后，`expandedCard` 必须跨两段查找，否则展开找不到卡片。
2. 去重铁律：手动置顶优先，活跃段排除已置顶项，否则同一张卡重复出现。
3. `window=0`（一直显示）时 `done` 不会自动离开，靠已完成项的「×」清退；只给 `done` 卡配 ×。
4. `showAllCards` 语义变化：从「下方显示全部」变为「是否展开已退场的 `done`」，文案必须同步，避免误解。
5. 手动 pin/unpin 仍走 `togglePin` → 官方 `pinSession`/`unpinSession`，不写派生逻辑。
6. 定时器务必在 `useEffect` 清理（`clearInterval`），避免热重载残留。

---

## 12. 验收标准

- [ ] 未置顶的待审批卡：首点展开抽屉、可在板内「允许一次 / 拒绝」或选项作答，无需先置顶。
- [ ] 顶部出现两段「置顶」「正在处理」，来源区分清晰；手动置顶卡不出现在活跃段。
- [ ] 活跃段顺序：pending 在 running 前、running 在 done 前；done 越早完成越靠后。
- [ ] 一个会话完成并超过窗口后，自动从活跃段消失（60s 内生效）。
- [ ] 「一直显示」模式下，`done` 卡可用 × 收掉；会话再次更新后能重新浮出。
- [ ] 状态仅靠卡片底色 + 底部小标签表达；置顶段的已完成卡为绿底、无额外徽标。
- [ ] 设置页可切换活跃窗口，刷新后保持。
- [ ] 全程未写官方 pin 注册表、未改 Host/DB。

---

## 13. P0 其余项状态

- ~~侧栏入口图标 / 「返回看板」按钮的待处理数徽标~~ → **已定稿为「颜色制」**（无数字），见 `docs/P0-entry-status-indicator-plan.md`
- ~~板内视图切换~~ → **已定稿：头部「活跃｜全部」两按钮，删设置页开关**，见 `docs/P0-view-toggle-plan.md`
- ~~顶部状态图例点击筛选~~ → **已定稿：维持现状、不做**
- ~~审批队列~~ → **已定稿：维持现状、不做**（答完只关闭、下一个手动点、无翻页、无数字）
