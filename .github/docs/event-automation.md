# Event Automation

This document explains how new events are added to the WTM Madrid website automatically through GitHub Actions.

---

## Overview

Adding an event triggers a two-step automation:

1. A GitHub Issue is created with the event data (manually via template, or automatically from Google Sheets).
2. The `add-event.yaml` workflow detects the issue, updates `src/data/events.json`, and opens a Pull Request for review.

```
Issue created (label: evento)
        │
        ▼
add-event.yaml workflow
        │
        ├─ Parses issue body
        ├─ Updates src/data/events.json
        ├─ Creates branch  evento/<slug>-<issue-number>
        ├─ Opens Pull Request
        └─ Comments on the issue with the PR link
```

---

## Required Secrets

Both workflows depend on secrets configured in **Settings → Secrets and variables → Actions**.

| Secret | Used by | Purpose |
|---|---|---|
| `WORKFLOW_TOKEN` | `sync-events-sheet.yaml` | A Personal Access Token (PAT) used to create GitHub Issues. **Must be a PAT, not `github.token`** — see [Critical note](#critical-note-github-token-vs-pat) below. |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | `sync-events-sheet.yaml` | Google service account credentials (JSON) with access to the spreadsheet. |
| `SPREADSHEET_ID` | `sync-events-sheet.yaml` | The ID of the Google Sheet (from the sheet URL). |

### Creating the PAT (`WORKFLOW_TOKEN`)

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens**.
2. Set repository access to `wtmgdgmadrid/wtmgdgmadrid.github.io`.
3. Grant permissions: **Issues** (read/write), **Contents** (read/write), **Pull requests** (read/write).
4. Add the generated token as a repo secret named `WORKFLOW_TOKEN`.

---

## Path 1 — Manual issue (GitHub template)

Use this when adding a one-off event directly from GitHub.

1. Go to **Issues → New issue → Nuevo Evento**.
2. Fill in all fields. The title is pre-filled with `[Evento] ` — keep the prefix.
3. Submit. The `evento` label is applied automatically by the template.
4. `add-event.yaml` triggers on the `opened` event, processes the issue, and opens a PR.
5. Review and merge the PR to publish the event on the website.

---

## Path 2 — Google Sheets sync

Use this to batch-import events from the team's planning spreadsheet.

### Sheet format

The sheet must have a header row followed by data rows with these columns (in order):

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Título | Estado | Fecha (YYYY-MM-DD) | Horario | Lugar | URL | CTA label | Procesado |

- Column **H** is managed automatically. Leave it empty for unprocessed rows; the script writes today's date once a row is processed.
- **Estado** must be exactly `Inscripciones Abiertas` or `Inscripciones cerradas`.
- **Fecha** must be in `YYYY-MM-DD` format (e.g. `2026-04-17`). The script converts it to Spanish (e.g. `17 de Abril 2026`).
- **CTA label** is optional — defaults to `Registrarse` if blank.

### Running the sync

1. Go to **Actions → Sincronizar Eventos desde Google Sheets → Run workflow**.
2. Optionally override `spreadsheet_id` or `sheet_name` (defaults to the secrets/`Eventos`).
3. Use **dry run** first to verify rows will be processed correctly — it reads the sheet but creates no issues and marks no rows.
4. Run without dry run to create issues. Each unprocessed row becomes a GitHub Issue with the `evento` label, which triggers `add-event.yaml` for each one.
5. Review and merge the resulting PRs.

---

## Workflow reference

### `add-event.yaml` — Añadir Nuevo Evento

**Trigger:** `issues: [opened, labeled]` and `workflow_dispatch`.

**Job condition:** runs when:
- triggered manually via `workflow_dispatch`, OR
- a `labeled` event adds the `evento` label, OR
- an `opened` event on an issue whose title starts with `[Evento]`.

**Steps:**
1. Checks out `main`.
2. Runs `.github/scripts/add-event.js` — parses the issue body (or `workflow_dispatch` inputs) and appends the event to `src/data/events.json`. Sets step outputs: `branch_slug`, `event_title`, `event_date_es`, `event_time`, `event_location`, `event_url`.
3. Formats `events.json` with Prettier.
4. Creates branch `evento/<slug>-<issue-number>` and commits.
5. Opens a Pull Request against `main`.
6. Comments on the issue with the PR link.

### `sync-events-sheet.yaml` — Sincronizar Eventos desde Google Sheets

**Trigger:** `workflow_dispatch` only (manual).

**Steps:**
1. Runs `.github/scripts/sync-events-sheet.js`.
2. Authenticates with Google via a JWT service account (no external dependencies).
3. Reads unprocessed rows (column H empty) from the sheet.
4. For each row, creates a GitHub Issue using `WORKFLOW_TOKEN` with the `evento` label.
5. Marks each processed row with today's date in column H.

---

## Script reference

### `.github/scripts/add-event.js`

Reads event data from either:
- `ISSUE_BODY` env var (parsed from the GitHub issue form format), or
- `INPUT_*` env vars (from `workflow_dispatch` inputs).

Converts the ISO date to Spanish, appends the event object to `src/data/events.json`, and writes GitHub Actions step outputs.

### `.github/scripts/sync-events-sheet.js`

Handles the full Google Sheets → GitHub Issues pipeline. Uses Node.js built-ins only (no external deps). Implements the Google OAuth2 JWT flow from scratch using the `crypto` module.

---

## Critical note: `github.token` vs PAT

`sync-events-sheet.yaml` **must use `WORKFLOW_TOKEN`** (a PAT), not `github.token`.

GitHub explicitly blocks events created by `GITHUB_TOKEN` from triggering other workflow runs — this is a security feature to prevent infinite loops. If `github.token` is used to create issues, `add-event.yaml` will never fire regardless of trigger configuration.

This was the root cause of the automation not working during initial setup.
