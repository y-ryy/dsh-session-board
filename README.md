# Session Board for DeepSeek Harness

A lightweight session board for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI. It turns the current profile's sessions into workspace-grouped cards, colors each card by its live state, and keeps important sessions one click away.

> 一个面向 DeepSeek Harness Web UI 的轻量会话看板：按工作区分组展示会话，用颜色区分运行中 / 待审批 / 已完成，并支持置顶、审批和返回看板。

## Features

- **Workspace groups** — sessions are grouped by registered workspace; sessions without a workspace fall into an “Ungrouped” group.
- **Fork-aware** — user forks (`parentSession` without `origin: subagent`) are shown as independent session cards; only true subagent sessions are hidden.
- **Live status colors** — running, pending approval / answer, and completed sessions use distinct card surfaces.
- **Card metadata** — each card can show the session’s model / reasoning effort and current permission preset when the Host exposes those projections.
- **Pin to top** — pins use the official Workspace pin registry, shared with the sidebar’s “Pin session” action.
- **Collapsed lower section** — the workspace section below the pinned bar shows only running and pending sessions by default. A setting can reveal every session card.
- **Inline approvals** — clicking a pinned pending card once opens its approval drawer with direct `Allow once` / `Reject` actions (or selectable question options); clicking it again opens the session.
- **One-click return** — every conversation keeps a “Back to board” button at the top-left, and the currently selected session is preserved.
- **Theme-native** — uses DSH theme tokens and inherits the `dsh-neu-theme` soft-UI shadows, gloss, and grain when that theme is active.
- **Bilingual** — follows the active Harness language (Simplified Chinese and English).
- **No host changes** — no new session events, database schema, system prompt, or model tools.

## Installation

### Local bundle

Clone this repository somewhere outside the DSH installation, then add it to a profile:

```sh
dsh plugin --profile desktop add link:/absolute/path/to/dsh-session-board
```

Or use the Harness plugin manager and install this directory as a bundle.

Restart the Harness after installation. The board appears as **Session Board** in the left panel list.

### Settings

Open **Settings → Session Board** and use the **Cards below the board** switch:

- **Off** (default): the lower workspace section shows only running and pending sessions.
- **On**: the lower section shows every session card.

The preference is stored in the local browser storage for this profile/origin.

## Usage

1. Open **Session Board** from the left panel.
2. Hover a card and click the pin button to keep it in the top **Pinned** section; click it again to unpin.
3. Click a normal card to open its session.
4. Click a pinned pending card:
   - first click expands the approval drawer;
   - second click opens the corresponding session.
5. Use **Allow once** / **Reject** in the approval drawer, or select question options and submit.
6. Use **Back to board** at the top-left of a conversation to return to the board.

## How it works

The client half is plain JavaScript and uses only public DSH Client slot APIs:

- `sidebar.panellist` — board entry icon.
- `main` (`session-board`) — board page.
- `conversation.header.leading` — “Back to board” action.
- `settings.section` — Session Board settings page.
- Standard slot hooks: `useSessions`, `useSessionStatus`, `useWorkspaces`.
- Client services: `uiWorkspace.openSession`, `workspaces.pinSession` / `unpinSession`, `layout.selectPanel`.
- Pending approvals/questions use the official `PendingApproval` / `PendingQuestion` objects exposed through `useSessionStatus` and their `answer()` methods.

The Host half is an empty `apply()` — all rendering and interaction live in the Client half.

## Project layout

```text
dsh-session-board/
├── package.json          # DSH bundle + client manifest
├── cordis.patch.yml      # profile bundle row
├── index.js              # empty Host half
├── client.js             # board UI and interactions
├── locale/               # plugin title / description (en, zh)
├── icon.svg              # plugin icon
├── README.md
└── LICENSE
```

## Privacy

This plugin contains no credentials, personal paths, analytics, or network calls. It reads only the session and workspace metadata already provided to the Web client. The “Show all cards” preference is stored locally in the browser.

## Compatibility

Tested against DSH 0.2.x. The implementation relies on the Client slots and services listed above; the Host API and session log format are untouched.

## License

MIT — see [LICENSE](LICENSE).
