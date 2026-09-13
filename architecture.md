<!-- architecture.md -->
# Architecture — Luxury Hotel Management Site

## Stack
- Next.js (static export via `output: 'export'`) — required for GitHub Pages
- Tailwind CSS
- Framer Motion
- Data: local JSON (no backend/database; site is fully static)

## next.config.js essentials
```js
/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  images: { unoptimized: true }, // GitHub Pages has no image optimization server
  basePath: '/your-repo-name',   // only if not using a custom domain / user page
  trailingSlash: true,           // avoids 404s on GH Pages routing
};
```

## Directory Tree