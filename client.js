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
      'panel.subtitleCollapsed': '下方仅显示运行中与待审批的会话 · 其他卡片已收起',
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
      'back.label': '返回看板'
    }

    const en = {
      'panel.title': 'Session Board',
      'panel.subtitle': 'All sessions by workspace · card color shows the current state',
      'panel.subtitleCollapsed': 'Only running and pending sessions below · other cards are collapsed',
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
      'back.label': 'Back to board'
    }

    const CSS = `
.dsb-page {
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  color: var(--dsw-alias-label-primary);
  background: transparent;
  --dsb-running-bg: #e2edf6;
  --dsb-running-accent: #3e7ea8;
}
body[data-ds-dark-theme] .dsb-page {
  --dsb-running-bg: #293b4c;
  --dsb-running-accent: #7fb7d9;
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
  font-weight: 650;
  letter-spacing: -.5px;
}
.dsb-subtitle {
  margin: 8px 0 0;
  color: var(--dsw-alias-label-secondary);
  font-size: 12.5px;
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
  border-radius: 9px;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
  white-space: nowrap;
  box-shadow: var(--dsh-neu-raise-sm, 0 1px 2px rgba(0, 0, 0, .07));
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
  border-radius: 17px;
  background: var(--dsw-alias-bg-layer-2);
  box-shadow: var(--dsh-neu-inset, inset 0 0 0 1px var(--dsw-alias-border-l1));
}
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
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-brand-primary);
  font-size: 10.5px;
  box-shadow: var(--dsh-neu-raise-sm, 0 1px 2px rgba(0, 0, 0, .07));
}
.dsb-pinned-note {
  color: var(--dsw-alias-label-tertiary);
  font-size: 10.5px;
}
.dsb-group { margin-bottom: 27px; }
.dsb-group-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  padding: 0 2px 9px;
  margin-bottom: 11px;
  border-bottom: 1px solid var(--dsw-alias-border-l1);
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
.dsb-group-title svg { color: var(--dsw-alias-brand-primary); opacity: .78; flex: none; }
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
}
.dsb-group-path {
  max-width: 48%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--dsw-alias-label-tertiary);
  font-family: "Cascadia Code", "SFMono-Regular", Consolas, monospace;
  font-size: 10px;
}
.dsb-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(258px, 1fr));
  gap: 14px;
}
.dsb-card-wrap {
  position: relative;
  display: flex;
  min-height: 176px;
}
.dsb-card {
  position: relative;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 176px;
  padding: 13px 15px 12px;
  border: 0;
  border-radius: 15px;
  background-color: var(--status-bg);
  background-image: linear-gradient(145deg, rgba(255, 255, 255, .6), rgba(255, 255, 255, 0) 42%);
  box-shadow: var(--dsh-neu-card-raise, 0 1px 4px rgba(0, 0, 0, .08));
  cursor: pointer;
  outline: none;
  overflow: hidden;
  transition: transform .18s ease, box-shadow .18s ease;
}
body[data-ds-dark-theme] .dsb-card {
  background-image: linear-gradient(145deg, rgba(255, 255, 255, .07), rgba(255, 255, 255, 0) 42%);
}
.dsb-card--running { --status-bg: var(--dsb-running-bg); }
.dsb-card--pending { --status-bg: var(--dsw-alias-state-warn-tertiary); }
.dsb-card--done { --status-bg: var(--dsw-alias-state-success-tertiary); }
.dsb-card:hover {
  transform: translateY(-1px);
  box-shadow: var(--dsh-neu-card-raise-strong, 0 5px 15px rgba(0, 0, 0, .12));
}
.dsb-card:focus-visible {
  box-shadow: 0 0 0 2px var(--dsw-alias-brand-primary), var(--dsh-neu-card-raise-strong, 0 5px 15px rgba(0, 0, 0, .12));
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
  box-shadow: var(--dsh-neu-raise-sm, 0 1px 2px rgba(0, 0, 0, .07));
  transition: color .15s ease, box-shadow .15s ease, transform .15s ease;
}
.dsb-pin:hover {
  color: var(--dsw-alias-brand-primary);
  transform: translateY(-1px);
  box-shadow: var(--dsh-neu-raise, 0 2px 5px rgba(0, 0, 0, .1));
}
.dsb-pin[aria-pressed="true"] {
  color: var(--dsw-alias-brand-primary);
  background: var(--dsw-alias-state-business-tertiary);
  box-shadow: var(--dsh-neu-inset, inset 0 0 0 1px var(--dsw-alias-border-l2));
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
  padding: 0 8px;
  border-radius: 999px;
  background: var(--dsw-alias-bg-layer-1);
  font-size: 10.5px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: var(--dsh-neu-inset-sm, inset 0 0 0 1px var(--dsw-alias-border-l1));
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
  border-radius: 18px;
  display: grid;
  place-items: center;
  color: var(--dsw-alias-brand-primary);
  background: var(--dsw-alias-bg-layer-2);
  box-shadow: var(--dsh-neu-raise-sm, 0 1px 2px rgba(0, 0, 0, .07));
  margin-bottom: 3px;
}
.dsb-empty strong { color: var(--dsw-alias-label-secondary); font-size: 14px; }
.dsb-empty span { font-size: 12px; }
.dsb-back {
  height: 30px;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-brand-primary);
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--dsh-neu-raise-sm, 0 1px 2px rgba(0, 0, 0, .07));
  transition: box-shadow .15s ease, transform .15s ease;
}
.dsb-back:hover {
  box-shadow: var(--dsh-neu-raise, 0 2px 5px rgba(0, 0, 0, .1));
  transform: translateX(-1px);
}
.dsb-back:active {
  box-shadow: var(--dsh-neu-inset, inset 0 0 0 1px var(--dsw-alias-border-l2));
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
  box-shadow: var(--dsh-neu-inset-sm, inset 0 0 0 1px var(--dsw-alias-border-l1));
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
  padding: 16px 17px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 16px;
  background: var(--dsw-alias-bg-layer-1);
  box-shadow: var(--dsh-neu-card-raise-strong, 0 8px 24px rgba(0, 0, 0, .12));
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
  width: 22px;
  height: 22px;
  border-radius: 7px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  background: var(--dsw-alias-state-warn-tertiary);
  color: var(--dsw-alias-state-warn-primary);
  font-size: 11px;
  font-weight: 800;
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
  padding: 0 13px;
  border-radius: 8px;
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
  box-shadow: var(--dsh-neu-raise-sm, 0 1px 2px rgba(0, 0, 0, .07));
}
.dsb-btn--primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: var(--dsh-neu-raise, 0 2px 5px rgba(0, 0, 0, .1)); }
.dsb-btn--ghost {
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary);
  box-shadow: var(--dsh-neu-raise-sm, 0 1px 2px rgba(0, 0, 0, .07));
}
.dsb-btn--ghost:hover:not(:disabled) { color: var(--dsw-alias-label-primary); transform: translateY(-1px); }
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
  padding: 9px 10px;
  border-radius: 8px;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary);
  font-size: 11px;
  line-height: 1.6;
  white-space: pre-wrap;
}
.dsb-question-options { display: flex; flex-wrap: wrap; gap: 7px; }
.dsb-option {
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary);
  font-size: 11.5px;
  cursor: pointer;
  text-align: left;
}
.dsb-option[aria-pressed="true"] {
  border-color: var(--dsw-alias-brand-primary);
  background: var(--dsw-alias-state-business-tertiary);
  color: var(--dsw-alias-label-primary);
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
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 16px;
  background: var(--dsw-alias-bg-layer-1);
  box-shadow: var(--dsh-neu-card-raise, 0 1px 4px rgba(0, 0, 0, .08));
}
.dsb-settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 16px 0;
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
  box-shadow: var(--dsh-neu-inset-sm, inset 0 0 0 1px var(--dsw-alias-border-l1));
  transition: background .18s ease;
}
.dsb-switch::after {
  content: "";
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--dsw-alias-bg-layer-1);
  box-shadow: var(--dsh-neu-raise-sm, 0 1px 2px rgba(0, 0, 0, .1));
  transition: transform .18s ease;
}
.dsb-switch[aria-checked="true"] { background: var(--dsw-alias-brand-primary); }
.dsb-switch[aria-checked="true"]::after { transform: translateX(16px); }
@media (max-width: 760px) {
  .dsb-header { padding: 18px 18px 13px; }
  .dsb-scroll { padding: 4px 18px 30px; }
  .dsb-error { margin-left: 18px; margin-right: 18px; }
  .dsb-legend { justify-content: flex-start; }
  .dsb-grid { grid-template-columns: 1fr; }
  .dsb-group-path { display: none; }
  .dsb-back span { display: none; }
  .dsb-back { width: 30px; padding: 0; justify-content: center; }
}
@media (prefers-reduced-motion: reduce) {
  .dsb-card, .dsb-pin, .dsb-back { transition: none; }
  .dsb-card:hover, .dsb-pin:hover, .dsb-back:hover { transform: none; }
  .dsb-loading-dots i { animation: none; }
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
        const listener = () => setValue(showAllCards)
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
      const enabled = useShowAllCards()
      return h('div', { className: 'dsb-settings-row' },
        h('div', { className: 'dsb-settings-copy' },
          h('div', { className: 'dsb-settings-title' }, t('settings.title')),
          h('div', { className: 'dsb-settings-caption' }, t('settings.caption'))
        ),
        h('button', {
          className: 'dsb-switch',
          type: 'button',
          role: 'switch',
          'aria-checked': enabled ? 'true' : 'false',
          'aria-label': t('settings.title'),
          onClick: () => setShowAllCards(!enabled)
        })
      )
    }

    function SettingsPage(props) {
      const t = typeof props.t === 'function' ? props.t : (key) => key
      return h('div', { className: 'dsb-settings-page' },
        h('h2', { className: 'dsb-settings-page-title' }, t('settings.pageTitle')),
        h('p', { className: 'dsb-settings-page-caption' }, t('settings.pageCaption')),
        h('div', { className: 'dsb-settings-card' },
          h(SettingsRow, { t })
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
      return h('svg', {
        width: size, height: size, viewBox: '0 0 16 16', fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.25, strokeLinecap: 'round',
        strokeLinejoin: 'round', 'aria-hidden': true
      },
      h('rect', { x: 1.8, y: 2.4, width: 12.4, height: 11.2, rx: 2 }),
      h('path', { d: 'M5.4 2.4v11.2M9.9 2.4v11.2' }),
      h('path', { d: 'M3.2 5.4h1.4M7.4 5.4h1.4M11.7 5.4h1.1' }))
    }

    function SessionCard(props) {
      const card = props.card
      const pinned = props.pinned
      const busy = props.busy
      const t = props.t
      const label = statusLabel(card.status, t)
      const pinLabel = pinned ? t('card.unpin') : t('card.pin')
      const expandable = props.expandable === true
      const expanded = props.expanded === true
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
        }, h(IconPin, { filled: pinned }))
      )
    }

    function BoardPage(props) {
      const t = typeof props.t === 'function' ? props.t : (key) => key
      const list = props.useSessions((state) => state)
      const statusMap = props.useSessionStatus((state) => state)
      const workspaceState = props.useWorkspaces((state) => state)
      const showAllCards = useShowAllCards()
      const [busyIds, setBusyIds] = React.useState({})
      const [pinError, setPinError] = React.useState('')
      const [expandedApprovalId, setExpandedApprovalId] = React.useState(null)
      const [approvalBusyId, setApprovalBusyId] = React.useState(null)
      const [approvalError, setApprovalError] = React.useState('')

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

      const byId = new Map(cards.map((card) => [card.id, card]))
      const pinnedCards = pinnedOrder.map((id) => byId.get(id)).filter(Boolean)
      const pinnedIds = new Set(pinnedCards.map((card) => card.id))
      const unpinnedCards = cards.filter((card) => !pinnedIds.has(card.id))
      const lowerCards = showAllCards
        ? unpinnedCards
        : unpinnedCards.filter((card) => card.status.key === 'running' || card.status.key === 'pending')
      const hiddenCount = unpinnedCards.length - lowerCards.length
      const expandedCard = pinnedCards.find((card) => card.id === expandedApprovalId && card.status.key === 'pending') || null

      const groups = []
      for (const workspace of workspaceItems) {
        const members = lowerCards
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
      const ungrouped = lowerCards
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

      function handleActivate(card, pinned) {
        if (pinned && card.status.key === 'pending') {
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
            h('p', { className: 'dsb-subtitle' }, t(showAllCards ? 'panel.subtitle' : 'panel.subtitleCollapsed'))
          ),
          h('div', { className: 'dsb-legend' },
            h('span', { className: 'dsb-legend-item' }, h('span', { className: 'dsb-dot dsb-dot--running' }), t('status.running'), h('b', null, String(counts.running))),
            h('span', { className: 'dsb-legend-item' }, h('span', { className: 'dsb-dot dsb-dot--pending' }), t('status.pendingApproval'), h('b', null, String(counts.pending))),
            h('span', { className: 'dsb-legend-item' }, h('span', { className: 'dsb-dot dsb-dot--done' }), t('status.done'), h('b', null, String(counts.done)))
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

      const content = []
      if (pinnedCards.length > 0) {
        content.push(h('section', { className: 'dsb-pinned', key: 'pinned' },
          h('div', { className: 'dsb-pinned-head' },
            h('div', { className: 'dsb-pinned-title' },
              h(IconPin, { filled: true }),
              t('group.pinned'),
              h('span', { className: 'dsb-pinned-count' }, String(pinnedCards.length))
            ),
            h('span', { className: 'dsb-pinned-note' }, t('group.pinnedNote'))
          ),
          h('div', { className: 'dsb-grid' },
            pinnedCards.map((card) => h(SessionCard, {
              key: card.id,
              card,
              pinned: true,
              busy: !!busyIds[card.id],
              expandable: card.status.key === 'pending',
              expanded: expandedApprovalId === card.id,
              onActivate: (target) => handleActivate(target, true),
              onTogglePin: togglePin,
              t
            }))
          )
        ))
      }

      if (expandedCard) {
        content.push(h(ApprovalDrawer, {
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
        }))
      }

      for (const group of groups) {
        content.push(h('section', { className: 'dsb-group', key: group.key },
          h('div', { className: 'dsb-group-head' },
            h('div', { className: 'dsb-group-title' },
              h(IconFolder, { size: 15 }),
              group.title,
              h('span', { className: 'dsb-group-count' }, String(group.cards.length))
            ),
            group.path ? h('div', { className: 'dsb-group-path', title: group.path }, group.path) : null
          ),
          h('div', { className: 'dsb-grid' },
            group.cards.map((card) => h(SessionCard, {
              key: card.id,
              card,
              pinned: false,
              busy: !!busyIds[card.id],
              expandable: false,
              expanded: false,
              onActivate: (target) => handleActivate(target, false),
              onTogglePin: togglePin,
              t
            }))
          )
        ))
      }

      if (cards.length === 0) {
        content.push(h('div', { className: 'dsb-empty', key: 'empty' },
          h('div', { className: 'dsb-empty-icon' }, h(IconEmpty)),
          h('strong', null, t('empty.title')),
          h('span', null, t('empty.body'))
        ))
      } else if (!showAllCards && hiddenCount > 0) {
        content.push(h('div', { className: 'dsb-collapsed-note', key: 'collapsed' },
          h('span', null, t('collapsed.note', { n: hiddenCount })),
          h('button', {
            className: 'dsb-collapsed-button',
            type: 'button',
            onClick: () => setShowAllCards(true)
          }, t('collapsed.showAll'))
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
      return h('button', {
        className: 'dsb-back',
        type: 'button',
        title: t('back.label'),
        onClick: props.goBoard
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
