# Mobile / Desktop Layout Audit - Northwind CSF 2.0 Site

**Target:** https://northwind-csf.vercel.app (source `Projects/grc-nist-csf-assessment/site/`)
**Method:** Playwright live audit - top-to-bottom scroll-through at 5 viewports, plus a full-DOM
overflow/overlap/tap-target/clip diagnostic run at each width.
**Date:** 2026-06-18

## Viewports tested
| Class | Size | Result |
|-------|------|--------|
| Desktop | 1440×900 | Clean (0 horizontal overflow) |
| Desktop | 1280×800 | Clean (0 horizontal overflow) |
| Tablet | 820×1180 | 1 minor (2px CTA) |
| Mobile | 390×844 (iPhone) | 1 major + 2 moderate |
| Mobile | 360×800 (Android) | 1 major + 2 moderate (slightly worse) |

**Document-level horizontal scroll = 0 at every viewport.** No section pushes the page sideways;
the issues below are *internal* to specific widgets.

---

## ✅ RESOLVED - 2026-06-17 (all 5 findings fixed & re-verified)

Fixed via 3 parallel worktree-isolated agents (POA&M / nav / demo regions), merged to `site/`.
Re-audited live (local server + Playwright) across **9 widths** (360, 390, 760, 820, 900, 925,
1000, 1280, 1440): **0 doc h-scroll, 0 overflowers, 0 POA&M label clips, 6/6 nav links on-screen
at every width.**

