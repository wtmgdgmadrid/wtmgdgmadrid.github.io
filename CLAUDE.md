# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static website for **Women Techmakers Madrid** built with **Astro 5**, **TypeScript**, **React**, and **Tailwind CSS**. Deployed to GitHub Pages at `https://wtmgdgmadrid.github.io`.

## Commands

```bash
npm run dev          # Start dev server at localhost:4321
npm run build        # Build to ./dist/
npm run preview      # Preview production build
npm run check        # Run all checks (Astro type-check + ESLint + Prettier)
npm run fix          # Auto-fix ESLint violations and formatting
```

Individual checks:

```bash
npm run check:astro      # Astro type checking only
npm run check:eslint     # ESLint only
npm run check:prettier   # Prettier formatting check only
npm run fix:eslint       # Auto-fix ESLint violations
npm run fix:prettier     # Format all files
```

**Node version requirement**: `^18.17.1 || ^20.3.0 || >= 21.0.0`

## Architecture

### File-based routing

Pages in `src/pages/` become routes directly. Key pages:

| File | Route | Purpose |
|------|-------|---------|
| `index.astro` | `/` | Homepage (hero, team, events, partners, sponsors) |
| `iwd.astro` | `/iwd` | International Women's Day event page |
| `about.astro` | `/about` | About page |
| `contact.astro` | `/contact` | Contact page |
| `services.astro` | `/services` | Services page |
| `testimonios.astro` | `/testimonios` | Testimonials page |
| `C4pSatus.astro` | `/C4pSatus` | Call for Papers status page |
| `[...blog]/` | `/blog/*` | Dynamic blog routes |
| `404.astro` | `404` | Not found page |
| `rss.xml.ts` | `/rss.xml` | RSS feed |

Static markdown pages: `privacy.md`, `terms.md`, `codigo-de-conducta.md`.

### Two layouts/themes

**Main site**: `Layout.astro` / `PageLayout.astro` / `MarkdownLayout.astro` / `LandingLayout.astro`
**IWD event**: `LayoutIwd.astro` / `PageLayoutIwd.astro` — separate navigation and styles

### Navigation

- `src/navigation.ts` — main site header/footer links and social icons
- `src/navigation-iwd.ts` — IWD event page header/footer links

Update these files to change header/footer navigation.

### Site config

`src/config.yaml` controls:
- Site metadata (name, URL, Google site verification)
- SEO defaults (title, description, OpenGraph, Twitter card)
- Blog settings (posts per page, permalink pattern, categories, tags)
- Analytics (Google Analytics ID — currently disabled)
- UI theme (`"system"` | `"light"` | `"dark"` | `"light:only"` | `"dark:only"`)

### Content Collections

Defined in `src/content/config.ts`. Four collections:

| Collection | Source | Format |
|-----------|--------|--------|
| `post` | `src/data/post/*.{md,mdx}` | Blog posts |
| `team` | `src/data/team/*.md` | Team member profiles |
| `partner` | `src/data/partners.json` | Community partners |
| `sponsor` | `src/data/sponsors.json` | Event sponsors |

#### Team member format (`src/data/team/*.md`)

Files are named with a numeric prefix for ordering (e.g. `01-name.md`):

```markdown
---
name: 'Full Name'
bio: 'Short biography text.'
image:
  src: '~/assets/images/team/filename.png'
  alt: 'Photo description'
social:
  twitter: 'https://twitter.com/handle'       # optional
  linkedin: 'https://www.linkedin.com/in/...' # optional
  bluesky: 'https://bsky.app/profile/...'    # optional
order: 1
---
```

#### Partners format (`src/data/partners.json`)

Array of objects:

```json
{
  "id": "kebab-case-id",
  "name": "Display Name",
  "image": {
    "src": "~/assets/images/partners/filename.ext",
    "alt": "Logo description"
  },
  "url": "https://...",
  "order": 1
}
```

#### Sponsors format (`src/data/sponsors.json`)

Same structure as partners.

#### Events format (`src/data/events.json`)

Array of objects consumed by the `Events.jsx` React component:

```json
{
  "title": "Event title",
  "status": "Inscripciones Abiertas",
  "date": "21 de Enero 2026",
  "time": "18:30 - 21:30",
  "location": "Full venue address",
  "ctaLabel": "Registrarse",
  "url": "https://gdg.community.dev/events/..."
}
```

### Path alias

`~` resolves to `src/` — e.g., `~/components/widgets/Hero.astro`, `~/data/events.json`.

### Images

