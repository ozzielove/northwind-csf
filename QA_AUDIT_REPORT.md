# QA Audit Report - Northwind CSF 2.0 GRC Portfolio Site

**Date:** 2026-06-18
**Target:** `Projects/grc-nist-csf-assessment` (static frontend + Vercel serverless API + Python/JS scoring)
**Live:** https://northwind-csf.vercel.app
**Method:** Two-phase audit. 8 specialized agents (static analysis) -> adversarial verification of every
critical/high/medium finding -> release-readiness synthesis. 26 raw findings -> 9 confirmed (5 refuted,
12 low/info dismissed). All confirmed defects fixed; regression tests added; suite green at 38/38.

> Scope note: the requested QA brief targets an exam/assessment-taking platform (candidates, graders,
> proctors, exam timers, answer-autosave). This codebase has none of those. The fleet was mapped to the
> real surface; "Timer/Session" was reported **not applicable** and audited the closest analog
> (localStorage theme + tour state). No defects invented for absent features.

---

## Release readiness: GO (was GO_WITH_FIXES; all must-fix items resolved)

The centerpiece held under independent verification: maturity math is correct and internally consistent
(overall 1.57 = sum 36 / 23 subcategories, Tier 2; six Function means and `/api/score` recompute all
agree), content stays correctly simulated/fictional with entry-level framing, and there is no live XSS or
wrong displayed figure. The two defect classes that blocked a clean GO - a hard guardrail breach
(em/en dashes) and a self-inconsistent verifiability contract (test count + leaked review artifacts) -
are now fixed and pinned by tests.

---

## Bugs fixed (9 confirmed)

| ID | Sev | Title | Fix |
|----|-----|-------|-----|
| DATA-01 / A11Y-03 | Medium | 71 em/en dashes across shipped frontend source render in user-facing copy (hard guardrail breach) | Normalized U+2013/U+2014 to ASCII hyphen in `index.html`, `app.js`, `data.js`, `scoring.js`, `apiutil.js`, `styles.css`, `package.json`; verified 0 remain in source AND in every rendered tab |
| SCORE-02 | Medium | Duplicate test files under `ChatGPT_Review_Flat/` auto-discovered by `node --test`, doubling the count (29 -> 58) and risking a stale fork masking a scorer regression | Removed the untracked `ChatGPT_Review_Flat/` review export (regenerable via `scripts/build_flat_review.sh`); scoped the test glob to `node --test "tests/**/*.test.js"` |
| SCORE-01 | Medium | `CLAIM_MATRIX.md` asserted `npm test (27)` - a number a recruiter can falsify in one command | Dropped the drift-prone integer to `(all green)`; pinned by `meta.test.js` so no bare count can return |
| SCORE-03 | Medium | Hardcoded display figures (`ASSESSMENT.overall`, `FUNCTIONS[].score/.tier`) never asserted equal to computed scorer output - silent desync risk | Added a drift-guard test asserting hardcoded == `scoreFromSubscores(SUBSCORES)` for overall, tier, and every Function |
| A11Y-01 | Medium | `role="img"` on the risk matrix figure orphaned its 10 keyboard-focusable risk dots (ARIA leaf-node conflict) | Removed `role=img`; moved the label to the inner `<svg role="group">` so the focusable markers stay reachable |
| A11Y-02 | Medium | 23-cell subcategory density heatmap was `aria-hidden`, hiding all subcategory scores from screen readers | Removed `aria-hidden`; made it `role="list"` and gave each cell `role="listitem"` + `aria-label="<sub>, score N of 3"` |
| SEC-01 | Low | No Content-Security-Policy (and no HSTS) - defense-in-depth gap on a security portfolio | Added a CSP scoped to the exact origins used (self + Google Fonts + `data:` favicon + same-origin API) plus HSTS, in `vercel.json` |
| PERF-03 | Low | ~580KB of dev/review artifacts (`FRONTEND_REVIEW_BUNDLE.md`, `ChatGPT_Review_Flat/`) shipped to the public deploy (no `.vercelignore`) | Added `site/.vercelignore` excluding review/docs/tests/scripts; removed the flat review dir |

