# CLAUDE.md — WTM Madrid Website

This file provides guidance for AI assistants (Claude and others) working on this codebase.

## Project Overview

This is the official website for **Women Techmakers (WTM) Madrid** — a community site that announces events, showcases team members, lists community partners, and runs campaigns like International Women's Day (IWD).

Built on **Astro 5.0** with TypeScript and Tailwind CSS, deployed statically to GitHub Pages.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro 5.0 (static output) |
| Styling | Tailwind CSS + custom CSS variables |
| Interactive components | React 19 |
| Content | Markdown / MDX |
| Type safety | TypeScript (strict) |
| Icons | Tabler icons, flat-color-icons (via astro-icon) |
| Image optimization | Unpic |
| Build tooling | Vite (bundled with Astro) |
| Code quality | ESLint + Prettier |
| CI/CD | GitHub Actions → GitHub Pages |

---

## Repository Structure

```
.
├── src/
│   ├── assets/              # Images (team photos, partner logos, IWD assets), CSS
│   │   ├── images/
│   │   └── styles/
│   │       └── tailwind.css
│   ├── components/
│   │   ├── blog/            # Blog-specific components
│   │   ├── common/          # Meta, analytics, theme toggle, scripts
│   │   ├── ui/              # Low-level UI primitives
│   │   └── widgets/         # Page sections (Hero, Features, Team, Events, etc.)
│   ├── content/
│   │   └── config.ts        # Astro content collection schema (Zod)
│   ├── data/
│   │   ├── post/            # Blog posts in .md / .mdx format
│   │   └── events.json      # Structured event data
│   ├── layouts/
│   │   ├── Layout.astro          # Root layout (head, analytics, view transitions)
│   │   ├── PageLayout.astro      # Standard page wrapper
│   │   ├── LandingLayout.astro   # Landing page variant
│   │   ├── MarkdownLayout.astro  # Used by privacy.md / terms.md
│   │   ├── LayoutIwd.astro       # IWD campaign root layout
│   │   └── PageLayoutIwd.astro   # IWD page wrapper
│   ├── pages/
│   │   ├── index.astro      # Home page
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── iwd.astro        # International Women's Day campaign
│   │   ├── testimonios.astro
│   │   ├── privacy.md
│   │   ├── terms.md
│   │   ├── 404.astro
│   │   ├── rss.xml.ts       # RSS feed generator
│   │   └── [...blog]/       # Dynamic blog routes
│   ├── utils/               # Helpers: blog, dates, permalinks, images
│   ├── config.yaml          # Site-wide settings (name, URL, blog config, analytics)
│   ├── navigation.ts        # Header links and footer social links
│   └── types.d.ts           # Shared TypeScript interfaces
├── vendor/
│   └── integration/         # Custom Astro integration (loads config.yaml as virtual module)
├── public/                  # Copied verbatim to dist (robots.txt, sitemap, decapcms)
├── .github/workflows/
│   ├── deploy.yaml          # Deploy to GitHub Pages on push to main
│   └── actions.yaml         # CI: build + check on PRs and pushes to main
├── astro.config.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── netlify.toml
├── vercel.json
├── Dockerfile
└── docker-compose.yml
```

---

## Development Commands

```bash
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Build production site to ./dist
npm run preview      # Preview the production build locally
npm run check        # Run all checks: astro, eslint, prettier
npm run check:astro  # Astro type checking
npm run check:eslint # ESLint validation
npm run check:prettier # Prettier format check
npm run fix          # Auto-fix ESLint and Prettier issues
npm run fix:eslint   # Auto-fix ESLint issues only
npm run fix:prettier # Auto-format with Prettier
```

**Node version requirement**: `^18.17.1 || ^20.3.0 || >= 21.0.0`

Before pushing, always run `npm run check` to ensure there are no type errors, linting issues, or formatting violations.

---

## Key Configuration

### Site Configuration (`src/config.yaml`)

The primary configuration file. Controls:
- `site.name`, `site.site` (URL), `site.googleSiteVerificationId`
- `metadata` — default SEO, OpenGraph, and Twitter card values
- `i18n` — locale and text direction
- `apps.blog` — posts per page, permalink pattern, categories/tags toggle
- `ui.theme` — `"system"`, `"light"`, or `"dark"`
- `analytics.vendors.googleAnalytics.id` — set to enable GA

This file is loaded by the custom Astro integration in `vendor/integration/` and exposed throughout the app as the virtual module `astrowind:config`.

### Navigation (`src/navigation.ts`)

Defines header menu links and footer social links. Update this file when adding new pages or changing the site navigation.

### Import Alias

`~` resolves to `src/`. Use `~/components/...`, `~/utils/...`, etc.

---

## Content Management

### Adding or Editing Blog Posts

Posts live in `src/data/post/` as `.md` or `.mdx` files.

Required frontmatter:
```yaml
---
title: "Post title"
publishDate: 2024-01-15
excerpt: "Brief description"
image: ~/assets/images/some-image.jpg
category: "Category Name"
tags: ["tag1", "tag2"]
---
```

Optional frontmatter: `author`, `draft: true` (excludes from production), `metadata` (per-post OpenGraph/Twitter override).

### Adding or Editing Events (`src/data/events.json`)

Events are stored as a JSON array. Each event object:
```json
{
  "title": "Event Title",
  "date": "Month DD, YYYY",
  "description": "Short description",
  "image": "/images/event-image.jpg",
  "link": "https://meetup.com/...",
  "registrations": "Open" | "Closed"
}
```

