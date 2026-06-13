# Portfolio — Alex Rivera

A pixel-perfect, fully responsive portfolio built with semantic HTML5, advanced CSS3 architecture, and vanilla JavaScript. No frameworks. No build step. Just web standards.

## Features

### CSS Architecture
- **CSS Custom Properties** — full light/dark theme system via `data-theme` attribute
- **CSS Grid** — two-dimensional page layouts (hero, projects, skills, about, contact)
- **Flexbox** — component-level alignment (nav, cards, buttons, form fields)
- **Mobile-first media queries** — five responsive breakpoints (xs → xl)
- **Fluid typography** — `clamp()` for smooth type scaling across viewports
- **CSS animations** — `@keyframes`, scroll-triggered reveals, reduced-motion support

### JavaScript (vanilla, ~150 lines)
- Theme toggle with `localStorage` persistence & OS preference sync
- Accessible mobile nav (ARIA, focus trap, Escape key)
- `IntersectionObserver` scroll reveal & skill bar animation
- Active nav link highlighting on scroll
- Smooth scroll with header offset compensation
- Contact form with optimistic UI feedback

### Performance
- Zero runtime dependencies
- Google Fonts loaded with `preconnect` + `display=swap`
- CSS split across logical modules for maintainability
- Decorative animations disabled via `prefers-reduced-motion`

## File structure

```
portfolio/
├── index.html
├── css/
│   ├── variables.css    # Design tokens (colours, spacing, type scale)
│   ├── reset.css        # Normalisation + base styles
│   ├── layout.css       # CSS Grid page layouts
│   ├── components.css   # All UI components
│   ├── animations.css   # Keyframes + scroll reveal classes
│   └── responsive.css   # Breakpoint overrides (mobile-first)
└── js/
    └── main.js          # All interactions
```

## Getting started

Clone and open directly — no build step required:

```bash
git clone https://github.com/<you>/portfolio.git
cd portfolio
open index.html   # macOS
# or: python3 -m http.server 8080 && open http://localhost:8080
```

## Deployment

Works on any static host. Recommended options:

| Platform | Command / Steps |
|---|---|
| **GitHub Pages** | Settings → Pages → Deploy from `main` branch root |
| **Netlify** | Drag the `portfolio/` folder to [app.netlify.com/drop](https://app.netlify.com/drop) |
| **Vercel** | `npx vercel` in the project root |

## Customising

1. **Colours** — edit `css/variables.css`, both `:root` (dark) and `[data-theme="light"]` blocks
2. **Content** — edit `index.html` directly; all copy is in semantic HTML
3. **Projects** — duplicate a `.project-card` and swap the decorative `.project-card__visual` element
4. **Typography** — swap the Google Fonts URL and update `--font-display` / `--font-body` variables

## Browser support

All evergreen browsers (Chrome 90+, Firefox 90+, Safari 15+, Edge 90+). CSS Grid and custom properties are used throughout; no IE11 support.

---

Built with ❤ and zero `node_modules`.