### Refuted by adversarial verification (5 - left as-is, correctly)
`FUNC-02` (render-node null guards: actually guarded), `SCORE-04` (JS vs Python rounding divergence:
both round-half-up, agree at 1.57), `PERF-01` (render-blocking scripts: at `</body>`, non-blocking),
`PERF-02` (unthrottled tour listeners: rAF-gated already), `BC-01` (`color-mix()` fallbacks: degrade
acceptably). Twelve low/info items were noted but not actioned.

---

## Tests added (29 -> 38, all green)

| File | Guards | Tests |
|------|--------|-------|
| `tests/guardrails.test.js` | DATA-01/A11Y-03 - no em/en dash in any runtime-shipped file | 1 |
| `tests/meta.test.js` | SCORE-01/02 - no `*.test.js` outside `tests/`; no stale hardcoded count in `CLAIM_MATRIX.md` | 2 |
| `tests/dom-a11y.test.js` | A11Y-01/02 - matrix not `role=img`; density not `aria-hidden` + labeled cells | 3 |
| `tests/headers.test.js` | SEC-01 - `vercel.json` has CSP (`default-src 'self'` + `frame-ancestors`) + HSTS | 2 |
| `tests/assessment.test.js` (added) | SCORE-03 - hardcoded display figures == computed scorer output | 1 |

---

## New automation (per request): em/en-dash scrubber

`scripts/scrub_em_dashes.js` (dependency-free Node) scans **both** layers and optionally fixes:
- **Static mode:** every text source file under `site/` (html, css, js, json, md, sh, py, txt), reported `file:line:col`.
- **Live demo / all tabs:** reproduces every tab's rendered payload (Posture, Risk, Controls, Crosswalk,
  Vendors, Evidence, Score, Assessment) by exercising the same `data.js` graph + `scoring.js` endpoints
  the demo calls, then deep-scans every produced string - no browser needed.

```bash
npm run scrub:dashes        # scan only; exit 1 if any found (CI-friendly)
npm run scrub:dashes:fix    # replace U+2013/U+2014 with '-' across site/, then re-scan
```

Respects the `NOTEBOOKLM_*` guardrail automatically (those live at the repo root, outside `site/`, so the
scrubber never touches them). The tool itself is ASCII-clean (uses `–—` escapes) so it neither
flags nor corrupts itself.

---

## Remaining risks (accepted / out of scope)

1. **CSP allows `'unsafe-inline'` for scripts/styles.** Required by the inline theme-bootstrap `<script>`
   and inline `style=` attributes. Hardening path: hash the bootstrap block and externalize inline styles
   to drop `'unsafe-inline'`. Low risk for a static portfolio; logged, not blocking.
2. **`color-mix()` has no fallback** in older Safari/Firefox (BC-01, refuted as non-blocking) - severity
   colors degrade to a default rather than break layout. Acceptable for the audience.
3. **No automated a11y/Playwright run in CI** - the a11y guards here are static markup assertions, not a
   live axe-core sweep. A browser-based pass (focus order, computed names, reduced-motion) remains manual.
4. **Repo-root docs** (`NOTEBOOKLM_*`, `PORTFOLIO_WALKTHROUGH.*`) were intentionally left untouched per the
   standing guardrail; they may still contain em/en dashes but are not shipped by the site.

## Verification performed
- `npm test` -> 38/38 pass.
- `node --check` clean on all runtime JS + the new script.
- `npm run scrub:dashes` -> 0 in static source, 0 in all rendered tabs, exit 0.
- Scoring math independently recomputed: GV 1.40, ID 1.60, PR 2.00, DE 1.33, RS 1.33, RC 1.50; overall 1.57.

## Not yet shipped
Changes are committed to the working tree only. Deploy = commit + push to `main` (Vercel auto-deploys).
Awaiting go-ahead before pushing live.
