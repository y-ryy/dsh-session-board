# P0-① 方案 · 入口状态提示（侧栏图标 + 返回看板按钮，颜色制）

> ⚠️ 已合并入 docs/P0优化方案.md，本文仅作历史参考。

> 状态：**已定稿，待实现**（2026-11-03 讨论确认）
> 约束：纯客户端；不改 Host/DB；不覆盖内置 UI（replaceRisk=none）；不引入新依赖。

---

## 1. 目标

不用数字、不打扰，只回答一个问题：**「现在有没有事，需不需要我去看板」**。

- 侧栏「Session Board」图标：有活时**整枚图标变状态色**，没事保持原色。
- 会话页「返回看板」按钮：同样**变色提示**，不带数字。
- 只表达「有没有」，不表达「几个」。

---

## 2. 决策记录

| # | 决策 |
|---|------|
| 1 | 去掉数字计数，改「图标/按钮变色」表达有没有 |
| 2 | 「运行中」也纳入变色（与卡片同色板） |
| 3 | 「返回看板」按钮一起变色 |
| 4 | 侧栏图标在**当前面板被选中（active）时不染色**，避免盖掉选中高亮；只在其他面板时才染色 |

---

## 3. 信号计算（与看板同口径）

复用既有 `deriveCardStatus` / `pendingKindOf` / `hasRunningChild`，新增一个聚合函数：

```js
// 排除 blank / subagent / archived，与看板列表一致
function computeEntrySignal(list, statusMap, workspaceState) {
  const result = { hasPending: false, hasRunning: false }
  if (!list || list.phase !== 'ready' || !list.ids) return result
  const archived = new Set((workspaceState && workspaceState.archivedSessionIds) || [])
  for (const id of list.ids) {
    const summary = list.byId && list.byId[id]
    if (!summary || summary.blank || summary.origin === 'subagent' || archived.has(id)) continue
    const raw = statusMap && typeof statusMap.get === 'function' ? statusMap.get(id) : undefined
    const status = deriveCardStatus(summary, raw, statusMap, list)
    if (status.key === 'pending') result.hasPending = true
    else if (status.key === 'running') result.hasRunning = true
    if (result.hasPending && result.hasRunning) break
  }
  return result
}

function entryTone(signal) {
  if (signal.hasPending) return 'var(--dsw-alias-state-warn-primary)' // 待审批/待回答 → 警示黄
  if (signal.hasRunning) return 'var(--dsb-running-accent)'           // 运行中 → 雾蓝
  return null                                                         // 都没有 → 原色
}
```

颜色优先级：**有待审批（黄）> 仅运行中（蓝）> 无（原色）**。

---

## 4. 侧栏图标（BoardIcon，L1122）

```js
function BoardIcon(props) {
  const size = props && props.size ? props.size : 16
  const list = props.useSessions((s) => s)          // standardProps 自动注入，无需改 inject
  const statusMap = props.useSessionStatus((s) => s)
  const ws = props.useWorkspaces((s) => s)
  const tone = props.active ? null : entryTone(computeEntrySignal(list, statusMap, ws))
  return h('svg', {
    width: size, height: size, viewBox: '0 0 16 16', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.25, strokeLinecap: 'round', strokeLinejoin: 'round',
    'aria-hidden': true,
    style: tone ? { color: tone } : undefined      // 内联 color 让 currentColor 取该色
  }, /* 原路径不变 */)
}
```

---

## 5. 返回看板按钮（BackToBoardButton，L1454）

```js
function BackToBoardButton(props) {
  const t = typeof props.t === 'function' ? props.t : (key) => key
  const list = props.useSessions((s) => s)
  const statusMap = props.useSessionStatus((s) => s)
  const ws = props.useWorkspaces((s) => s)
  const tone = entryTone(computeEntrySignal(list, statusMap, ws))
  return h('button', {
    className: 'dsb-back', type: 'button', title: t('back.label'),
    onClick: props.goBoard,
    style: tone ? { color: tone } : undefined       // 变色、仍不带数字
  }, h(IconBack), h('span', null, t('back.label')))
}
```

> 返回按钮活在会话页（看板非当前面板），无需 active 判断，直接按信号染色。

---

## 6. 技术要点 / 坑

1. **CSS 变量作用域**：`--dsb-running-accent` 目前只定义在 `.dsb-page`（L122-127）里，而侧栏图标与返回按钮**不在 `.dsb-page` 内**，直接引用会失效。需把它提升为全局：
   ```css
   :root { --dsb-running-accent: #3e7ea8; }
   body[data-ds-dark-theme] { --dsb-running-accent: #7fb7d9; }
   ```
   （`.dsb-page` 内原有定义可保留或复用全局。）
2. **Hooks 必须无条件调用**：`useSessions/useSessionStatus/useWorkspaces` 是 standardProps 注入的选择器 hook，组件顶部固定调用；`props.active` 只影响最终是否上色，不影响 hook 调用。
3. **零新依赖**：standardProps 已含上述三个 hook（本机 0.2.1-rc.5 契约已核实），无需改 package.json / inject。
4. **不覆盖内置**：仍用自己的 id 注册（L1508 / L1531），replaceRisk=none。
5. 颜色过渡可加 `transition: color .15s ease`，非必需。

---

## 7. 代码落点（client.js）

| 位置 | 改动 |
|------|------|
| L845 附近 | 新增 `computeEntrySignal` / `entryTone` |
| L1122 BoardIcon | 接三个 hook + active 判断 + style color |
| L1454 BackToBoardButton | 接三个 hook + style color |
| L114–128 CSS | 把 `--dsb-running-accent` 提升到 :root / dark |
| L1508 / L1531 注册 | 不变（standardProps 自动注入） |

---

## 8. 验收标准

- [ ] 有「待审批/待回答」时，侧栏图标为警示黄；仅运行中时为雾蓝；都没有时原色。
- [ ] 当看板面板被选中（active）时，侧栏图标**不染色**（保留选中高亮）。
- [ ] 会话页「返回看板」按钮随信号变色（黄/蓝/原色），且**不带数字**。
- [ ] 状态变化实时反映（store hook 驱动，无需轮询）。
- [ ] 计数口径与看板一致：排除 blank / subagent / archived。
- [ ] 未覆盖任何内置图标；不写官方 pin 注册表；不改 Host/DB。

---

## 9. 不在本块范围

- 侧栏/返回按钮上的**数字计数**（已明确不要）
- 图例点击筛选、板内视图切换、审批队列（P0 其余项，另议）
