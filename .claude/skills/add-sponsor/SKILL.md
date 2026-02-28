---
name: add-sponsor
description: Add a new sponsor to the WTM Madrid website. Appends an entry to the sponsors JSON data file and guides logo image placement.
license: MIT
metadata:
  authors: "WTM Madrid"
  version: "1.0.0"
---

# Add New Sponsor

You are helping add a new sponsor to the **Women Techmakers Madrid** website.

## How sponsors work

Sponsors are stored as a JSON array in `src/data/sponsors.json`, loaded via Astro's Content Layer API (`file()` loader). The homepage fetches them with `getCollection('sponsor')` and displays them in a carousel (`ImageCarousel.astro`).

The collection schema (defined in `src/content/config.ts`) requires:

| Field | Type | Required |
|-------|------|----------|
| `id` | string (unique slug) | yes |
| `name` | string | yes |
| `image.src` | string (`~/assets/images/sponsors/<file>`) | yes |
| `image.alt` | string | yes |
| `url` | URL string | yes |
| `order` | number | no (defaults to 99 in sort) |

## Step-by-step instructions

### 1. Collect information

Ask the user for the following if not already provided:
- **Company name**
- **Website or LinkedIn URL**
- **Logo filename** (e.g. `acme-corp.png`) — or generate from name if not given

### 2. Read the current sponsors file

Read `src/data/sponsors.json` to:
- Find the current highest `order` value → new entry gets `order = highest + 1`
- Generate a unique `id` slug from the company name: lowercase, spaces → hyphens, remove special chars (e.g. "Acme Corp" → `acme-corp`)
- Confirm the `id` is not already in the file

### 3. Append the new entry

Edit `src/data/sponsors.json` by appending a new object to the array:

```json
{
  "id": "<slug>",
  "name": "<Company Name>",
  "image": {
    "src": "~/assets/images/sponsors/<logo-filename>",
    "alt": "<Company Name> logo"
  },
  "url": "<url>",
  "order": <number>
}
```

**Important rules:**
- Keep valid JSON — no trailing commas.
- The `image.src` path must start with `~/assets/images/sponsors/`.
- Ensure `url` is a full URL (add `https://` if the user omitted it).

### 4. Remind about the logo

After editing the file, tell the user:

> **Don't forget the logo!** Place the sponsor's logo at:
> `src/assets/images/sponsors/<logo-filename>`
>
> Supported formats: `.jpg`, `.jpeg`, `.png`, `.svg`, `.webp`
> Recommended: transparent background (PNG or SVG preferred), minimum 200×200 px.

### 5. Verify

Run `npm run check:astro` to confirm the updated JSON passes schema validation.

---

## Example — complete new entry for "Acme Corp"

**Appended to `src/data/sponsors.json`:**

```json
{
  "id": "acme-corp",
  "name": "Acme Corp",
  "image": {
    "src": "~/assets/images/sponsors/acme-corp.png",
    "alt": "Acme Corp logo"
  },
  "url": "https://www.linkedin.com/company/acme-corp/",
  "order": 6
}
```