| # | Fix shipped | Files |
|---|-------------|-------|
| 1 🔴 | POA&M description now an always-visible, full-width wrapping `.grow__desc` line (3rd grid child); in-bar clipping `.gbar__txt` removed, bar demoted to timeline indicator + `title=` hover tooltip. 10/10 rows readable on mobile. | `app.js` `gantt()`, `styles.css` |
| 5 🟡 | `.gbar__status` `max-width:2.1rem; overflow:hidden` dropped → "● live" no longer clips to "liv". | `styles.css` |
| 2 🟠 | Mobile `.nav__links` now `flex-wrap:wrap` (was off-screen `overflow-x:auto`) → all 6 links visible, no hidden scroll. | `styles.css` |
| 4 🟡→fixed | Real cause: 4-child nav (mark+links+**apistat**+CTA) needs ~924px in one row; once the live API pill populates it overflowed ~63px on tablets (audit's "2px" predated the pill). Nav now **wraps below 925px** instead of `nowrap` → CTA stays on-screen 820-1440. | `styles.css` |
| 3 🟠 | Checkboxes 15→18px; `.demo__checks label` `min-height:44px`; nav links `padding-block:.55rem` (~20→38px). | `styles.css` |

---

## Findings by severity

### 🔴 MAJOR

| # | Section | Viewport(s) | Issue | Evidence | Proposed fix |
|---|---------|-------------|-------|----------|--------------|
| 1 | **04 - POA&M (Gantt)** | Mobile 390/360 (severe); short bars at all widths | Each remediation item's **description is rendered only inside its Gantt bar** (`.gbar__txt`, `white-space:nowrap; overflow:hidden; text-overflow:ellipsis`). Bar width = task duration, so on a 360-390px track every bar is tiny and the label clips to a few characters ("Provisi", "Define", "Deplo", "Stand up vendor …"). There is **no tooltip** (`title` attr is null) and no fallback text, so the POA&M is effectively unreadable on phones. Even on desktop, short-duration bars (e.g. POAM-001) clip their label with no way to read it. | `.gbar__txt` measured `scrollWidth 504 / clientWidth 42` at 390, 360, 820 **and** 1280; `m390-04-poam.png`, `d1280-04-poam.png` | Render the description as **always-visible readable text** (in `.grow__meta` or a new `.grow__desc` line) and demote the bar to a pure timeline indicator. Add `title={description}` to `.gbar` for a desktop hover tooltip. On mobile (`@media max-width:680px`) the Gantt should reflow to a **stacked list** (id + owner + full wrapping description + a thin severity bar), mirroring the crosswalk's card reflow. *Touches `app.js` (emit description text / title) + `styles.css`.* |

### 🟠 MODERATE

| # | Section | Viewport(s) | Issue | Evidence | Proposed fix |
|---|---------|-------------|-------|----------|--------------|
| 2 | **Sticky nav** | Mobile ≤760px | At ≤760px `.nav__links` becomes `overflow-x:auto` with `scrollbar-width:none` + hidden webkit scrollbar. "Demo" (and part of "Proof") sit **off-screen** (right edge 405 vs viewport 360/390). The links are swipe-reachable but there is **zero visual affordance** that the nav scrolls - most users never discover "Demo" / "Proof". | nav last link `right:405, cutoff:true` at 360 & 390; `m390-01-top.png` shows "…Crosswalk Proof" with Demo cut | Give the mobile nav a visible affordance: either (a) a subtle right-edge gradient/fade mask hinting more content, (b) wrap to two rows (`flex-wrap:wrap`) instead of horizontal scroll, or (c) a compact "More ▾" / hamburger for the overflow items. Lowest-effort: `flex-wrap:wrap` on `.nav__links` so all six show. *`styles.css` only.* |
| 3 | **Tap targets** | Mobile 390/360 | Interactive targets below the 44px guideline: nav links ~**20px** tall; vendor-tiering **checkboxes 15×15px**. Hard to hit reliably on touch. | diagnostic `smallTap`: nav `A` h=20; `INPUT` 15×15 | Increase touch area: nav links `padding-block:.5rem` (visual size unchanged via negative margin if needed); enlarge checkboxes to ~18-20px and/or make the whole `.label` row the tap target (label already wraps the input - ensure `min-height:44px`). *`styles.css` only.* |

### 🟡 MINOR

| # | Section | Viewport(s) | Issue | Evidence | Proposed fix |
|---|---------|-------------|-------|----------|--------------|
| 4 | **Nav CTA** | Tablet 820 | `.nav__cta` ("Live demo ↓") right edge = 822 vs viewport 820 - overflows by ~2px (padding/border rounding at the breakpoint between the desktop row layout and the ≤760 wrap layout). Not visible to users; no page scroll. | overflowers: `A.nav__cta right:822` at 820 | Reduce nav horizontal padding at the 761-860px band, or add `flex-shrink` to `.nav__cta`. Cosmetic. |
| 5 | **POA&M status pill** | All | `.gbar__status` ("● live") has `max-width:2.1rem; overflow:hidden` so the word "live" can clip to "liv". Cosmetic; rolls up into fix #1. | CSS line 322-332 | Widen `max-width` or drop the label, keeping just the ● dot. |

---

## Verified CLEAN (no breaks at any viewport)

- **Hero** - heading, maturity gauge, 4 stat tiles stack correctly on mobile.
- **01 Posture** - radar chart + 6-Function list reflow cleanly.
- **02 Risk** - 5×5 matrix (350px) + detail card fit mobile width.
- **03 Control Testing** - 5 test rows; `@media 680` drops to 2-col then full-width objective.
- **05 Crosswalk** - **exemplary responsive pattern**: filter tabs wrap to a grid and each table row
  collapses to a stacked labeled card on mobile. (Use this as the model for fixing the POA&M.)
- **06 TPRM**, **07 Deliverables** (12 items render - see note), **08 Transferable**, **09 Proof Map**,
  **10 Interview Demo Mode** (probe buttons wrap, vendor form stacks, JSON output box `overflow-x:auto`
  with no spill), **footer**.
- **Live API** returns real JSON at mobile (`/api/health`, `/api/risks`) with no output overflow.
- **Offline fallback** - with `/api/*` forced to fail, probes still render correct **bundled** data
  (data.js) gracefully; every figure resolves. Both states verified.

### Screenshot/capture caveats (NOT site bugs - DOM-verified)
- 1440 fullPage showed an "empty" Deliverables box; 820 fullPage showed the hero **duplicated**.
  Both are Playwright `fullPage` stitching artifacts caused by IntersectionObserver reveal-on-scroll
  animations re-firing during the long capture. DOM confirms: 1 H1, 1 hero node, 11 sections,
  12 deliverable `<li>` at opacity 1. Real users never see these artifacts.

---

## Recommended fix order
1. **POA&M mobile reflow + readable descriptions (#1)** - the only true content-blocking break.
2. **Mobile nav affordance (#2)** - `flex-wrap:wrap` is a one-line, low-risk win.
3. **Tap targets (#3)**, then minors **#4/#5**.

All fixes are dependency-free (vanilla CSS + a small `app.js` data tweak for #1) - no frameworks,
Vercel-ready. Fix #1 needs `app.js`; #2-#5 are `styles.css` only.

**Screenshots:** `m390-01-top.png`, `m390-02-risk.png`, `m390-04-poam.png`, `m390-05-crosswalk.png`,
`m390-10-demo.png`, `d1280-04-poam.png`, `audit-1440-full.png`, `t820-full.png`, `d1280-full.png`
(in repo root `/Users/ozirusmorency/Downloads/Pal/`).
