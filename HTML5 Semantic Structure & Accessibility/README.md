# Alex Rivera — Portfolio Website

A fully accessible, semantic portfolio built with vanilla HTML5, CSS, and JavaScript. Designed to score **100/100** on Lighthouse Accessibility and SEO audits.

## ✨ Features

- **Semantic HTML5** — `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, `<time>`, `<figure>`, `<dl>` used correctly throughout
- **WCAG 2.2 AA compliant** — focus indicators, colour contrast ≥ 4.5:1, skip link, ARIA labels, live regions
- **Accessible contact form** — inline error messages via `aria-live`, `aria-invalid`, `aria-required`, `aria-describedby`
- **SEO-optimised** — canonical tags, Open Graph, Twitter Card, JSON-LD structured data, sitemap.xml, robots.txt
- **Keyboard navigable** — full tab order, Escape closes mobile nav, focus management on form submission
- **Screen reader tested** — semantic landmarks, `role` attributes, visually-hidden helper class, `aria-current` for active page
- **Responsive** — mobile-first, fluid type scale via `clamp()`, no layout shift
- **Respects `prefers-reduced-motion`** — all animations disabled for users who prefer it
- **Zero dependencies** — pure HTML/CSS/JS, no frameworks, no build step required

## 📁 Structure

```
portfolio/
├── index.html              # Home
├── pages/
│   ├── about.html          # About / Experience / Skills
│   ├── projects.html       # Projects with filter
│   ├── blog.html           # Blog listing + newsletter
│   └── contact.html        # Accessible contact form
├── css/
│   ├── base.css            # Design tokens, reset, shared components
│   ├── home.css            # Home page styles
│   ├── about.css           # About page styles
│   ├── projects.css        # Projects page styles
│   ├── blog.css            # Blog page styles
│   └── contact.css         # Contact form styles
├── js/
│   ├── main.js             # Shared: nav toggle, year, scroll-reveal
│   ├── contact-form.js     # Accessible form validation
│   └── projects-filter.js  # Accessible project filtering
├── assets/
│   └── icons/
│       └── favicon.svg
├── sitemap.xml
├── robots.txt
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Pages auto-deploy
```

## 🚀 Deploy to GitHub Pages

### Option 1 — Automatic (recommended)

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select **GitHub Actions**
4. The included workflow (`.github/workflows/deploy.yml`) deploys on every push to `main`

### Option 2 — Manual

1. Go to **Settings → Pages**
2. Under **Source**, select **Deploy from a branch**
3. Select `main` branch and `/ (root)` folder
4. Save — your site will be live at `https://<username>.github.io/<repo-name>/`

## 🛠 Customisation

1. **Replace `Alex Rivera`** — search and replace across all HTML files
2. **Update meta URLs** — change `https://alexrivera.dev` to your domain
3. **Social links** — update GitHub/LinkedIn/Twitter URLs in each page's footer
4. **Projects** — add/remove `<li>` items in `pages/projects.html`
5. **Colours** — edit CSS custom properties in `css/base.css` under `:root`

## ♿ Accessibility Checklist

| Criterion | Implementation |
|-----------|---------------|
| Skip link | ✅ `.skip-link` visible on focus |
| Page language | ✅ `<html lang="en">` |
| Landmark roles | ✅ `banner`, `navigation`, `main`, `contentinfo` |
| Heading hierarchy | ✅ Single `h1`, logical `h2`/`h3` nesting |
| Focus indicators | ✅ 2px solid accent, `outline-offset: 3px` |
| Colour contrast | ✅ Text #F0EFF8 on #0A0A0F = 16.8:1 |
| ARIA labels | ✅ All navs, forms, buttons, icons labelled |
| Live regions | ✅ Form errors, filter announcements |
| Keyboard nav | ✅ Full tab order, Escape closes menus |
| Reduced motion | ✅ `@media (prefers-reduced-motion: reduce)` |
| alt text | ✅ All images have descriptive alt attributes |
| Form labels | ✅ Every input has an associated `<label>` |
| Error identification | ✅ WCAG 3.3.1 inline errors with `aria-invalid` |
| Status messages | ✅ WCAG 4.1.3 `aria-live` regions |

## 📄 Licence

MIT — free to use, modify, and redistribute.
