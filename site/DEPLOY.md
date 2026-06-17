# Deploy — Northwind CSF 2.0 site

Static site. Zero build step. Deploys to Vercel in ~30 seconds.

## One-time
```bash
cd /Users/ozirusmorency/Downloads/Pal/Projects/grc-nist-csf-assessment/site
vercel login           # interactive (browser) — run this yourself in Terminal
```
> In this session, type it with a leading `!` so the login output lands here:
> `! cd /Users/ozirusmorency/Downloads/Pal/Projects/grc-nist-csf-assessment/site && vercel login`

## Deploy
```bash
cd /Users/ozirusmorency/Downloads/Pal/Projects/grc-nist-csf-assessment/site
vercel --prod --yes
```
When prompted for the project name, use **`northwind-csf`** so the URL matches the
résumé link: **https://northwind-csf.vercel.app**

If you pick a different name, update the one line in
`GRC_Portfolio_Block/Ozirus_Morency_Resume_GRC.tex` (search `northwind-csf.vercel.app`)
and re-run `build.sh`.

## What ships
- `index.html`, `styles.css`, `app.js`, `data.js`, `vercel.json`
- No dependencies, no node_modules, no secrets. Fonts load from Google Fonts CDN.

## Local preview (what employers will see)
```bash
cd /Users/ozirusmorency/Downloads/Pal/Projects/grc-nist-csf-assessment/site
python3 -m http.server 8777
# open http://localhost:8777
```
