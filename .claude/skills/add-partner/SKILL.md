---
name: add-partner
description: Add a new community partner to the WTM Madrid website. Appends an entry to the partners JSON data file and guides logo image placement.
license: MIT
metadata:
  authors: "WTM Madrid"
  version: "1.0.0"
---

# Add New Community Partner

You are helping add a new community partner to the **Women Techmakers Madrid** website.

## How partners work

Community partners are stored as a JSON array in `src/data/partners.json`, loaded via Astro's Content Layer API (`file()` loader). The homepage fetches them with `getCollection('partner')` and displays them in a carousel (`ImageCarousel.astro`) under the "Comunidades amigas" section.

The collection schema (defined in `src/content/config.ts`) requires:

| Field | Type | Required |
|-------|------|----------|
| `id` | string (unique slug) | yes |
| `name` | string | yes |
| `image.src` | string (`~/assets/images/partners/<file>`) | yes |
| `image.alt` | string | yes |
| `url` | URL string | yes |
| `order` | number | no (defaults to 99 in sort) |

## Step-by-step instructions

### 1. Collect information

Ask the user for the following if not already provided:
- **Community/organization name**
- **Website or LinkedIn URL**
- **Logo filename** (e.g. `nueva-comunidad.png`) — or generate from name if not given

### 2. Read the current partners file

Read `src/data/partners.json` to:
- Find the current highest `order` value → new entry gets `order = highest + 1`
- Generate a unique `id` slug from the name: lowercase, spaces → hyphens, remove special chars (e.g. "Nueva Comunidad Tech" → `nueva-comunidad-tech`)
- Confirm the `id` is not already in the file

### 3. Append the new entry

Edit `src/data/partners.json` by appending a new object to the array:

```json
{
  "id": "<slug>",
  "name": "<Community Name>",
  "image": {
    "src": "~/assets/images/partners/<logo-filename>",
    "alt": "<Community Name> logo"
  },
  "url": "<url>",
  "order": <number>
}
```

**Important rules:**
- Keep valid JSON — no trailing commas.
- The `image.src` path must start with `~/assets/images/partners/`.
- Ensure `url` is a full URL (add `https://` if the user omitted it).

### 4. Remind about the logo

After editing the file, tell the user:

> **Don't forget the logo!** Place the partner's logo at:
> `src/assets/images/partners/<logo-filename>`
>
> Supported formats: `.jpg`, `.jpeg`, `.png`, `.svg`, `.webp`
> Recommended: transparent background (PNG or SVG preferred), minimum 300×300 px.

### 5. Verify

Run `npm run check:astro` to confirm the updated JSON passes schema validation.

---

## Example — complete new entry for "Tech Diversa"

**Appended to `src/data/partners.json`:**

```json
{
  "id": "tech-diversa",
  "name": "Tech Diversa",
  "image": {
    "src": "~/assets/images/partners/tech-diversa.png",
    "alt": "Tech Diversa logo"
  },
  "url": "https://www.linkedin.com/company/tech-diversa/",
  "order": 6
}
```