- `src/assets/images/` — processed by Astro's image optimization pipeline (referenced as `~/assets/images/...`)
  - `team/` — team member photos
  - `partners/` — partner logos
  - `sponsors/` — sponsor logos
  - `iwd26/` — IWD 2026 event assets
- `public/images/` — served as-is without optimization

### Icons

Uses `astro-icon` with two icon sets:
- `tabler` — all icons (`tabler:*`)
- `flat-color-icons` — only the subset listed in `astro.config.ts`

To use a new `flat-color-icons` icon, add it to the `include` list in `astro.config.ts`.

### React islands

React components (`.jsx`) are hydrated client-side for interactivity (e.g., `Events.jsx`, `ImageCarousel`). Astro components (`.astro`) are server-rendered only.

### Styling

- Tailwind CSS with `darkMode: 'class'`
- Custom CSS variables (`--aw-color-primary`, `--aw-color-secondary`, etc.) defined in `src/components/CustomStyles.astro`
- Tailwind colors map to CSS variables: `primary`, `secondary`, `accent`, `default`, `muted`
- Prettier: 2-space indent, single quotes, 120-char line width

### Components

Located in `src/components/`:

- `widgets/` — page section widgets (Hero, Features, Content, TeamMember, Footer, Header, Events-related, etc.)
- `ui/` — low-level UI primitives (Button, Form, Headline, ItemGrid, Timeline, WidgetWrapper, etc.)
- `common/` — shared utilities (Image, Metadata, Analytics, SocialShare, ToggleTheme, etc.)
- Root level: `Events.jsx`, `Logo.astro`, `CustomStyles.astro`, `Favicons.astro`, `C4pSatus.astro`

### Utilities

Located in `src/utils/`:

- `blog.ts` — blog post queries and pagination
- `dates.ts` — date formatting helpers
- `directories.ts` — path utilities
- `frontmatter.ts` — Remark/Rehype plugins (reading time, responsive tables, lazy images)
- `images.ts`, `images-optimization.ts` — image helpers
- `permalinks.ts` — URL generation
- `utils.ts` — general helpers

## CI/CD

### Workflows

| Workflow | File | Trigger | Purpose |
|----------|------|---------|---------|
| Deploy | `.github/workflows/deploy.yaml` | Push to `main` | Build and deploy to GitHub Pages |
| Checks | `.github/workflows/actions.yaml` | PR/push to `main` | Lint + build on Node 18, 20, 22 |
| Add Event | `.github/workflows/add-event.yaml` | Issue with `[Evento]` title or `evento` label, or `workflow_dispatch` | Auto-creates a PR adding a new event to `events.json` |
| Sync Events | `.github/workflows/sync-events-sheet.yaml` | `workflow_dispatch` | Syncs events from a Google Sheet via service account |

### Automation scripts

`.github/scripts/add-event.js` — parses a GitHub Issue form body or `workflow_dispatch` inputs, appends a new entry to `src/data/events.json`, and outputs branch/PR metadata.

### Issue templates

`.github/ISSUE_TEMPLATE/nuevo-evento.yml` — structured form to add a new event. Issues with title starting `[Evento]` or labeled `evento` automatically trigger the add-event workflow.

### Pre-commit hook

Husky runs `lint-staged` on every commit:
- `*.{js,jsx,ts,tsx,astro}` → ESLint fix + Prettier
- `*.{json,yaml,yml,md,mdx,css}` → Prettier

## Key conventions

1. **Language**: Content is primarily in Spanish; code comments and variable names in English.
2. **Ordering**: Team members, partners, and sponsors use an `order` field (lower = first); default is 99 when omitted.
3. **Image paths**: Always use `~/assets/images/...` for processed images; never use relative paths.
4. **New icons**: If adding a `flat-color-icons` icon, register it in `astro.config.ts`.
5. **New events**: Prefer the GitHub Issue template or `add-event` workflow over manual edits.
6. **Formatting**: Run `npm run fix` before committing if not using the pre-commit hook.
7. **Blog posts**: Place in `src/data/post/` as `.md` or `.mdx`; the `publishDate` field controls ordering.
8. **IWD page**: Has its own layout and navigation — keep changes isolated to `LayoutIwd.astro` and `navigation-iwd.ts`.

## Available Claude skills

The following `/skill` shortcuts are available for common tasks:

- `/add-member` — add a new team member (creates the markdown file and guides image placement)
- `/add-partner` — add a community partner (appends to `partners.json`)
- `/add-sponsor` — add a sponsor (appends to `sponsors.json`)
- `/astro` — Astro-specific guidance and CLI commands
