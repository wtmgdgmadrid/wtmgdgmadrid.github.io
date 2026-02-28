# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static website for **Women Techmakers Madrid** built with **Astro 5**, **TypeScript**, **React**, and **Tailwind CSS**. Deployed to GitHub Pages.

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
npm run fix:prettier     # Format all files
```

## Architecture

**File-based routing**: Pages in `src/pages/` become routes directly. Key pages: `index.astro` (homepage), `iwd.astro` (International Women's Day event), `[...blog]/` (dynamic blog routes).

**Two layouts/themes**: The main site uses `Layout.astro` / `PageLayout.astro`; the IWD event page uses `LayoutIwd.astro` with its own navigation (`src/navigation-iwd.ts`).

**Navigation**: Defined in `src/navigation.ts` (main site) and `src/navigation-iwd.ts` (IWD page). Update these to change header/footer links.

**Site config**: `src/config.yaml` controls site metadata, SEO, blog settings, theme (light/dark/system), and analytics.

**Content Collections**: Blog posts live in `src/content/post/` as `.md` or `.mdx` files. Schema defined in `src/content/config.ts`.

**Events data**: `src/data/events.json` feeds the `Events.jsx` React component displayed on the homepage.

**Path alias**: `~` resolves to `src/` (e.g., `~/components/widgets/Hero.astro`).

**Icons**: Uses `astro-icon` with `tabler` and `flat-color-icons` icon sets. Only icons explicitly listed in `astro.config.ts` are bundled.

**React islands**: React components (`.jsx`) are hydrated client-side for interactivity. Astro components (`.astro`) are server-rendered only.

**Styling**: Tailwind CSS with `darkMode: 'class'`. Custom CSS variables and theme colors are set in `src/components/CustomStyles.astro`. Prettier config: 2-space indent, single quotes, 120-char line width.

## CI/CD

- `.github/workflows/deploy.yaml` — deploys to GitHub Pages on push to `main`
- `.github/workflows/actions.yaml` — runs lint + build checks on PRs and pushes
