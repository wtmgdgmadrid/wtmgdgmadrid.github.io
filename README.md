# 🚀 WTM Madrid

<img src="https://raw.githubusercontent.com/arthelokyo/.github/main/resources/astrowind/lighthouse-score.png" align="right"
     alt="WTM Madrid Lighthouse Score" width="100" height="358">

🌟 _Women Techmakers Madrid official website_ 🌟

**WTM Madrid** website built with **[Astro 5.0](https://astro.build/) + [Tailwind CSS](https://tailwindcss.com/)**. This is the official landing page for Women Techmakers Madrid community, designed with web best practices in mind.

- ✅ **Production-ready** scores in **PageSpeed Insights** reports.
- ✅ Integration with **Tailwind CSS** supporting **Dark mode**.
- ✅ **Fast and SEO friendly** with automatic **RSS feed**, **MDX** support for events and blog posts.
- ✅ **Image Optimization** (using new **Astro Assets** and **Unpic** for Universal image CDN).
- ✅ Generation of **project sitemap** based on your routes.
- ✅ **Open Graph tags** for social media sharing.
- ✅ **Analytics** built-in Google Analytics integration.
- ✅ **Events management** and community showcase.

<br>

[![WTM Madrid](https://custom-icon-badges.demolab.com/badge/WTM-Madrid-556bf2?style=flat-square&logoColor=white&labelColor=101827)](https://github.com/wtmgdgmadrid)
[![License](https://img.shields.io/github/license/wtmgdgmadrid/wtmgdgmadrid.github.io?style=flat-square&color=dddddd&labelColor=000000)](https://github.com/wtmgdgmadrid/wtmgdgmadrid.github.io/blob/main/LICENSE.md)
[![Maintained](https://img.shields.io/badge/maintained%3F-yes-brightgreen.svg?style=flat-square)](https://github.com/wtmgdgmadrid)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/wtmgdgmadrid/wtmgdgmadrid.github.io#contributing)
[![Stars](https://img.shields.io/github/stars/wtmgdgmadrid/wtmgdgmadrid.github.io.svg?style=social&label=stars&maxAge=86400&color=ff69b4)](https://github.com/wtmgdgmadrid/wtmgdgmadrid.github.io)
[![Forks](https://img.shields.io/github/forks/wtmgdgmadrid/wtmgdgmadrid.github.io.svg?style=social&label=forks&maxAge=86400&color=ff69b4)](https://github.com/wtmgdgmadrid/wtmgdgmadrid.github.io)

<br>

<details open>
<summary>Table of Contents</summary>

- [Demo](#demo)
- [About WTM Madrid](#about-wtm-madrid)
- [TL;DR](#tldr)
- [Getting started](#getting-started)
  - [Project structure](#project-structure)
  - [Commands](#commands)
  - [Configuration](#configuration)
  - [Deploy](#deploy)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

</details>

<br>

## Demo

📌 [https://wtmgdgmadrid.github.io/](https://wtmgdgmadrid.github.io/)

<br>

## About WTM Madrid

**Women Techmakers Madrid** is a community that provides visibility, networking and resources for women in technology. We create more inclusive and supportive environments where women in tech can thrive and reach their full potential.

Our website serves as the central hub for:

- 📅 **Events and Workshops** - Regular meetups, talks, and hands-on workshops
- 🤝 **Community** - Connect with like-minded women in tech
- 📰 **News and Updates** - Latest announcements and opportunities
- 👥 **Team** - Meet our organizing team and ambassadors

<br>

## TL;DR

```shell
git clone https://github.com/wtmgdgmadrid/wtmgdgmadrid.github.io.git
cd wtmgdgmadrid.github.io
npm install
npm run dev
```

## Getting started

**WTM Madrid** website is built using [Astro 5.0](https://astro.build/) + [Tailwind CSS](https://tailwindcss.com/). The site focuses on simplicity, good practices and high performance to showcase our community and events.

The site uses minimal vanilla JavaScript to provide basic functionality, with React components for interactive elements like event listings and forms.

The website supports static generation and is optimized for GitHub Pages deployment.

### Project structure

Inside the **WTM Madrid** website, you'll see the following folders and files:

```
/
├── public/
│   ├── _headers
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── favicons/
│   │   ├── images/
│   │   └── styles/
│   │       └── tailwind.css
│   ├── components/
│   │   ├── blog/
│   │   ├── common/
│   │   ├── ui/
│   │   ├── widgets/
│   │   │   ├── Header.astro
│   │   │   └── ...
│   │   ├── CustomStyles.astro
│   │   ├── Favicons.astro
│   │   └── Logo.astro
│   ├── content/
│   │   ├── post/
│   │   │   ├── post-slug-1.md
│   │   │   ├── post-slug-2.mdx
│   │   │   └── ...
│   │   └-- config.ts
│   ├── layouts/
│   │   ├── Layout.astro
│   │   ├── MarkdownLayout.astro
│   │   └── PageLayout.astro
│   ├── pages/
│   │   ├── [...blog]/
│   │   │   ├── [category]/
│   │   │   ├── [tag]/
│   │   │   ├── [...page].astro
│   │   │   └── index.astro
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   ├-- rss.xml.ts
│   │   └── ...
│   ├── utils/
│   ├── config.yaml
│   └── navigation.js
├── package.json
├── astro.config.ts
└── ...
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory if they do not require any transformation or in the `assets/` directory if they are imported directly.

[![Open in Gitpod](https://svgshare.com/i/xdi.svg)](https://gitpod.io/?on=gitpod#https://github.com/wtmgdgmadrid/wtmgdgmadrid.github.io) [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/wtmgdgmadrid/wtmgdgmadrid.github.io)

> 👩‍� **Ready to contribute?** Check our [Contributing](#contributing) section below!

<br>

### Commands

All commands are run from the root of the project, from a terminal:

| Command             | Action                                             |
| :------------------ | :------------------------------------------------- |
| `npm install`       | Installs dependencies                              |
| `npm run dev`       | Starts local dev server at `localhost:4321`        |
| `npm run build`     | Build your production site to `./dist/`            |
| `npm run preview`   | Preview your build locally, before deploying       |
| `npm run check`     | Check your project for errors                      |
| `npm run fix`       | Run Eslint and format codes with Prettier          |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro preview` |

<br>

### Configuration

Basic configuration file: `./src/config.yaml`

```yaml
site:
  name: 'Example'
  site: 'https://example.com'
  base: '/' # Change this if you need to deploy to Github Pages, for example
  trailingSlash: false # Generate permalinks with or without "/" at the end

  googleSiteVerificationId: false # Or some value,

# Default SEO metadata
metadata:
  title:
    default: 'Example'
    template: '%s — Example'
  description: 'This is the default meta description of Example website'
  robots:
    index: true
    follow: true
  openGraph:
    site_name: 'Example'
    images:
      - url: '~/assets/images/default.png'
        width: 1200
        height: 628
    type: website
  twitter:
    handle: '@twitter_user'
    site: '@twitter_user'
    cardType: summary_large_image

i18n:
  language: en
  textDirection: ltr

apps:
  blog:
    isEnabled: true # If the blog will be enabled
    postsPerPage: 6 # Number of posts per page

    post:
      isEnabled: true
      permalink: '/blog/%slug%' # Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
      robots:
        index: true

    list:
      isEnabled: true
      pathname: 'blog' # Blog main path, you can change this to "articles" (/articles)
      robots:
        index: true

    category:
      isEnabled: true
      pathname: 'category' # Category main path /category/some-category, you can change this to "group" (/group/some-category)
      robots:
        index: true

    tag:
      isEnabled: true
      pathname: 'tag' # Tag main path /tag/some-tag, you can change this to "topics" (/topics/some-category)
      robots:
        index: false

    isRelatedPostsEnabled: true # If a widget with related posts is to be displayed below each post
    relatedPostsCount: 4 # Number of related posts to display

analytics:
  vendors:
    googleAnalytics:
      id: null # or "G-XXXXXXXXXX"

ui:
  theme: 'system' # Values: "system" | "light" | "dark" | "light:only" | "dark:only"
```

<br>

#### Customize Design

To customize Font families, Colors or more Elements refer to the following files:

- `src/components/CustomStyles.astro`
- `src/assets/styles/tailwind.css`

### Deploy

#### Deploy to production (manual)

You can create an optimized production build with:

```shell
npm run build
```

Now, your website is ready to be deployed. All generated files are located at
`dist` folder, which you can deploy the folder to any hosting service you
prefer.

#### Deploy to GitHub Pages

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

#### Deploy to Netlify

Fork this repository and deploy it to Netlify:

[![Netlify Deploy button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/wtmgdgmadrid/wtmgdgmadrid.github.io)

#### Deploy to Vercel

Fork this repository and deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwtmgdgmadrid%2Fwtmgdgmadrid.github.io)

<br>

## Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to contribute:

- 🐛 **Report bugs** - Open an issue if you find any problems
- 💡 **Suggest features** - Share your ideas for improving the website
- 📝 **Content updates** - Help us keep event information and content up to date
- 🎨 **Design improvements** - Suggest UI/UX enhancements
- 🔧 **Code contributions** - Fix bugs or implement new features

### How to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

Please ensure your contributions align with our community values and maintain the inclusive nature of WTM Madrid.

## Acknowledgements

Built with ❤️ by the WTM Madrid community. Based on the [AstroWind](https://github.com/arthelokyo/astrowind) template.

Special thanks to all our [contributors](https://github.com/wtmgdgmadrid/wtmgdgmadrid.github.io/graphs/contributors) who help make this website better.

## License

**WTM Madrid** website is licensed under the MIT license — see the [LICENSE](./LICENSE.md) file for details.
