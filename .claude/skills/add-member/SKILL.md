---
name: add-member
description: Add a new team member to the WTM Madrid website. Creates the markdown data file in the content collection and guides image placement.
license: MIT
metadata:
  authors: "WTM Madrid"
  version: "1.0.0"
---

# Add New Team Member

You are helping add a new team member to the **Women Techmakers Madrid** website.

## How team members work

Team members are stored as individual Markdown files in `src/data/team/`, loaded via Astro's Content Layer API (`glob()` loader). Each file is frontmatter-only — no body content needed.

The collection schema (defined in `src/content/config.ts`) requires:

| Field | Type | Required |
|-------|------|----------|
| `name` | string | yes |
| `bio` | string | yes |
| `image.src` | string (`~/assets/images/team/<file>`) | yes |
| `image.alt` | string | yes |
| `social.twitter` | URL string | no |
| `social.linkedin` | URL string | no |
| `social.bluesky` | URL string | no |
| `order` | number | no (defaults to 99 in sort) |

## Step-by-step instructions

### 1. Collect information

Ask the user for the following if not already provided in their message:
- **Full name**
- **Bio** (short paragraph about the member)
- **Image filename** (e.g. `ana-garcia.jpg`) — see step 2
- **Social links** (Twitter/X, LinkedIn, Bluesky — all optional)

### 2. Determine the next order number and filename

- List existing files in `src/data/team/` using Glob to find the current highest numeric prefix.
- The new file's prefix = highest + 1, zero-padded to 2 digits (e.g. `09`).
- Generate a slug from the name: lowercase, spaces → hyphens, remove accents/special chars (e.g. "Ana García López" → `ana-garcia-lopez`).
- Final filename: `<prefix>-<slug>.md` (e.g. `09-ana-garcia-lopez.md`)

### 3. Create the markdown file

Create `src/data/team/<filename>.md` with this exact structure:

```yaml
---
name: '<Full Name>'
bio: '<Bio text>'
image:
  src: '~/assets/images/team/<image-filename>'
  alt: 'Foto de <Full Name>'
social:
  twitter: '<URL>'      # omit line if not provided
  linkedin: '<URL>'     # omit line if not provided
  bluesky: '<URL>'      # omit line if not provided
order: <number>
---
```

**Important rules:**
- Use single quotes for all string values in YAML.
- Omit any `social` field lines that have no value. The `social` object itself must always be present (even if empty `{}`), because `TeamMember.astro` accesses `member.social.twitter` etc. directly.
- If NO social links are provided, write `social: {}`.
- The `image.src` path must start with `~/assets/images/team/`.

### 4. Remind about the image

After creating the file, tell the user:

> **Don't forget the image!** Place the member's photo at:
> `src/assets/images/team/<image-filename>`
>
> Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
> Recommended: square or portrait crop, minimum 280×350 px.

### 5. Verify

Run `npm run check:astro` to confirm the new file passes Astro type-checking.

---

## Example — complete output for "Ana García"

**File:** `src/data/team/09-ana-garcia.md`

```yaml
---
name: 'Ana García'
bio: 'Ana es desarrolladora frontend con 5 años de experiencia en React y TypeScript. Apasionada por la accesibilidad web y el diseño inclusivo.'
image:
  src: '~/assets/images/team/ana-garcia.jpg'
  alt: 'Foto de Ana García'
social:
  linkedin: 'https://www.linkedin.com/in/ana-garcia/'
order: 9
---
```
