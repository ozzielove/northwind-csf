# Deploy — Northwind CSF 2.0 site

Vanilla frontend + Vercel serverless functions (`/api`). No secrets, no database.
The `/api/*.js` files become serverless functions automatically; everything else is static.

## Local development

```bash
cd /Users/ozirusmorency/Downloads/Pal/Projects/grc-nist-csf-assessment/site

# Static only (no API) — fastest:
python3 -m http.server 8777        # → http://localhost:8777  (nav shows "static mode")

# Full stack with live /api/* :
vercel dev                         # → http://localhost:3000  (nav shows "API online")
```

## One-time auth
```bash
vercel login        # interactive (browser) — run yourself in Terminal
```
> In this session, prefix with `!` so output lands here:
> `! cd /Users/ozirusmorency/Downloads/Pal/Projects/grc-nist-csf-assessment/site && vercel login`

## Deploy
```bash
cd /Users/ozirusmorency/Downloads/Pal/Projects/grc-nist-csf-assessment/site
vercel --prod --yes
```
The project is already linked (`.vercel/project.json` → **northwind-csf**), so this publishes to
**https://northwind-csf.vercel.app**. If you ever relink under a different name, update the one
résumé line in `GRC_Portfolio_Block/Ozirus_Morency_Resume_GRC.tex` (search `northwind-csf.vercel.app`)
and re-run its `build.sh`.

## What ships
- Static: `index.html`, `styles.css`, `app.js`, `data.js`, `scoring.js`, `vercel.json`
- Functions: `/api/health`, `/api/assessment`, `/api/risks`, `/api/crosswalk`, `/api/score`,
  `/api/vendor-tier`, `/api/evidence` (+ shared `apiutil.js` at root)
- Not deployed but in-repo: `/scripts` (Python), `/tests` (node --test), `/data` (CSV mirrors)

## Static fallback expectations
The site never hard-depends on the API. If `/api/*` is unreachable, `app.js` recomputes from the
bundled `data.js` via `scoring.js` and the demo panel labels each result **"static fallback."**
So even pure static hosting (e.g. `python3 -m http.server`) renders every figure.

## Environment variables
None. No secrets required.

## Troubleshooting
- **Functions 404 locally** → use `vercel dev`, not `http.server` (the latter is static-only).
- **Nav badge stuck on "static mode" in prod** → check the Functions tab in the Vercel dashboard;
  confirm `/api/health` returns 200. CommonJS `require("../data.js")` must resolve (no `"type":"module"`).
- **Stale data after a deploy** → `data.js`/`scoring.js` carry a long cache header; hard-refresh.
