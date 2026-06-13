# Verdant Goods — Product Catalog (Capstone)

A modular React + Vite e-commerce catalog with client-side routing, a token-based
design system, and zero-dependency generative product imagery (no image downloads,
fast first paint).

## Stack
- React 18 + React Router 6 (client-side routing: Home / Category / Product / 404)
- Vite (build tool, code-splitting, minification via Terser)
- Plain CSS with design tokens (no framework bloat)

## Run locally

```bash
npm install
npm run dev
```

## Build (optimized)

```bash
npm run build
```

This produces a minified, code-split `dist/` folder:
- Console/debugger statements stripped
- Vendor (react/react-dom/react-router) split into its own chunk for caching
- CSS minified

Preview the production build locally:

```bash
npm run preview
```

## Deploy

### Option A — GitHub + Vercel (recommended, ~2 min)
1. Push this folder to a new GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Verdant Goods catalog"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to https://vercel.com → "New Project" → import the GitHub repo.
3. Framework preset: **Vite**. Build command `npm run build`, output dir `dist`.
   (`vercel.json` is already included for SPA route fallback.)
4. Deploy — you'll get a public `*.vercel.app` URL.

### Option B — Netlify
1. Push to GitHub as above.
2. https://app.netlify.com → "Add new site" → "Import an existing project".
3. `netlify.toml` already configures build command, publish dir, and SPA redirects.
4. Deploy — you'll get a public `*.netlify.app` URL.

### Option C — Drag-and-drop (no GitHub, fastest)
1. Run `npm run build` locally.
2. Go to https://app.netlify.com/drop and drag the `dist/` folder in.
3. Instant live URL.

## Project structure

```
src/
  components/   Header, Footer, ProductCard, ProductImage
  pages/        Home, Category, Product, NotFound
  data/         products.js (catalog data)
  styles/       global.css (design tokens + all styles)
```