The `Events.jsx` React component (`src/components/widgets/Events.jsx`) renders this data. Update `events.json` when adding new events or closing registrations.

### Adding Team Members

Team members are configured directly in `src/pages/about.astro` (or wherever the `TeamMember` widget is used). Add member images to `src/assets/images/` and reference them in the page.

---

## Component Architecture

### Widget Components (`src/components/widgets/`)

These are full page sections composed into pages. Each widget accepts typed props defined in `src/types.d.ts`. Common widgets:

- `Hero.astro` / `Hero2.astro` — landing hero sections
- `Features.astro` / `Features2.astro` / `Features3.astro` — feature grids
- `TeamMember.astro` — team member card
- `Events.jsx` — event listings (React, reads `events.json`)
- `BlogLatestPosts.astro` — shows recent blog posts
- `Contact.astro` — contact form section
- `Testimonials.astro` — testimonials carousel
- `ImageCarousel.astro` — image slider
- `C4pSatus.astro` — Call for Papers status indicator
- `Header.astro` / `Footer.astro` — site-wide navigation

### Common Components (`src/components/common/`)

Infrastructure components (not page sections): `Metadata.astro`, `Analytics.astro`, `ToggleTheme.astro`, `SocialShare.astro`, `Image.astro`, etc.

### IWD Campaign (`src/pages/iwd.astro`, `src/layouts/LayoutIwd.astro`)

A separate layout track (`LayoutIwd.astro` → `PageLayoutIwd.astro`) for the International Women's Day campaign page. It uses its own styling and assets under `src/assets/images/`. Update `iwd.astro` and its associated IWD assets for each year's campaign.

---

## Styling Conventions

- **Tailwind CSS** is the primary styling tool. Avoid writing custom CSS unless necessary.
- **Dark mode** is implemented via the `dark:` Tailwind variant with a CSS class toggle.
- **Custom CSS variables** for theming (primary/secondary/accent colors) are defined in `tailwind.config.js` and `src/assets/styles/tailwind.css`.
- **Line width**: 120 characters max (Prettier config).
- **Indentation**: 2 spaces.
- **Quotes**: Single quotes in JS/TS, double quotes in JSX attributes.

---

## TypeScript Conventions

- All new components should have typed props.
- Key shared types are in `src/types.d.ts` — add new interfaces there.
- Strict null checks are enabled. Don't use `!` non-null assertions without a comment explaining why.
- Use the `~` import alias for all internal imports.

---

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Astro/React components | PascalCase | `Hero.astro`, `Events.jsx` |
| Utility files | camelCase | `blog.ts`, `permalinks.ts` |
| Pages | kebab-case | `about.astro`, `iwd.astro` |
| Config / data files | lowercase | `config.yaml`, `events.json` |
| CSS classes | Tailwind utilities | `text-primary`, `dark:bg-slate-900` |

---

## CI/CD and Deployment

### GitHub Actions

- **`deploy.yaml`**: Triggers on push to `main`. Runs `npm ci` → `npm run build` → deploys `./dist` to GitHub Pages.
- **`actions.yaml`**: Triggers on PRs and pushes to `main`. Tests against Node 18, 20, and 22. Runs `npm run build` and `npm run check`.

### Branch Strategy

- `main` is the production branch — pushes trigger deployment.
- Feature work should be done on feature branches and merged via PR.
- Claude AI sessions develop on branches prefixed with `claude/`.

### Deployment Targets

| Target | Config file | Notes |
|--------|------------|-------|
| GitHub Pages | `.github/workflows/deploy.yaml` | Primary deployment |
| Netlify | `netlify.toml` | Alternate option |
| Vercel | `vercel.json` | Alternate option |
| Docker | `Dockerfile` + `docker-compose.yml` | nginx on port 8080 |

---

## SEO and Analytics

- SEO metadata is controlled globally via `src/config.yaml` (`metadata` section) and can be overridden per-page via the `Metadata.astro` component.
- Google Analytics: set `analytics.vendors.googleAnalytics.id` in `config.yaml`.
- Google Site Verification: `site.googleSiteVerificationId` in `config.yaml`.
- Sitemap and RSS feed are auto-generated at build time.

---

## Common Tasks

### Add a new top-level page

1. Create `src/pages/newpage.astro`.
2. Import `PageLayout` and compose widget components.
3. Add a link in `src/navigation.ts` if it should appear in the nav.

### Update the home page

Edit `src/pages/index.astro`. Each section uses a widget component — add, remove, or reorder widget imports as needed.

### Add a community partner logo

1. Add the logo image to `src/assets/images/`.
2. Reference it in the `Brands.astro` widget call in the relevant page.

### Change site-wide theme colors

Edit `tailwind.config.js` — the custom CSS variable definitions under `theme.extend`.

### Enable Google Analytics

Set the GA measurement ID in `src/config.yaml`:
```yaml
analytics:
  vendors:
    googleAnalytics:
      id: "G-XXXXXXXXXX"
```

---

## Things to Avoid

- **Do not** commit secrets, API keys, or `.env` files.
- **Do not** push directly to `main` — use PRs for review.
- **Do not** add dependencies without checking if the functionality already exists in Astro or Tailwind.
- **Do not** skip `npm run check` before pushing — CI will catch it anyway, but catching it locally is faster.
- **Do not** use inline styles when a Tailwind class exists.
- **Do not** create new layout files unless a genuinely different layout is needed (the IWD campaign is an example of a justified separate layout track).
