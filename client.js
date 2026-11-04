window.__ModuleLoader__.load({
  id: '@local/dsh-session-board',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const PANEL_ID = 'session-board'
    const NS = 'session-board'

    const zh = {
      'panel.title': '会话看板',
      'panel.subtitle': '按工作区查看全部会话 · 卡片颜色表示当前状态',
      'panel.subtitleCollapsed': '仅显示活跃会话 · 卡片颜色表示当前状态',
      'settings.title': '看板下方卡片',
      'settings.caption': '关闭时，下方只显示运行中和待审批的会话；打开后显示全部会话卡片。',
      'settings.sectionLabel': '会话看板',
      'settings.pageTitle': '会话看板',
      'settings.pageCaption': '控制看板下方工作区卡片的显示方式。',
      'collapsed.note': '已收起 {n} 个非活跃会话',
      'collapsed.showAll': '显示全部',
      'approval.expandHint': '点击展开审批',
      'approval.expandedHint': '再次点击进入会话',
      'approval.title': '待审批',
      'approval.planTitle': '计划待确认',
      'approval.questionTitle': '待回答',
      'approval.tool': '工具',
      'approval.allow': '允许一次',
      'approval.reject': '拒绝',
      'approval.submit': '提交回答',
      'approval.close': '收起审批',
      'approval.notAnswerable': '该审批已不可操作',
      'approval.error': '审批操作失败，请重试。',
      'approval.openConversation': '请在会话中完成此操作。',
      'status.running': '运行中',
      'status.pendingApproval': '待审批',
      'status.pendingAnswer': '待回答',
      'status.done': '已完成',
      'group.pinned': '置顶',
      'group.pinnedNote': '手动固定的会话集中显示在这里',
      'group.ungrouped': '未分组',
      'workspace.defaultName': '默认工作区',
      'group.count': '{n} 个会话',
      'card.pin': '固定到顶部',
      'card.unpin': '取消固定',
      'card.untitled': '未命名会话',
      'permission.readOnly': '仅可查看',
      'permission.workspaceWrite': '工作区内修改',
      'permission.fullAccess': '完全权限',
      'permission.custom': '自定义',
      'permission.auto': '自动审查',
      'time.justNow': '刚刚',
      'time.minutesAgo': '{n} 分钟前',
      'time.hoursAgo': '{n} 小时前',
      'time.daysAgo': '{n} 天前',
      'loading': '正在加载会话…',
      'empty.title': '还没有会话',
      'empty.body': '在左侧工作区新建会话后，会显示在这里。',
      'error.pin': '置顶操作失败，请重试。',
      'back.label': '返回看板',
      'view.active': '活跃',
      'view.all': '全部',
      'empty.activeTitle': '当前没有活跃会话',
      'empty.activeBody': '切到「全部」查看已退场的已完成会话。',
      'settings.activeWindowTitle': '活跃区时间窗口',
      'settings.activeWindowCaption': '仅对已完成会话生效：超过该时长仍无活动，就移出「活跃」视图（运行中/待审批始终活跃）。',
      'settings.activeWindow30': '30 分钟',
      'settings.activeWindow60': '1 小时',
      'settings.activeWindowNever': '一直显示',
      'card.dismissActive': '从活跃区移除',
      'settings.pinnedAlwaysTitle': '固定栏常驻',
      'settings.pinnedAlwaysCaption': '固定栏始终显示在看板顶部；关闭后仅在有固定会话时出现。',
      'pinned.empty': '暂无固定会话 · 悬停卡片点图钉固定'
    }

    const en = {
      'panel.title': 'Session Board',
      'panel.subtitle': 'All sessions by workspace · card color shows the current state',
      'panel.subtitleCollapsed': 'Active sessions only · card color shows the current state',
      'settings.title': 'Cards below the board',
      'settings.caption': 'When off, only running and pending sessions appear below; turn on to show all session cards.',
      'settings.sectionLabel': 'Session Board',
      'settings.pageTitle': 'Session Board',
      'settings.pageCaption': 'Control how workspace cards are shown below the board.',
      'collapsed.note': '{n} inactive sessions hidden',
      'collapsed.showAll': 'Show all',
      'approval.expandHint': 'Click to expand approval',
      'approval.expandedHint': 'Click again to open the session',
      'approval.title': 'Pending approval',
      'approval.planTitle': 'Plan awaiting review',
      'approval.questionTitle': 'Waiting for answer',
      'approval.tool': 'Tool',
      'approval.allow': 'Allow once',
      'approval.reject': 'Reject',
      'approval.submit': 'Submit answer',
      'approval.close': 'Collapse approval',
      'approval.notAnswerable': 'This request can no longer be answered',
      'approval.error': 'Could not submit the approval. Please try again.',
      'approval.openConversation': 'Open the session to complete this action.',
      'status.running': 'Running',
      'status.pendingApproval': 'Pending approval',
      'status.pendingAnswer': 'Waiting for answer',
      'status.done': 'Completed',
      'group.pinned': 'Pinned',
      'group.pinnedNote': 'Manually pinned sessions appear here',
      'group.ungrouped': 'Ungrouped',
      'workspace.defaultName': 'Default workspace',
      'group.count': '{n} sessions',
      'card.pin': 'Pin to top',
      'card.unpin': 'Unpin',
      'card.untitled': 'Untitled session',
      'permission.readOnly': 'Read only',
      'permission.workspaceWrite': 'Workspace write',
      'permission.fullAccess': 'Full access',
      'permission.custom': 'Custom',
      'permission.auto': 'Auto review',
      'time.justNow': 'just now',
      'time.minutesAgo': '{n} min ago',
      'time.hoursAgo': '{n} hr ago',
      'time.daysAgo': '{n} days ago',
      'loading': 'Loading sessions…',
      'empty.title': 'No sessions yet',
      'empty.body': 'Create a session in a workspace and it will appear here.',
      'error.pin': 'Could not update the pin. Please try again.',
      'back.label': 'Back to board',
      'view.active': 'Active',
      'view.all': 'All',
      'empty.activeTitle': 'No active sessions',
      'empty.activeBody': 'Switch to All to see completed sessions.',
      'settings.activeWindowTitle': 'Active window',
      'settings.activeWindowCaption': 'Applies to completed sessions only: once idle beyond this, they leave the Active view (running / pending always stay active).',
      'settings.activeWindow30': '30 minutes',
      'settings.activeWindow60': '1 hour',
      'settings.activeWindowNever': 'Always',
      'card.dismissActive': 'Remove from active',
      'settings.pinnedAlwaysTitle': 'Always show pinned bar',
      'settings.pinnedAlwaysCaption': 'Keep the pinned bar at the top of the board; when off it only appears with pinned sessions.',
      'pinned.empty': 'No pinned sessions · hover a card and click the pin'
    }

    const CSS = `
body {
  /* Neumorphic material tokens (self-contained; adopt dsh-neu-theme values when active). */
  --dsb-raise-sm: var(--dsh-neu-raise-sm, inset 0 1px 0 rgba(255,255,255,.72), 0 1px 2px rgba(122,118,108,.14), 3px 3px 8px rgba(122,118,108,.14), -3px -3px 8px rgba(255,255,255,.7));
  --dsb-raise: var(--dsh-neu-raise, inset 0 1px 0 rgba(255,255,255,.82), 0 1px 2px rgba(122,118,108,.16), 6px 6px 14px rgba(122,118,108,.18), -6px -6px 14px rgba(255,255,255,.8));
  --dsb-card-raise: var(--dsh-neu-card-raise, inset 0 1px 0 rgba(255,255,255,.8), 0 0 0 1px rgba(122,118,108,.05), 0 0 8px 1px rgba(122,118,108,.08), 4px 4px 12px rgba(122,118,108,.12), -4px -4px 12px rgba(255,255,255,.7));
  --dsb-card-raise-strong: var(--dsh-neu-card-raise-strong, inset 0 1px 0 rgba(255,255,255,.9), 0 0 0 1px rgba(122,118,108,.07), 0 0 16px 1px rgba(122,118,108,.12), 9px 9px 22px rgba(122,118,108,.2), -8px -8px 22px rgba(255,255,255,.85));
  --dsb-inset: var(--dsh-neu-inset, inset 3px 3px 8px rgba(122,118,108,.13), inset -3px -3px 8px rgba(255,255,255,.68));
  --dsb-inset-sm: var(--dsh-neu-inset-sm, inset 0 0 0 1px rgba(122,118,108,.1));
  --dsb-inset-focus: var(--dsh-neu-inset-focus, inset 4px 4px 10px rgba(122,118,108,.2), inset -4px -4px 10px rgba(255,255,255,.8));
}
body[data-ds-dark-theme] {
  --dsb-raise-sm: var(--dsh-neu-raise-sm, inset 0 1px 0 rgba(255,255,255,.08), 0 1px 2px rgba(0,0,0,.5), 3px 3px 8px rgba(0,0,0,.42), -3px -3px 8px rgba(255,255,255,.035));
  --dsb-raise: var(--dsh-neu-raise, inset 0 1px 0 rgba(255,255,255,.1), 0 1px 2px rgba(0,0,0,.55), 6px 6px 14px rgba(0,0,0,.5), -6px -6px 14px rgba(255,255,255,.045));
  --dsb-card-raise: var(--dsh-neu-card-raise, inset 0 1px 0 rgba(255,255,255,.09), 0 0 0 1px rgba(0,0,0,.2), 0 0 10px 1px rgba(0,0,0,.26), 4px 4px 12px rgba(0,0,0,.42), -4px -4px 12px rgba(255,255,255,.03));
  --dsb-card-raise-strong: var(--dsh-neu-card-raise-strong, inset 0 1px 0 rgba(255,255,255,.12), 0 0 0 1px rgba(0,0,0,.26), 0 0 18px 1px rgba(0,0,0,.34), 9px 9px 22px rgba(0,0,0,.5), -8px -8px 22px rgba(255,255,255,.04));
  --dsb-inset: var(--dsh-neu-inset, inset 3px 3px 8px rgba(0,0,0,.55), inset -3px -3px 8px rgba(255,255,255,.05));
  --dsb-inset-sm: var(--dsh-neu-inset-sm, inset 0 0 0 1px rgba(0,0,0,.3));
  --dsb-inset-focus: var(--dsh-neu-inset-focus, inset 4px 4px 10px rgba(0,0,0,.6), inset -4px -4px 10px rgba(255,255,255,.07));
}
/* Neumorphism palette — cream (light) / ink (dark), applied to the board and its
   settings page only, so the panel carries the dsh-neu-theme look everywhere. */
.dsb-page, .dsb-settings-page {
  --dsw-alias-bg-base: #eae8e3;
  --dsw-alias-bg-layer-1: #eae8e3;
  --dsw-alias-bg-layer-2: #e3e0d9;
  --dsw-alias-bg-layer-3: #dad6cd;
  --dsw-alias-bg-overlay: #f1efe9;
  --dsw-alias-label-primary: #3b3a36;
  --dsw-alias-label-secondary: #6f6d66;
  --dsw-alias-label-tertiary: #928f86;
  --dsw-alias-label-primary-foreground: #ffffff;
  --dsw-alias-brand-primary: #7180d5;
  --dsw-alias-border-l1: rgba(92,89,80,.1);
  --dsw-alias-border-l2: rgba(92,89,80,.16);
  --dsw-alias-state-success-primary: #6f9e7c;
  --dsw-alias-state-success-tertiary: #e2ede4;
  --dsw-alias-state-warn-primary: #cf9857;
  --dsw-alias-state-warn-tertiary: #f6ecdb;
  --dsw-alias-state-error-primary: #cf6f67;
  --dsw-alias-state-business-tertiary: #e3e7f8;
  --dsw-alias-interactive-bg-hover: rgba(92,89,80,.07);
  --dsb-running-bg: #dceaf5;
  --dsb-running-accent: #4f7fa8;
}
body[data-ds-dark-theme] .dsb-page,
body[data-ds-dark-theme] .dsb-settings-page {
  --dsw-alias-bg-base: #21242b;
  --dsw-alias-bg-layer-1: #21242b;
  --dsw-alias-bg-layer-2: #2a2e38;
  --dsw-alias-bg-layer-3: #333846;
  --dsw-alias-bg-overlay: #272b35;
  --dsw-alias-label-primary: #e7e9ef;
  --dsw-alias-label-secondary: #a3a8b5;
  --dsw-alias-label-tertiary: #7e8494;
  --dsw-alias-label-primary-foreground: #1e2129;
  --dsw-alias-brand-primary: #8b99e8;
  --dsw-alias-border-l1: rgba(255,255,255,.07);
  --dsw-alias-border-l2: rgba(255,255,255,.12);
  --dsw-alias-state-success-primary: #84b48f;
  --dsw-alias-state-success-tertiary: #2d3f34;
  --dsw-alias-state-warn-primary: #d9a76a;
  --dsw-alias-state-warn-tertiary: #4a3c28;
  --dsw-alias-state-error-primary: #dd867d;
  --dsw-alias-state-business-tertiary: #343a4c;
  --dsw-alias-interactive-bg-hover: rgba(255,255,255,.05);
  --dsb-running-bg: #26374a;
  --dsb-running-accent: #8fb9dd;
}
.dsb-page {
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  color: var(--dsw-alias-label-primary);
  background-color: var(--dsw-alias-bg-base);
  background-image:
    radial-gradient(125% 72% at 50% -18%, color-mix(in srgb, var(--dsw-alias-brand-primary) 8%, transparent), transparent 60%),
    linear-gradient(158deg, rgba(255, 255, 255, .05), rgba(255, 255, 255, 0) 34%),
    url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.05%27/%3E%3C/svg%3E");
}
body[data-ds-dark-theme] .dsb-page {
  background-image:
    radial-gradient(125% 72% at 50% -18%, color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent), transparent 60%),
    linear-gradient(158deg, rgba(255, 255, 255, .03), rgba(255, 255, 255, 0) 34%),
    url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3CfeColorMatrix type=%27saturate%27 values=%270%27/%3E%3C/filter%3E%3Crect width=%27160%27 height=%27160%27 filter=%27url(%23n)%27 opacity=%270.08%27/%3E%3C/svg%3E");
}
.dsb-header {
  flex: none;
  padding: 24px 30px 16px;
}
.dsb-head-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}
.dsb-eyebrow {
  margin: 0 0 5px;
  color: var(--dsw-alias-brand-primary);
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 1.8px;
}
.dsb-title {
  margin: 0;
  color: var(--dsw-alias-label-primary);
  font-size: 24px;
  line-height: 1.25;
  font-weight: 680;
  letter-spacing: -.5px;
}
.dsb-subtitle {
  margin: 8px 0 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 12.5px;
}
.dsb-head-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 10px;
}
.dsb-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
}
.dsb-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 30px;
  padding: 0 11px;
  border-radius: 10px;
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
  white-space: nowrap;
  box-shadow: var(--dsb-raise-sm);
}
.dsb-legend-item b {
  color: var(--dsw-alias-label-primary);
  font-size: 11.5px;
}
.dsb-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, currentColor 14%, transparent);
}
.dsb-dot--running { background: var(--dsb-running-accent); }
.dsb-dot--pending { background: var(--dsw-alias-state-warn-primary); }
.dsb-dot--done { background: var(--dsw-alias-state-success-primary); }
.dsb-error {
  flex: none;
  margin: 0 30px 12px;
  padding: 9px 12px;
  border-radius: 9px;
  background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 13%, transparent);
  color: var(--dsw-alias-state-error-primary);
  font-size: 11.5px;
}
.dsb-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 4px 30px 36px;
  scrollbar-width: thin;
}
.dsb-scroll::-webkit-scrollbar { width: 9px; }
.dsb-scroll::-webkit-scrollbar-thumb {
  background: var(--dsw-alias-bg-layer-3);
  border-radius: 999px;
  border: 2px solid transparent;
  background-clip: padding-box;
}
.dsb-pinned {
  margin-bottom: 25px;
  padding: 14px 16px 17px;
  border-radius: 20px;
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-1) 55%, var(--dsw-alias-bg-base));
  box-shadow: var(--dsb-inset), inset 0 0 0 1px var(--dsw-alias-border-l1);
}
.dsb-pinned-empty {
  padding: 4px 2px 2px;
  color: var(--dsw-alias-label-tertiary);
  font-size: 11.5px;
}
.dsb-empty { padding: 0 16px; }
.dsb-pinned-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 12px;
}
.dsb-pinned-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--dsw-alias-brand-primary);
  font-size: 12.5px;
  font-weight: 750;
}
.dsb-pinned-title svg { transform: rotate(32deg); }
.dsb-pinned-count {
  min-width: 19px;
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-brand-primary);
  font-size: 10.5px;
  box-shadow: var(--dsb-inset-sm);
}
.dsb-pinned-note {
  color: var(--dsw-alias-label-tertiary);
  font-size: 10.5px;
}
.dsb-group {
  margin-bottom: 24px;
  padding: 14px 16px 16px;
  border-radius: 20px;
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-1) 55%, var(--dsw-alias-bg-base));
  box-shadow: var(--dsb-inset), inset 0 0 0 1px var(--dsw-alias-border-l1);
}
.dsb-group-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 6px 8px;
  margin: -4px -6px 12px;
  border-radius: 10px;
  background: transparent;
  box-shadow: none;
  transition: background .15s ease;
}
.dsb-group-title {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: var(--dsw-alias-label-primary);
  font-size: 13px;
  font-weight: 750;
}
.dsb-group-title svg { color: var(--dsw-alias-brand-primary); opacity: .82; flex: none; }
.dsb-group-count {
  min-width: 19px;
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary);
  font-size: 10.5px;
  font-weight: 700;
  box-shadow: var(--dsb-inset-sm);
}
.dsb-group-path {
  max-width: 48%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: auto;
  color: var(--dsw-alias-label-tertiary);
  font-family: "Cascadia Code", "SFMono-Regular", Consolas, monospace;
  font-size: 10px;
}
.dsb-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(258px, 1fr));
  gap: 16px;
}
.dsb-card-wrap {
  position: relative;
  display: flex;
  min-height: 154px;
}
.dsb-card {
  position: relative;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 154px;
  padding: 14px 16px 13px;
  border: 0;
  border-radius: 18px;
  background-color: var(--status-bg);
  background-image: linear-gradient(145deg, rgba(255, 255, 255, .55), rgba(255, 255, 255, 0) 44%);
  box-shadow: var(--dsb-card-raise);
  cursor: pointer;
  outline: none;
  overflow: hidden;
  transition: transform .2s ease, box-shadow .2s ease, background-color .2s ease;
}
body[data-ds-dark-theme] .dsb-card {
  background-image: linear-gradient(145deg, rgba(255, 255, 255, .06), rgba(255, 255, 255, 0) 44%);
}
.dsb-card--running { --status-bg: color-mix(in srgb, var(--dsb-running-bg) 84%, var(--dsw-alias-bg-layer-1)); }
.dsb-card--pending { --status-bg: color-mix(in srgb, var(--dsw-alias-state-warn-tertiary) 84%, var(--dsw-alias-bg-layer-1)); }
.dsb-card--done { --status-bg: color-mix(in srgb, var(--dsw-alias-state-success-tertiary) 84%, var(--dsw-alias-bg-layer-1)); }
.dsb-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--dsb-card-raise-strong);
}
.dsb-card:active {
  transform: translateY(0);
  box-shadow: var(--dsb-inset-sm);
}
.dsb-card:focus-visible {
  box-shadow: 0 0 0 2px var(--dsw-alias-brand-primary), var(--dsb-card-raise-strong);
}
.dsb-card-top {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding-right: 34px;
  margin-bottom: 12px;
}
.dsb-ws {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  font-weight: 700;
}
.dsb-ws svg { flex: none; opacity: .58; }
.dsb-ws span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsb-pin {
  position: absolute;
  top: 13px;
  right: 14px;
  z-index: 3;
  width: 29px;
  height: 29px;
  border: 0;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-tertiary);
  cursor: pointer;
  box-shadow: var(--dsb-raise-sm);
  transition: color .15s ease, box-shadow .15s ease, transform .15s ease;
}
.dsb-pin:hover {
  color: var(--dsw-alias-brand-primary);
  transform: translateY(-1px);
  box-shadow: var(--dsb-raise);
}
.dsb-pin:active { transform: translateY(0); box-shadow: var(--dsb-inset-sm); }
.dsb-pin[aria-pressed="true"] {
  color: var(--dsw-alias-brand-primary);
  background: var(--dsw-alias-state-business-tertiary);
  box-shadow: var(--dsb-inset);
}
.dsb-pin:disabled {
  opacity: .5;
  cursor: default;
  transform: none;
}
.dsb-card-title {
  flex: 1;
  margin: 0;
  padding-right: 2px;
  color: var(--dsw-alias-label-primary);
  font-size: 14.5px;
  line-height: 1.52;
  font-weight: 650;
  letter-spacing: -.1px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.dsb-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  margin-top: 9px;
}
.dsb-meta-line {
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 10.5px;
  line-height: 1.35;
}
.dsb-meta-line svg {
  width: 12px;
  height: 12px;
  flex: none;
  opacity: .85;
}
.dsb-meta-line span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsb-meta-line--permission-full { color: var(--dsw-alias-state-warn-primary); }
.dsb-meta-line--permission-workspace { color: var(--dsb-running-accent); }
.dsb-meta-line--permission-readonly { color: var(--dsw-alias-state-success-primary); }
.dsb-meta-line--permission-custom,
.dsb-meta-line--permission-auto,
.dsb-meta-line--permission-unknown { color: var(--dsw-alias-label-secondary); }
.dsb-card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 12px;
}
.dsb-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 22px;
  padding: 0 9px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--dsw-alias-bg-base) 45%, var(--dsw-alias-bg-layer-1));
  font-size: 10.5px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: var(--dsb-inset-sm);
}
.dsb-status--running { color: var(--dsb-running-accent); }
.dsb-status--pending { color: var(--dsw-alias-state-warn-primary); }
.dsb-status--done { color: var(--dsw-alias-state-success-primary); }
.dsb-status .dsb-dot { width: 6px; height: 6px; }
.dsb-time {
  color: var(--dsw-alias-label-tertiary);
  font-size: 10.5px;
  white-space: nowrap;
}
.dsb-loading,
.dsb-empty {
  flex: 1;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  color: var(--dsw-alias-label-tertiary);
  text-align: center;
}
.dsb-loading-dots {
  display: inline-flex;
  gap: 4px;
  align-items: center;
}
.dsb-loading-dots i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--dsw-alias-brand-primary);
  animation: dsb-bounce 1.1s infinite ease-in-out;
}
.dsb-loading-dots i:nth-child(2) { animation-delay: .14s; }
.dsb-loading-dots i:nth-child(3) { animation-delay: .28s; }
@keyframes dsb-bounce {
  0%, 80%, 100% { transform: translateY(0); opacity: .4; }
  40% { transform: translateY(-3px); opacity: 1; }
}
.dsb-empty-icon {
  width: 58px;
  height: 58px;
  border-radius: 19px;
  display: grid;
  place-items: center;
  color: var(--dsw-alias-brand-primary);
  background: var(--dsw-alias-bg-layer-1);
  box-shadow: var(--dsb-raise);
  margin-bottom: 3px;
}
.dsb-empty strong { color: var(--dsw-alias-label-secondary); font-size: 14px; }
.dsb-empty span { font-size: 12px; }
.dsb-back {
  height: 30px;
  padding: 0 11px;
  border: 0;
  border-radius: 9px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-brand-primary);
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--dsb-raise-sm);
  transition: box-shadow .15s ease, transform .15s ease;
}
.dsb-back:hover {
  box-shadow: var(--dsb-raise);
  transform: translateX(-1px);
}
.dsb-back:active {
  box-shadow: var(--dsb-inset);
  transform: none;
}
.dsb-card-hint {
  margin-top: 8px;
  color: var(--dsw-alias-state-warn-primary);
  font-size: 10.5px;
  font-weight: 650;
}
.dsb-collapsed-note {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 14px;
  margin: 0 0 18px;
  border-radius: 12px;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-tertiary);
  font-size: 11.5px;
  box-shadow: var(--dsb-inset-sm);
}
.dsb-collapsed-button {
  flex: none;
  border: 0;
  padding: 4px 6px;
  border-radius: 6px;
  background: transparent;
  color: var(--dsw-alias-brand-primary);
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
}
.dsb-collapsed-button:hover { background: var(--dsw-alias-interactive-bg-hover); }
.dsb-approval-drawer {
  margin: -8px 0 26px;
  padding: 17px 18px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 18px;
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-1) 86%, transparent);
  backdrop-filter: blur(16px) saturate(1.2);
  -webkit-backdrop-filter: blur(16px) saturate(1.2);
  box-shadow: var(--dsb-card-raise-strong);
  animation: dsb-drawer-in .2s ease-out;
}
@keyframes dsb-drawer-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: none; }
}
.dsb-approval-head {
  display: flex;
  align-items: center;
  gap: 8px;
}
.dsb-approval-icon {
  width: 23px;
  height: 23px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  background: var(--dsw-alias-state-warn-tertiary);
  color: var(--dsw-alias-state-warn-primary);
  font-size: 11px;
  font-weight: 800;
  box-shadow: var(--dsb-raise-sm);
}
.dsb-approval-title {
  color: var(--dsw-alias-state-warn-primary);
  font-size: 12.5px;
  font-weight: 750;
}
.dsb-approval-session {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
}
.dsb-approval-close {
  margin-left: auto;
  flex: none;
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--dsw-alias-label-tertiary);
  cursor: pointer;
  font-size: 17px;
  line-height: 1;
}
.dsb-approval-close:hover { background: var(--dsw-alias-interactive-bg-hover); color: var(--dsw-alias-label-primary); }
.dsb-approval-body { margin-top: 12px; }
.dsb-approval-tool {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
}
.dsb-approval-tool code {
  padding: 2px 6px;
  border-radius: 5px;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-primary);
  font-family: "Cascadia Code", "SFMono-Regular", Consolas, monospace;
  font-size: 10.5px;
  box-shadow: var(--dsb-inset-sm);
}
.dsb-approval-reason {
  margin: 9px 0 0;
  color: var(--dsw-alias-label-primary);
  font-size: 12px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}
.dsb-approval-actions { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 14px; }
.dsb-btn {
  height: 32px;
  padding: 0 14px;
  border-radius: 9px;
  border: 0;
  font-size: 11.5px;
  font-weight: 650;
  cursor: pointer;
  transition: box-shadow .15s ease, transform .15s ease;
}
.dsb-btn:disabled { opacity: .5; cursor: default; transform: none; }
.dsb-btn--primary {
  background: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-label-primary-foreground);
  box-shadow: var(--dsb-raise-sm);
}
.dsb-btn--primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: var(--dsb-raise); }
.dsb-btn--primary:active:not(:disabled) { transform: translateY(0); box-shadow: var(--dsb-inset-sm); }
.dsb-btn--ghost {
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary);
  box-shadow: var(--dsb-raise-sm);
}
.dsb-btn--ghost:hover:not(:disabled) { color: var(--dsw-alias-label-primary); transform: translateY(-1px); box-shadow: var(--dsb-raise); }
.dsb-btn--ghost:active:not(:disabled) { transform: translateY(0); box-shadow: var(--dsb-inset-sm); }
.dsb-approval-error {
  margin-top: 11px;
  color: var(--dsw-alias-state-error-primary);
  font-size: 11.5px;
}
.dsb-question { display: flex; flex-direction: column; gap: 14px; }
.dsb-question-block { display: flex; flex-direction: column; gap: 8px; }
.dsb-question-title { color: var(--dsw-alias-label-primary); font-size: 12.5px; font-weight: 650; line-height: 1.55; }
.dsb-question-detail {
  max-height: 180px;
  overflow: auto;
  padding: 10px 11px;
  border-radius: 10px;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 1.6;
  white-space: pre-wrap;
  box-shadow: var(--dsb-inset-sm);
}
.dsb-question-options { display: flex; flex-wrap: wrap; gap: 7px; }
.dsb-option {
  padding: 7px 11px;
  border-radius: 9px;
  border: 0;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
  cursor: pointer;
  text-align: left;
  box-shadow: var(--dsb-raise-sm);
  transition: box-shadow .15s ease, color .15s ease;
}
.dsb-option:hover { color: var(--dsw-alias-label-primary); box-shadow: var(--dsb-raise); }
.dsb-option[aria-pressed="true"] {
  background: var(--dsw-alias-state-business-tertiary);
  color: var(--dsw-alias-label-primary);
  box-shadow: var(--dsb-inset);
}
.dsb-question-submit { align-self: flex-start; }
.dsb-settings-page {
  max-width: 760px;
  padding: 4px 0 28px;
}
.dsb-settings-page-title {
  margin: 0;
  color: var(--dsw-alias-label-primary);
  font-size: 20px;
  line-height: 1.3;
  font-weight: 650;
  letter-spacing: -.3px;
}
.dsb-settings-page-caption {
  margin: 7px 0 18px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12.5px;
  line-height: 1.6;
}
.dsb-settings-card {
  padding: 2px 18px;
  border-radius: 18px;
  background: var(--dsw-alias-bg-layer-1);
  box-shadow: var(--dsb-card-raise);
}
.dsb-settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 16px 0;
}
.dsb-settings-row + .dsb-settings-row {
  border-top: 1px solid var(--dsw-alias-border-l1);
}
.dsb-settings-copy { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.dsb-settings-title { color: var(--dsw-alias-label-primary); font-size: 14px; line-height: 22px; }
.dsb-settings-caption { color: var(--dsw-alias-label-tertiary); font-size: 12px; line-height: 18px; }
.dsb-switch {
  position: relative;
  flex: none;
  width: 38px;
  height: 22px;
  padding: 2px;
  border: 0;
  border-radius: 999px;
  background: var(--dsw-alias-bg-layer-3);
  cursor: pointer;
  box-shadow: var(--dsb-inset-sm);
  transition: background .18s ease;
}
.dsb-switch::after {
  content: "";
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--dsw-alias-bg-layer-1);
  box-shadow: var(--dsb-raise-sm);
  transition: transform .18s ease;
}
.dsb-switch[aria-checked="true"] { background: var(--dsw-alias-brand-primary); }
.dsb-switch[aria-checked="true"]::after { transform: translateX(16px); }
:root { --dsb-running-accent: #3e7ea8; }
body[data-ds-dark-theme] { --dsb-running-accent: #7fb7d9; }
.dsb-viewswitch {
  display: inline-flex;
  padding: 3px;
  gap: 3px;
  border-radius: 11px;
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 65%, var(--dsw-alias-bg-base));
  box-shadow: var(--dsb-inset-sm);
}
.dsb-view-btn {
  border: 0;
  height: 26px;
  padding: 0 13px;
  border-radius: 8px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  transition: color .15s ease, background .15s ease, box-shadow .15s ease;
}
.dsb-view-btn:hover { color: var(--dsw-alias-label-primary); }
.dsb-view-btn--active {
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-brand-primary);
  box-shadow: var(--dsb-raise-sm);
}
.dsb-select {
  flex: none;
  height: 30px;
  padding: 0 10px;
  border-radius: 9px;
  border: 0;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-primary);
  font-size: 12px;
  cursor: pointer;
  box-shadow: var(--dsb-inset-sm);
}
.dsb-dismiss {
  position: absolute;
  top: 13px;
  right: 50px;
  z-index: 3;
  width: 29px;
  height: 29px;
  border: 0;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-tertiary);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  box-shadow: var(--dsb-raise-sm);
  transition: color .15s ease, box-shadow .15s ease;
}
.dsb-dismiss:hover { color: var(--dsw-alias-state-error-primary); box-shadow: var(--dsb-raise); }
.dsb-dismiss:active { box-shadow: var(--dsb-inset-sm); }
.dsb-active { margin-bottom: 27px; padding: 0 16px; }
.dsb-section-in { animation: dsb-section-in .26s ease; }
@keyframes dsb-section-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}
.dsb-group-head--clickable { cursor: pointer; user-select: none; }
.dsb-group-head--clickable:hover { background: var(--dsw-alias-interactive-bg-hover); }
.dsb-group-head--clickable:hover .dsb-group-title { color: var(--dsw-alias-brand-primary); }
.dsb-group-caret { flex: none; display: inline-block; color: var(--dsw-alias-label-tertiary); font-size: 11px; margin-left: 8px; padding-left: 8px; transition: transform .26s ease; }
.dsb-group-caret--collapsed { transform: rotate(-90deg); }
.dsb-group-body { overflow: hidden; transition: height .28s ease; }
.dsb-group-body-inner { opacity: 1; transform: none; transition: opacity .2s ease, transform .26s ease; }
.dsb-group-body--collapsed .dsb-group-body-inner { opacity: 0; transform: translateY(-6px); }
.dsb-group--collapsed { padding-bottom: 8px; }
.dsb-group--collapsed .dsb-group-head { margin-bottom: 0; }
@media (max-width: 760px) {
  .dsb-header { padding: 18px 18px 13px; }
  .dsb-scroll { padding: 4px 18px 30px; }
  .dsb-error { margin-left: 18px; margin-right: 18px; }
  .dsb-legend { justify-content: flex-start; }
  .dsb-head-right { width: 100%; justify-content: flex-start; }
  .dsb-grid { grid-template-columns: 1fr; }
  .dsb-group-path { display: none; }
  .dsb-back span { display: none; }
  .dsb-back { width: 30px; padding: 0; justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .dsb-card, .dsb-pin, .dsb-back, .dsb-option, .dsb-dismiss, .dsb-view-btn { transition: none; }
  .dsb-card:hover, .dsb-pin:hover, .dsb-back:hover, .dsb-option:hover { transform: none; }
  .dsb-loading-dots i { animation: none; }
  .dsb-section-in { animation: none; }
  .dsb-group-body, .dsb-group-caret, .dsb-group-body-inner { transition: none; }
}
`

    const SHOW_ALL_KEY = 'dsh.session-board.show-all-cards.v1'
    let showAllCards = readShowAllCards()
    const showAllCardsListeners = new Set()

    function readShowAllCards() {
      try { return window.localStorage.getItem(SHOW_ALL_KEY) === '1' } catch (error) { return false }
    }

    function setShowAllCards(value) {
      const next = value === true
      if (showAllCards === next) return
      showAllCards = next
      try { window.localStorage.setItem(SHOW_ALL_KEY, next ? '1' : '0') } catch (error) { /* local preference only */ }
      for (const listener of showAllCardsListeners) {
        try { listener() } catch (error) { console.error('[session-board] preference listener failed', error) }
      }
    }

    function useShowAllCards() {
      const [value, setValue] = React.useState(showAllCards)
      React.useEffect(() => {
        const listener = () => setValue(readShowAllCards())
        const onStorage = (event) => { if (event.key === SHOW_ALL_KEY) listener() }
        showAllCardsListeners.add(listener)
        window.addEventListener('storage', onStorage)
        listener()
        return () => {
          showAllCardsListeners.delete(listener)
          window.removeEventListener('storage', onStorage)
        }
      }, [])
      return value
    }

    const ACTIVE_WINDOW_KEY = 'session-board:active-window-minutes'
    const COLLAPSED_WS_KEY = 'session-board:collapsed-workspaces'
    const ACTIVE_DISMISS_KEY = 'session-board:active-dismissed'

    let activeWindowMinutes = readActiveWindowMinutes()
    const activeWindowListeners = new Set()

    function readActiveWindowMinutes() {
      try {
        const raw = window.localStorage.getItem(ACTIVE_WINDOW_KEY)
        if (raw === '0' || raw === '30' || raw === '60') return raw
      } catch (error) { /* local preference only */ }
      return '60'
    }

    function setActiveWindowMinutes(value) {
      const next = value === '0' || value === '30' || value === '60' ? value : '60'
      if (activeWindowMinutes === next) return
      activeWindowMinutes = next
      try { window.localStorage.setItem(ACTIVE_WINDOW_KEY, next) } catch (error) { /* local only */ }
      for (const listener of activeWindowListeners) {
        try { listener() } catch (error) { console.error('[session-board] preference listener failed', error) }
      }
    }

    function useActiveWindowMinutes() {
      const [value, setValue] = React.useState(activeWindowMinutes)
      React.useEffect(() => {
        const listener = () => setValue(readActiveWindowMinutes())
        const onStorage = (event) => { if (event.key === ACTIVE_WINDOW_KEY) listener() }
        activeWindowListeners.add(listener)
        window.addEventListener('storage', onStorage)
        listener()
        return () => {
          activeWindowListeners.delete(listener)
          window.removeEventListener('storage', onStorage)
        }
      }, [])
      return value
    }

    let collapsedWorkspaces = readCollapsedWorkspaces()
    const collapsedWorkspacesListeners = new Set()

    function readCollapsedWorkspaces() {
      try {
        const raw = window.localStorage.getItem(COLLAPSED_WS_KEY)
        const arr = raw ? JSON.parse(raw) : []
        return new Set(Array.isArray(arr) ? arr : [])
      } catch (error) { return new Set() }
    }

    function setWorkspaceCollapsed(workspaceId, collapsed) {
      if (collapsed) collapsedWorkspaces.add(workspaceId)
      else collapsedWorkspaces.delete(workspaceId)
      try { window.localStorage.setItem(COLLAPSED_WS_KEY, JSON.stringify([...collapsedWorkspaces])) } catch (error) { /* local only */ }
      for (const listener of collapsedWorkspacesListeners) {
        try { listener() } catch (error) { console.error('[session-board] preference listener failed', error) }
      }
    }

    function useCollapsedWorkspaces() {
      const [value, setValue] = React.useState(() => new Set(collapsedWorkspaces))
      React.useEffect(() => {
        const listener = () => setValue(readCollapsedWorkspaces())
        const onStorage = (event) => { if (event.key === COLLAPSED_WS_KEY) listener() }
        collapsedWorkspacesListeners.add(listener)
        window.addEventListener('storage', onStorage)
        return () => {
          collapsedWorkspacesListeners.delete(listener)
          window.removeEventListener('storage', onStorage)
        }
      }, [])
      return value
    }

    function readDismissedActive() {
      try {
        const raw = window.localStorage.getItem(ACTIVE_DISMISS_KEY)
        const obj = raw ? JSON.parse(raw) : {}
        return obj && typeof obj === 'object' && !Array.isArray(obj) ? obj : {}
      } catch (error) { return {} }
    }

    function useDismissedActive() {
      const [value, setValue] = React.useState(readDismissedActive)
      const dismiss = React.useCallback((id, updatedAt) => {
        setValue((previous) => {
          const next = { ...previous, [id]: updatedAt }
          try { window.localStorage.setItem(ACTIVE_DISMISS_KEY, JSON.stringify(next)) } catch (error) { /* local only */ }
          return next
        })
      }, [])
      return [value, dismiss]
    }

    const PINNED_ALWAYS_KEY = 'session-board:pinned-always'
    let pinnedAlways = readPinnedAlways()
    const pinnedAlwaysListeners = new Set()

    function readPinnedAlways() {
      try { return window.localStorage.getItem(PINNED_ALWAYS_KEY) !== '0' } catch (error) { return true }
    }

    function setPinnedAlways(value) {
      const next = value === true
      if (pinnedAlways === next) return
      pinnedAlways = next
      try { window.localStorage.setItem(PINNED_ALWAYS_KEY, next ? '1' : '0') } catch (error) { /* local only */ }
      for (const listener of pinnedAlwaysListeners) {
        try { listener() } catch (error) { console.error('[session-board] preference listener failed', error) }
      }
    }

    function usePinnedAlways() {
      const [value, setValue] = React.useState(pinnedAlways)
      React.useEffect(() => {
        const listener = () => setValue(readPinnedAlways())
        const onStorage = (event) => { if (event.key === PINNED_ALWAYS_KEY) listener() }
        pinnedAlwaysListeners.add(listener)
        window.addEventListener('storage', onStorage)
        listener()
        return () => {
          pinnedAlwaysListeners.delete(listener)
          window.removeEventListener('storage', onStorage)
        }
      }, [])
      return value
    }

    function pendingKindOf(status) {
      if (!status || !status.pendingInteraction) return undefined
      const kind = status.pendingInteraction.kind
      if (kind === 'approval' || kind === 'plan-review' || kind === 'question') return kind
      return 'unknown'
    }

    function hasRunningChild(list, statuses, sessionId) {
      const projection = list && list.projectionsBySession && list.projectionsBySession[sessionId]
      const children = projection && projection.values && projection.values.subagentCatalog
      if (!Array.isArray(children)) return false
      for (const child of children) {
        const childStatus = statuses && typeof statuses.get === 'function' ? statuses.get(child.id) : undefined
        const childRow = list.byId && list.byId[child.id]
        if ((childStatus && childStatus.running === true) || (childRow && childRow.running === true)) return true
      }
      return false
    }

    function deriveCardStatus(summary, status, statusMap, list) {
      const pendingKind = pendingKindOf(status)
      if (pendingKind !== undefined) return { key: 'pending', pendingKind }
      const running = (status && status.running === true) || (summary && summary.running === true) || hasRunningChild(list, statusMap, summary && summary.id)
      return running ? { key: 'running' } : { key: 'done' }
    }

    function isActiveCard(card, windowMs, now, dismissed) {
      if (card.status.key === 'running' || card.status.key === 'pending') return true
      if (windowMs !== 0 && now - (card.updatedAt || 0) > windowMs * 60000) return false
      const dismissedAt = dismissed && dismissed[card.id]
      if (dismissedAt !== undefined && dismissedAt >= (card.updatedAt || 0)) return false
      return true
    }

    const STATUS_RANK = { pending: 0, running: 1, done: 2 }
    function byStatusThenRecency(a, b) {
      return (STATUS_RANK[a.status.key] - STATUS_RANK[b.status.key]) || (b.updatedAt - a.updatedAt)
    }

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
      if (signal.hasPending) return 'var(--dsw-alias-state-warn-primary)'
      if (signal.hasRunning) return 'var(--dsb-running-accent)'
      return null
    }
    function statusLabel(status, t) {
      if (status.key === 'pending') {
        return t(status.pendingKind === 'question' ? 'status.pendingAnswer' : 'status.pendingApproval')
      }
      if (status.key === 'running') return t('status.running')
      return t('status.done')
    }

    function workspaceDisplayName(workspace, t) {
      if (!workspace) return t('group.ungrouped')
      if (!workspace.title || workspace.title === 'default-workspace') {
        return t('workspace.defaultName')
      }
      return workspace.title
    }

    function formatRelativeTime(value, t) {
      if (!value) return ''
      const diff = Math.max(0, Date.now() - Number(value))
      if (diff < 60 * 1000) return t('time.justNow')
      const minutes = Math.floor(diff / (60 * 1000))
      if (minutes < 60) return t('time.minutesAgo', { n: minutes })
      const hours = Math.floor(minutes / 60)
      if (hours < 24) return t('time.hoursAgo', { n: hours })
      const days = Math.floor(hours / 24)
      if (days < 30) return t('time.daysAgo', { n: days })
      try { return new Date(Number(value)).toLocaleDateString() } catch (error) { return '' }
    }

    function projectionValueOf(list, summary, sessionId, key) {
      return list && list.projectionsBySession && list.projectionsBySession[sessionId] && list.projectionsBySession[sessionId].values
        ? list.projectionsBySession[sessionId].values[key]
        : summary && summary.projectionValues
          ? summary.projectionValues[key]
          : undefined
    }

    function modelLabelOf(selection) {
      const selected = selection && (selection.next !== undefined ? selection.next : selection.lastUsed)
      const model = selected && selected.model
      if (!model) return ''
      const effort = selected.reasoningEffort
      if (!effort) return String(model)
      const effortText = String(effort)
      return `${String(model)} · ${effortText.charAt(0).toUpperCase()}${effortText.slice(1)}`
    }

    function permissionInfoOf(selection, t) {
      const value = selection && selection.currentValue
      switch (value) {
        case 'read-only': return { label: t('permission.readOnly'), tone: 'readonly' }
        case 'workspace-write': return { label: t('permission.workspaceWrite'), tone: 'workspace' }
        case 'danger-full-access': return { label: t('permission.fullAccess'), tone: 'full' }
        case 'custom': return { label: t('permission.custom'), tone: 'custom' }
        case 'auto': return { label: t('permission.auto'), tone: 'auto' }
        default:
          if (typeof value === 'string' && value !== '') return { label: value, tone: 'unknown' }
          return null
      }
    }

    function IconFolder(props) {
      const size = props && props.size ? props.size : 13
      return h('svg', {
        width: size, height: size, viewBox: '0 0 16 16', fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.15, strokeLinecap: 'round',
        strokeLinejoin: 'round', 'aria-hidden': true
      }, h('path', { d: 'M1.9 4.1A1.2 1.2 0 0 1 3.1 3h3l1.4 1.6h5.4a1.2 1.2 0 0 1 1.2 1.2v6.1a1.2 1.2 0 0 1-1.2 1.2H3.1a1.2 1.2 0 0 1-1.2-1.2V4.1Z' }))
    }

    function IconPin(props) {
      const filled = props && props.filled
      return h('svg', {
        width: 14, height: 14, viewBox: '0 0 24 24',
        fill: filled ? 'currentColor' : 'none',
        stroke: 'currentColor', strokeWidth: filled ? 1 : 1.6,
        strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true
      },
      h('path', { d: 'M16 9V4h1V2H7v2h1v5c0 1.1-.9 2-2 2v2h5v5h2v-5h5v-2c-1.1 0-2-.9-2-2Z' }))
    }

    function IconBack() {
      return h('svg', {
        width: 14, height: 14, viewBox: '0 0 16 16', fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round',
        strokeLinejoin: 'round', 'aria-hidden': true
      },
      h('path', { d: 'M9.8 3.4 5.2 8l4.6 4.6' }),
      h('path', { d: 'M5.4 8h7.2' }))
    }

    function IconSpark() {
      return h('svg', {
        width: 12, height: 12, viewBox: '0 0 16 16', fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round',
        strokeLinejoin: 'round', 'aria-hidden': true
      },
      h('path', { d: 'M8 1.7l1.3 3.7 3.7 1.3-3.7 1.3L8 11.7 6.7 8 3 6.7l3.7-1.3L8 1.7Z' }),
      h('path', { d: 'M12.8 10.7l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5.5-1.4Z' }))
    }

    function IconShield() {
      return h('svg', {
        width: 12, height: 12, viewBox: '0 0 16 16', fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round',
        strokeLinejoin: 'round', 'aria-hidden': true
      },
      h('path', { d: 'M8 1.8 13 3.8v3.5c0 3.3-2.1 5.6-5 6.9-2.9-1.3-5-3.6-5-6.9V3.8l5-2Z' }),
      h('path', { d: 'm5.7 8 1.5 1.5 3-3' }))
    }

    function IconEmpty() {
      return h('svg', {
        width: 28, height: 28, viewBox: '0 0 16 16', fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.1, strokeLinecap: 'round',
        strokeLinejoin: 'round', 'aria-hidden': true
      },
      h('rect', { x: 1.8, y: 2.4, width: 12.4, height: 11.2, rx: 2 }),
      h('path', { d: 'M5.4 2.4v11.2M9.9 2.4v11.2' }))
    }

    function SettingsRow(props) {
      const t = typeof props.t === 'function' ? props.t : (key) => key
      const value = useActiveWindowMinutes()
      const options = [
        { value: '30', label: t('settings.activeWindow30') },
        { value: '60', label: t('settings.activeWindow60') },
        { value: '0', label: t('settings.activeWindowNever') }
      ]
      return h('div', { className: 'dsb-settings-row' },
        h('div', { className: 'dsb-settings-copy' },
          h('div', { className: 'dsb-settings-title' }, t('settings.activeWindowTitle')),
          h('div', { className: 'dsb-settings-caption' }, t('settings.activeWindowCaption'))
        ),
        h('select', {
          className: 'dsb-select',
          value,
          'aria-label': t('settings.activeWindowTitle'),
          onChange: (event) => setActiveWindowMinutes(event.target.value)
        }, options.map((option) => h('option', { key: option.value, value: option.value }, option.label)))
      )
    }

    function PinnedAlwaysRow(props) {
      const t = typeof props.t === 'function' ? props.t : (key) => key
      const enabled = usePinnedAlways()
      return h('div', { className: 'dsb-settings-row' },
        h('div', { className: 'dsb-settings-copy' },
          h('div', { className: 'dsb-settings-title' }, t('settings.pinnedAlwaysTitle')),
          h('div', { className: 'dsb-settings-caption' }, t('settings.pinnedAlwaysCaption'))
        ),
        h('button', {
          className: 'dsb-switch',
          type: 'button',
          role: 'switch',
          'aria-checked': enabled ? 'true' : 'false',
          'aria-label': t('settings.pinnedAlwaysTitle'),
          onClick: () => setPinnedAlways(!enabled)
        })
      )
    }

    function SettingsPage(props) {
      const t = typeof props.t === 'function' ? props.t : (key) => key
      return h('div', { className: 'dsb-settings-page' },
        h('h2', { className: 'dsb-settings-page-title' }, t('settings.pageTitle')),
        h('p', { className: 'dsb-settings-page-caption' }, t('settings.pageCaption')),
        h('div', { className: 'dsb-settings-card' },
          h(SettingsRow, { t }),
          h(PinnedAlwaysRow, { t })
        )
      )
    }

    function QuestionBody(props) {
      const pending = props.pending
      const t = props.t
      const busy = props.busy
      const questions = Array.isArray(pending.questions) ? pending.questions : []
      const [selected, setSelected] = React.useState({})

      React.useEffect(() => {
        setSelected({})
      }, [pending.key])

      const choose = (question, label) => {
        setSelected((previous) => {
          const current = previous[question.id] || []
          let next
          if (question.multiSelect === true) {
            next = current.includes(label)
              ? current.filter((item) => item !== label)
              : current.concat(label)
          } else {
            next = [label]
          }
          return { ...previous, [question.id]: next }
        })
      }

      const hasOptions = questions.some((question) => Array.isArray(question.options) && question.options.length > 0)
      if (!hasOptions) {
        return h('div', { className: 'dsb-question' },
          h('div', { className: 'dsb-question-title' }, t('approval.openConversation'))
        )
      }

      const canSubmit = questions.every((question) => {
        if (!Array.isArray(question.options) || question.options.length === 0) return true
        return (selected[question.id] || []).length > 0
      })

      return h('div', { className: 'dsb-question' },
        questions.map((question, index) => h('div', {
          className: 'dsb-question-block',
          key: question.id || String(index)
        },
        h('div', { className: 'dsb-question-title' },
          question.header ? question.header + ' · ' + question.question : question.question),
        question.detail ? h('div', { className: 'dsb-question-detail' }, question.detail) : null,
        Array.isArray(question.options) && question.options.length > 0
          ? h('div', { className: 'dsb-question-options' },
            question.options.map((option, optionIndex) => h('button', {
              className: 'dsb-option',
              type: 'button',
              key: option.label + ':' + String(optionIndex),
              'aria-pressed': (selected[question.id] || []).includes(option.label) ? 'true' : 'false',
              disabled: busy,
              onClick: () => choose(question, option.label)
            }, option.description ? option.label + ' · ' + option.description : option.label)))
          : null)),
        h('button', {
          className: 'dsb-btn dsb-btn--primary dsb-question-submit',
          type: 'button',
          disabled: busy || !canSubmit,
          onClick: () => props.onAnswer({
            answers: questions.map((question) => ({
              id: question.id,
              selected: selected[question.id] || []
            }))
          })
        }, t('approval.submit'))
      )
    }

    function ApprovalDrawer(props) {
      const card = props.card
      const pending = card.status.pendingInteraction
      const t = props.t
      const kind = card.status.pendingKind
      const isApproval = kind === 'approval'
      const title = isApproval ? t('approval.title') : kind === 'plan-review' ? t('approval.planTitle') : t('approval.questionTitle')
      const reason = pending && (typeof pending.displayReason === 'string' ? pending.displayReason : pending.reason)
      if (!pending) return null
      return h('section', { className: 'dsb-approval-drawer', role: 'region', 'aria-label': title },
        h('div', { className: 'dsb-approval-head' },
          h('span', { className: 'dsb-approval-icon' }, isApproval ? '!' : '?'),
          h('span', { className: 'dsb-approval-title' }, title),
          h('span', { className: 'dsb-approval-session' }, card.workspaceName + ' · ' + card.title),
          h('button', {
            className: 'dsb-approval-close',
            type: 'button',
            title: t('approval.close'),
            'aria-label': t('approval.close'),
            onClick: props.onClose
          }, '×')
        ),
        h('div', { className: 'dsb-approval-body' },
          isApproval
            ? h(React.Fragment, null,
              h('div', { className: 'dsb-approval-tool' },
                h('span', null, t('approval.tool')),
                h('code', null, pending.toolName || 'tool')
              ),
              reason ? h('p', { className: 'dsb-approval-reason' }, String(reason)) : null,
              pending.answerable === false
                ? h('div', { className: 'dsb-approval-error' }, t('approval.notAnswerable'))
                : h('div', { className: 'dsb-approval-actions' },
                  h('button', {
                    className: 'dsb-btn dsb-btn--primary',
                    type: 'button',
                    disabled: props.busy,
                    onClick: () => props.onAnswer('allowed-once')
                  }, t('approval.allow')),
                  h('button', {
                    className: 'dsb-btn dsb-btn--ghost',
                    type: 'button',
                    disabled: props.busy,
                    onClick: () => props.onAnswer('rejected')
                  }, t('approval.reject'))
                )
            )
            : h(QuestionBody, { pending, t, busy: props.busy, onAnswer: props.onAnswer })
        ),
        props.error ? h('div', { className: 'dsb-approval-error', role: 'alert' }, props.error) : null
      )
    }

    function BoardIcon(props) {
      const size = props && props.size ? props.size : 16
      const list = props.useSessions ? props.useSessions((state) => state) : undefined
      const statusMap = props.useSessionStatus ? props.useSessionStatus((state) => state) : undefined
      const workspaceState = props.useWorkspaces ? props.useWorkspaces((state) => state) : undefined
      const tone = props.active ? null : entryTone(computeEntrySignal(list, statusMap, workspaceState))
      return h('svg', {
        width: size, height: size, viewBox: '0 0 16 16', fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.25, strokeLinecap: 'round',
        strokeLinejoin: 'round', 'aria-hidden': true,
        style: tone ? { color: tone } : undefined
      },
      h('rect', { x: 1.8, y: 2.4, width: 12.4, height: 11.2, rx: 2 }),
      h('path', { d: 'M5.4 2.4v11.2M9.9 2.4v11.2' }),
      h('path', { d: 'M3.2 5.4h1.4M7.4 5.4h1.4M11.7 5.4h1.1' }))
    }

    function GroupBody(props) {
      const ref = React.useRef(null)
      const mountedRef = React.useRef(false)
      React.useEffect(() => {
        const el = ref.current
        if (!el) return
        if (!mountedRef.current) {
          mountedRef.current = true
          if (props.collapsed) el.style.height = '0px'
          return
        }
        if (props.collapsed) {
          el.style.height = el.scrollHeight + 'px'
          void el.offsetHeight
          el.style.height = '0px'
        } else {
          el.style.height = el.scrollHeight + 'px'
          const onEnd = (event) => {
            if (event.target !== el || event.propertyName !== 'height') return
            el.style.height = ''
            el.removeEventListener('transitionend', onEnd)
          }
          el.addEventListener('transitionend', onEnd)
        }
      }, [props.collapsed])
      return h('div', {
        className: 'dsb-group-body' + (props.collapsed ? ' dsb-group-body--collapsed' : ''),
        ref,
        'aria-hidden': props.collapsed ? 'true' : undefined
      },
      h('div', { className: 'dsb-group-body-inner' }, props.children))
    }

    function SessionCard(props) {
      const card = props.card
      const pinned = props.pinned
      const busy = props.busy
      const t = props.t
      const label = statusLabel(card.status, t)
      const pinLabel = pinned ? t('card.unpin') : t('card.pin')
      const expandable = card.status.key === 'pending'
      const expanded = props.expanded === true
      const dismissable = props.dismissable === true
      return h('div', { className: 'dsb-card-wrap' },
        h('article', {
          className: 'dsb-card dsb-card--' + card.status.key,
          role: 'button',
          tabIndex: 0,
          'aria-label': card.workspaceName + '，' + card.title + '，' + label,
          'aria-expanded': expandable ? (expanded ? 'true' : 'false') : undefined,
          title: card.title,
          onClick: () => props.onActivate(card),
          onKeyDown: (event) => {
            if (event.target !== event.currentTarget) return
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              props.onActivate(card)
            }
          }
        },
        h('div', { className: 'dsb-card-top' },
          h('span', { className: 'dsb-ws' }, h(IconFolder), h('span', null, card.workspaceName))
        ),
        h('h3', { className: 'dsb-card-title' }, card.title || t('card.untitled')),
        card.model || card.permission ? h('div', { className: 'dsb-meta' },
          card.model ? h('div', {
            className: 'dsb-meta-line dsb-meta-line--model',
            title: card.model
          }, h(IconSpark), h('span', null, card.model)) : null,
          card.permission ? h('div', {
            className: 'dsb-meta-line dsb-meta-line--permission-' + card.permission.tone,
            title: card.permission.label
          }, h(IconShield), h('span', null, card.permission.label)) : null
        ) : null,
        expandable ? h('div', { className: 'dsb-card-hint' }, expanded ? t('approval.expandedHint') : t('approval.expandHint')) : null,
        h('div', { className: 'dsb-card-bottom' },
          h('span', { className: 'dsb-status dsb-status--' + card.status.key },
            h('span', { className: 'dsb-dot dsb-dot--' + card.status.key }),
            label
          ),
          h('span', { className: 'dsb-time' }, formatRelativeTime(card.updatedAt, t))
        )),
        h('button', {
          className: 'dsb-pin',
          type: 'button',
          'aria-pressed': pinned ? 'true' : 'false',
          'aria-label': pinLabel,
          title: pinLabel,
          disabled: busy,
          onPointerDown: (event) => event.stopPropagation(),
          onClick: (event) => {
            event.stopPropagation()
            event.preventDefault()
            if (!busy) props.onTogglePin(card)
          }
        }, h(IconPin, { filled: pinned })),
        dismissable ? h('button', {
          className: 'dsb-dismiss',
          type: 'button',
          'aria-label': t('card.dismissActive'),
          title: t('card.dismissActive'),
          onPointerDown: (event) => event.stopPropagation(),
          onClick: (event) => {
            event.stopPropagation()
            event.preventDefault()
            if (props.onDismiss) props.onDismiss(card)
          }
        }, '×') : null
      )
    }

    function BoardPage(props) {
      const t = typeof props.t === 'function' ? props.t : (key) => key
      const list = props.useSessions((state) => state)
      const statusMap = props.useSessionStatus((state) => state)
      const workspaceState = props.useWorkspaces((state) => state)
      const showAll = useShowAllCards()
      const activeWindowValue = useActiveWindowMinutes()
      const pinnedAlways = usePinnedAlways()
      const collapsedWorkspaces = useCollapsedWorkspaces()
      const [dismissedActive, dismissActive] = useDismissedActive()
      const [busyIds, setBusyIds] = React.useState({})
      const [pinError, setPinError] = React.useState('')
      const [expandedApprovalId, setExpandedApprovalId] = React.useState(null)
      const [approvalBusyId, setApprovalBusyId] = React.useState(null)
      const [approvalError, setApprovalError] = React.useState('')
      const [now, setNow] = React.useState(() => Date.now())
      React.useEffect(() => {
        const intervalId = setInterval(() => setNow(Date.now()), 60000)
        return () => clearInterval(intervalId)
      }, [])

      const ready = list && list.phase === 'ready' && workspaceState && workspaceState.phase === 'ready'
      const archived = new Set((workspaceState && workspaceState.archivedSessionIds) || [])
      const pinnedOrder = (workspaceState && workspaceState.pinnedSessionIds) || []
      const workspaceItems = (workspaceState && workspaceState.items) || []
      const workspaceBySession = new Map()
      for (const workspace of workspaceItems) {
        for (const sessionId of workspace.sessionIds || []) workspaceBySession.set(sessionId, workspace)
      }

      const cards = []
      if (ready && list && list.ids) {
        for (const sessionId of list.ids) {
          const summary = list.byId && list.byId[sessionId]
          if (!summary || summary.blank || summary.origin === 'subagent' || archived.has(sessionId)) continue
          const workspace = workspaceBySession.get(sessionId)
          const displayTitle = summary.displayTitle || summary.title || sessionId
          const rawStatus = statusMap && typeof statusMap.get === 'function' ? statusMap.get(sessionId) : undefined
          const status = deriveCardStatus(summary, rawStatus, statusMap, list)
          const model = modelLabelOf(projectionValueOf(list, summary, sessionId, 'modelSelection'))
          const permission = permissionInfoOf(projectionValueOf(list, summary, sessionId, 'permissions'), t)
          cards.push({
            id: sessionId,
            title: displayTitle,
            workspaceId: workspace ? workspace.workspaceId : '',
            workspaceName: workspace ? workspaceDisplayName(workspace, t) : t('group.ungrouped'),
            workspacePath: workspace ? workspace.path : '',
            updatedAt: summary.updatedAt || 0,
            model,
            permission,
            status: { ...status, pendingInteraction: rawStatus && rawStatus.pendingInteraction }
          })
        }
      }

      const counts = { running: 0, pending: 0, done: 0 }
      for (const card of cards) counts[card.status.key] += 1

      const windowMs = activeWindowValue === '0' ? 0 : (parseInt(activeWindowValue, 10) || 60)

      const byId = new Map(cards.map((card) => [card.id, card]))
      const pinnedCards = pinnedOrder.map((id) => byId.get(id)).filter(Boolean)
      const pinnedIds = new Set(pinnedCards.map((card) => card.id))
      const unpinnedCards = cards.filter((card) => !pinnedIds.has(card.id))
      const activeCards = unpinnedCards
        .filter((card) => isActiveCard(card, windowMs, now, dismissedActive))
        .sort(byStatusThenRecency)
      const expandedCard = cards.find((card) => card.id === expandedApprovalId && card.status.key === 'pending') || null

      const groups = []
      for (const workspace of workspaceItems) {
        const members = unpinnedCards
          .filter((card) => card.workspaceId === workspace.workspaceId)
          .sort((a, b) => b.updatedAt - a.updatedAt)
        if (members.length > 0) {
          groups.push({
            key: workspace.workspaceId,
            title: workspaceDisplayName(workspace, t),
            path: workspace.path || '',
            cards: members
          })
        }
      }
      const ungrouped = unpinnedCards
        .filter((card) => !card.workspaceId)
        .sort((a, b) => b.updatedAt - a.updatedAt)
      if (ungrouped.length > 0) {
        groups.push({ key: '__ungrouped__', title: t('group.ungrouped'), path: '', cards: ungrouped })
      }

      function togglePin(card) {
        const pinned = pinnedIds.has(card.id)
        if (busyIds[card.id]) return
        setBusyIds((previous) => ({ ...previous, [card.id]: true }))
        setPinError('')
        const request = pinned ? props.unpinSession(card.id) : props.pinSession(card.id)
        Promise.resolve(request).catch((error) => {
          console.error('[session-board] pin request failed', error)
          setPinError(t('error.pin'))
        }).finally(() => {
          setBusyIds((previous) => {
            const next = { ...previous }
            delete next[card.id]
            return next
          })
        })
      }

      function handleActivate(card) {
        if (card.status.key === 'pending') {
          if (expandedApprovalId === card.id) {
            setExpandedApprovalId(null)
            setApprovalError('')
            props.openSession(card.id)
          } else {
            setExpandedApprovalId(card.id)
            setApprovalError('')
          }
          return
        }
        props.openSession(card.id)
      }

      function toggleWorkspace(workspaceId) {
        setWorkspaceCollapsed(workspaceId, !collapsedWorkspaces.has(workspaceId))
      }

      function answerExpanded(payload) {
        if (!expandedCard) return
        const pending = expandedCard.status.pendingInteraction
        if (!pending || typeof pending.answer !== 'function') {
          setApprovalError(t('approval.notAnswerable'))
          return
        }
        setApprovalBusyId(expandedCard.id)
        setApprovalError('')
        Promise.resolve(pending.answer(payload)).then(() => {
          try {
            const snapshot = typeof pending.snapshot === 'function' ? pending.snapshot() : undefined
            if (snapshot && snapshot.channel === 'rpc' && typeof pending.dismiss === 'function') {
              pending.dismiss().catch(() => {})
            }
          } catch (error) { /* the answer already settled */ }
          setExpandedApprovalId(null)
        }).catch((error) => {
          console.error('[session-board] approval answer failed', error)
          setApprovalError(error instanceof Error && error.message ? error.message : t('approval.error'))
        }).finally(() => {
          setApprovalBusyId(null)
        })
      }

      const header = h('header', { className: 'dsb-header' },
        h('div', { className: 'dsb-head-row' },
          h('div', null,
            h('p', { className: 'dsb-eyebrow' }, 'SESSION BOARD'),
            h('h1', { className: 'dsb-title' }, t('panel.title')),
            h('p', { className: 'dsb-subtitle' }, t(showAll ? 'panel.subtitle' : 'panel.subtitleCollapsed'))
          ),
          h('div', { className: 'dsb-head-right' },
            h('div', { className: 'dsb-viewswitch', role: 'tablist', 'aria-label': t('panel.title') },
              h('button', {
                className: 'dsb-view-btn' + (showAll ? '' : ' dsb-view-btn--active'),
                type: 'button',
                role: 'tab',
                'aria-selected': showAll ? 'false' : 'true',
                onClick: () => setShowAllCards(false)
              }, t('view.active')),
              h('button', {
                className: 'dsb-view-btn' + (showAll ? ' dsb-view-btn--active' : ''),
                type: 'button',
                role: 'tab',
                'aria-selected': showAll ? 'true' : 'false',
                onClick: () => setShowAllCards(true)
              }, t('view.all'))
            ),
            h('div', { className: 'dsb-legend' },
              h('span', { className: 'dsb-legend-item' }, h('span', { className: 'dsb-dot dsb-dot--running' }), t('status.running'), h('b', null, String(counts.running))),
              h('span', { className: 'dsb-legend-item' }, h('span', { className: 'dsb-dot dsb-dot--pending' }), t('status.pendingApproval'), h('b', null, String(counts.pending))),
              h('span', { className: 'dsb-legend-item' }, h('span', { className: 'dsb-dot dsb-dot--done' }), t('status.done'), h('b', null, String(counts.done)))
            )
          )
        )
      )

      if (!ready) {
        return h('div', { className: 'dsb-page' },
          header,
          h('div', { className: 'dsb-loading' },
            h('span', { className: 'dsb-loading-dots' }, h('i'), h('i'), h('i')),
            h('span', null, t('loading'))
          )
        )
      }

      const renderCard = (card, options) => h(SessionCard, {
        key: card.id,
        card,
        pinned: options.pinned === true,
        busy: !!busyIds[card.id],
        expanded: expandedApprovalId === card.id,
        dismissable: options.dismissable === true,
        onActivate: (target) => handleActivate(target),
        onTogglePin: togglePin,
        onDismiss: (target) => dismissActive(target.id, target.updatedAt),
        t
      })

      const renderDrawer = (containerCards) => (expandedCard && containerCards.some((card) => card.id === expandedCard.id))
        ? h(ApprovalDrawer, {
          key: 'approval-' + expandedCard.id,
          card: expandedCard,
          t,
          busy: approvalBusyId === expandedCard.id,
          error: approvalError,
          onAnswer: answerExpanded,
          onClose: () => {
            setExpandedApprovalId(null)
            setApprovalError('')
          }
        })
        : null

      const content = []
      if (pinnedCards.length > 0 || pinnedAlways) {
        content.push(h('section', { className: 'dsb-pinned', key: 'pinned' },
          h('div', { className: 'dsb-pinned-head' },
            h('div', { className: 'dsb-pinned-title' },
              h(IconPin, { filled: true }),
              t('group.pinned'),
              h('span', { className: 'dsb-pinned-count' }, String(pinnedCards.length))
            ),
            h('span', { className: 'dsb-pinned-note' }, t('group.pinnedNote'))
          ),
          pinnedCards.length > 0
            ? h('div', { className: 'dsb-grid' }, pinnedCards.map((card) => renderCard(card, { pinned: true })))
            : h('div', { className: 'dsb-pinned-empty' }, t('pinned.empty')),
          renderDrawer(pinnedCards)
        ))
      }

      if (cards.length === 0) {
        content.push(h('div', { className: 'dsb-empty', key: 'empty' },
          h('div', { className: 'dsb-empty-icon' }, h(IconEmpty)),
          h('strong', null, t('empty.title')),
          h('span', null, t('empty.body'))
        ))
      } else if (showAll) {
        for (const group of groups) {
          const collapsed = collapsedWorkspaces.has(group.key)
          content.push(h('section', { className: 'dsb-group dsb-section-in' + (collapsed ? ' dsb-group--collapsed' : ''), key: group.key },
            h('div', {
              className: 'dsb-group-head dsb-group-head--clickable',
              role: 'button',
              tabIndex: 0,
              'aria-expanded': collapsed ? 'false' : 'true',
              onClick: () => toggleWorkspace(group.key),
              onKeyDown: (event) => {
                if (event.target !== event.currentTarget) return
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  toggleWorkspace(group.key)
                }
              }
            },
              h('div', { className: 'dsb-group-title' },
                h(IconFolder, { size: 15 }),
                group.title,
                h('span', { className: 'dsb-group-count' }, String(group.cards.length))
              ),
              group.path ? h('div', { className: 'dsb-group-path', title: group.path }, group.path) : null,
              h('span', { className: 'dsb-group-caret' + (collapsed ? ' dsb-group-caret--collapsed' : '') }, '▾')
            ),
            h(GroupBody, { collapsed },
              h('div', { className: 'dsb-grid' }, group.cards.map((card) => renderCard(card, {}))),
              renderDrawer(group.cards)
            )
          ))
        }
      } else if (activeCards.length > 0) {
        content.push(h('section', { className: 'dsb-active dsb-section-in', key: 'active' },
          h('div', { className: 'dsb-grid' }, activeCards.map((card) => renderCard(card, { dismissable: card.status.key === 'done' }))),
          renderDrawer(activeCards)
        ))
      } else {
        content.push(h('div', { className: 'dsb-empty dsb-section-in', key: 'empty-active' },
          h('strong', null, t('empty.activeTitle')),
          h('span', null, t('empty.activeBody'))
        ))
      }

      return h('div', { className: 'dsb-page' },
        header,
        pinError ? h('div', { className: 'dsb-error', role: 'alert' }, pinError) : null,
        h('div', { className: 'dsb-scroll' }, content)
      )
    }

    function BackToBoardButton(props) {
      const t = typeof props.t === 'function' ? props.t : (key) => key
      const list = props.useSessions ? props.useSessions((state) => state) : undefined
      const statusMap = props.useSessionStatus ? props.useSessionStatus((state) => state) : undefined
      const workspaceState = props.useWorkspaces ? props.useWorkspaces((state) => state) : undefined
      const tone = entryTone(computeEntrySignal(list, statusMap, workspaceState))
      return h('button', {
        className: 'dsb-back',
        type: 'button',
        title: t('back.label'),
        onClick: props.goBoard,
        style: tone ? { color: tone } : undefined
      },
      h(IconBack),
      h('span', null, t('back.label')))
    }

    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'session-board: dictionaries')
      ctx.effect(() => {
        if (typeof styles !== 'undefined' && styles && typeof styles.insert === 'function') {
          return styles.insert(CSS)
        }
        const tag = document.createElement('style')
        tag.dataset.plugin = '@local/dsh-session-board'
        tag.textContent = CSS
        document.head.appendChild(tag)
        return () => tag.remove()
      }, 'session-board: styles')

      const openSession = (sessionId) => {
        const navigation = ctx.get('uiWorkspace')
        if (navigation && typeof navigation.openSession === 'function') {
          navigation.openSession(sessionId)
        } else {
          console.warn('[session-board] uiWorkspace.openSession is unavailable')
        }
      }

      const goBoard = () => {
        ctx.layout.selectPanel(PANEL_ID)
      }

      const pinSession = (sessionId) => {
        const workspaces = ctx.get('workspaces')
        if (!workspaces || typeof workspaces.pinSession !== 'function') {
          return Promise.reject(new Error('workspace pin session service is unavailable'))
        }
        return workspaces.pinSession(sessionId)
      }

      const unpinSession = (sessionId) => {
        const workspaces = ctx.get('workspaces')
        if (!workspaces || typeof workspaces.unpinSession !== 'function') {
          return Promise.reject(new Error('workspace unpin session service is unavailable'))
        }
        return workspaces.unpinSession(sessionId)
      }

      ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
        name: 'sidebar.panellist',
        id: PANEL_ID,
        order: 5,
        locale: NS,
        label: () => ctx.locale.bind(NS)('panel.title')
      }, BoardIcon))

      ctx.slots.inject('main', () => ctx.slots.register({
        name: 'main',
        key: PANEL_ID,
        locale: NS,
        inject: () => ({ openSession, pinSession, unpinSession })
      }, BoardPage))

      ctx.slots.inject('settings.section', () => ctx.slots.register({
        name: 'settings.section',
        id: PANEL_ID,
        order: 18,
        locale: NS,
        label: () => ctx.locale.bind(NS)('settings.sectionLabel')
      }, SettingsPage))

      ctx.slots.inject('conversation.header.leading', () => ctx.slots.register({
        name: 'conversation.header.leading',
        locale: NS,
        inject: () => ({ goBoard })
      }, BackToBoardButton))
    }

    return {
      inject: ['slots', 'layout', 'locale'],
      apply
    }
  }
})
