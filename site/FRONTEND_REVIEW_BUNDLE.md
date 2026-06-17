# FRONTEND REVIEW BUNDLE — Northwind CSF 2.0 (employer-facing GRC portfolio site)

> PASTE THIS ENTIRE FILE INTO CHATGPT. The review prompt is at the top; all source files follow.

## What this portfolio IS (context for the reviewer)
This site is the **live, employer-facing presentation** of a self-directed Governance, Risk &
Compliance (GRC) portfolio project — it is what a hiring manager opens in an interview, **in place of
a GitHub repo**. It must stand on its own as proof of work. The underlying project:

- An **end-to-end GRC assessment of a fictional healthcare-software company** (Northwind Health
  Systems), evaluating controls against all six **NIST Cybersecurity Framework (CSF) 2.0** Functions
  (Govern, Identify, Protect, Detect, Respond, Recover) and scoring maturity with a Python tool that
  outputs per-Function scores and a KPI summary.
- A **multi-framework control crosswalk** mapping NIST CSF 2.0 → NIST SP 800-53 Rev 5 →
  ISO/IEC 27001:2022 Annex A → SOC 2 Trust Services Criteria → HITRUST CSF v11 → HIPAA Security Rule,
  with every control identifier verified against authoritative published sources.
- A complete **artifact set**: scope statement, risk methodology + risk register, control test plan
  (design vs. operating effectiveness), audit findings report, Plan of Action & Milestones (POA&M),
  information security policy, and evidence collection log.
- A **tiered third-party-risk (TPRM) program** with a SIG/CAIQ-style questionnaire and a SOC 2
  report-review step.

The author is an entry-level GRC candidate (US Army veteran, BS Cybersecurity in progress, Google
Cybersecurity Certificate). Everything is **simulated / portfolio work on a fictional organization** —
NOT real client work, NOT production GRC employment, NOT platform administration, and must stay
labeled that way. Every figure on the site traces to the project's data (see `data.js`).

The site is intentionally **vanilla HTML/CSS/JS** — no framework, no bundler, no dependencies
(Google Fonts CDN only), deployable to Vercel as static files. Aesthetic: dark "audit instrument"
console; Fraunces display + IBM Plex Mono/Sans; hand-built SVG/DOM visualizations (maturity radar,
5x5 risk matrix, POA&M gantt, framework crosswalk), tiered-vendor and deliverables sections.

## Review prompt (use verbatim)
You are a principal frontend engineer + design director reviewing the site above. It is FRONT-FACING
TO EMPLOYERS and represents the candidate's competence — treat polish and correctness as career-stakes.

Audit it for EVERY frontend issue across: (1) correctness/bugs, (2) accessibility (WCAG 2.2 AA:
contrast, focus order, keyboard operability of the interactive risk matrix + crosswalk tabs, ARIA,
reduced-motion, screen-reader semantics), (3) responsive/layout from 320px to 1920px (overflow,
clamp() font scaling, the SVG charts, the grid sections), (4) performance (paint, layout thrash,
font loading / CLS, IntersectionObserver usage, animation cost), (5) cross-browser — Safari + Firefox
specifically (backdrop-filter, color-mix(), mask-image, transform-box on SVG, :has if any),
(6) SEO/social (title, meta description, Open Graph / Twitter cards, favicon, lang, headings outline),
(7) visual design taste and hierarchy, (8) resilience (JS disabled, slow/failed fonts,
prefers-reduced-motion, no-data edge cases).

OUTPUT FORMAT — return SURGICAL EDITS only. For each issue:
- `file` + a short `locator` (the exact existing snippet to find)
- `severity` (blocker / high / medium / nit)
- `why` (1 sentence)
- `before` (exact current code) and `after` (exact replacement)
Group by file, ordered by severity. Do NOT rewrite whole files. Preserve the vanilla / no-build /
single-folder architecture, the dark "audit instrument" aesthetic, and the simulated/fictional framing.
Explicitly flag anything an elite reviewer would read as generic or "AI-generated," and anything that
would undercut the candidate's credibility (broken layout, weak contrast, misleading claim, dead link).

---

## FILE: site/index.html  (272 lines)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Northwind Health Systems — NIST CSF 2.0 Assessment</title>
<meta name="description" content="A simulated NIST Cybersecurity Framework 2.0 governance, risk &amp; compliance assessment — interactive audit instrument. Portfolio work by Ozirus B. Morency." />
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%2307090c'/%3E%3Cpath d='M16 6l8 10-8 10-8-10z' fill='none' stroke='%236ef2c0' stroke-width='1.6'/%3E%3C/svg%3E" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400&family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="styles.css" />
</head>
<body>
<div class="grain" aria-hidden="true"></div>
<div class="scan" aria-hidden="true"></div>

<!-- ================= NAV ================= -->
<header class="nav" id="nav">
  <a class="nav__mark" href="#top">
    <span class="nav__glyph">◇</span>
    <span class="nav__id">NORTHWIND&nbsp;/&nbsp;CSF&nbsp;2.0</span>
  </a>
  <nav class="nav__links">
    <a href="#posture">Posture</a>
    <a href="#risk">Risk</a>
    <a href="#controls">Controls</a>
    <a href="#crosswalk">Crosswalk</a>
    <a href="#vendors">Vendors</a>
  </nav>
  <a class="nav__cta" href="#deliverables">The deliverables ↓</a>
</header>

<!-- ================= HERO ================= -->
<section class="hero" id="top">
  <div class="hero__grid" aria-hidden="true"></div>
  <div class="hero__inner">
    <p class="eyebrow reveal">
      <span class="eyebrow__dot"></span> Simulated portfolio engagement · fictional organization
    </p>
    <h1 class="hero__title">
      <span class="reveal" data-d="1">The state of a</span>
      <span class="reveal serif-em" data-d="2">security program,</span>
      <span class="reveal" data-d="3">measured.</span>
    </h1>
    <p class="hero__lede reveal" data-d="4">
      A full governance, risk &amp; compliance assessment of <strong>Northwind Health Systems</strong>,
      a fictional healthcare-SaaS custodian of electronic protected health information — scored against
      all six Functions of the <em>NIST Cybersecurity Framework&nbsp;2.0</em> and crosswalked to five
      adjacent frameworks.
    </p>

    <div class="hero__readout reveal" data-d="5">
      <div class="dial" id="dial" role="img" aria-label="Overall maturity 1.57 of 4, Tier 2 Risk Informed">
        <svg viewBox="0 0 220 220" class="dial__svg">
          <circle class="dial__track" cx="110" cy="110" r="92" />
          <circle class="dial__value" id="dialArc" cx="110" cy="110" r="92" />
        </svg>
        <div class="dial__center">
          <span class="dial__num" id="dialNum">0.00</span>
          <span class="dial__scale">/ 4.00</span>
          <span class="dial__tier">Tier 2 · Risk Informed</span>
        </div>
      </div>
      <ul class="hero__stats">
        <li><span class="stat__n" data-count="6">0</span><span class="stat__l">CSF Functions scored</span></li>
        <li><span class="stat__n" data-count="23">0</span><span class="stat__l">Subcategories assessed</span></li>
        <li><span class="stat__n" data-count="10">0</span><span class="stat__l">Risks · 3 critical</span></li>
        <li><span class="stat__n" data-count="5" data-suffix="">0</span><span class="stat__l">Frameworks crosswalked</span></li>
      </ul>
    </div>

    <p class="hero__by reveal" data-d="6">
      Assessment, tooling &amp; report — <strong>Ozirus&nbsp;B.&nbsp;Morency</strong> ·
      <span class="muted">Q2 2026</span>
    </p>
  </div>
  <div class="hero__scrollcue" aria-hidden="true"><span>scroll</span><i></i></div>
</section>

<!-- ================= POSTURE / RADAR ================= -->
<section class="section" id="posture">
  <div class="section__head">
    <span class="kicker">01 — Posture</span>
    <h2 class="section__title">Six Functions, one honest verdict.</h2>
    <p class="section__sub">
      Maturity on the CSF implementation-tier scale (1 Partial → 4 Adaptive). The program sits at
      <strong>1.57 — Tier 2</strong>. <span class="flag">Detect</span> and <span class="flag">Respond</span>
      are the floor, and they sequence first in remediation.
    </p>
  </div>

  <div class="posture">
    <figure class="radar" aria-label="Radar chart of six CSF Function maturity scores">
      <svg viewBox="0 0 480 480" id="radar"></svg>
    </figure>
    <ol class="fnlist" id="fnlist"></ol>
  </div>

  <div class="density" id="density" aria-hidden="true"></div>
  <p class="density__cap">23 assessed subcategories · cell brightness = subcategory score (1–3)</p>
</section>

<!-- ================= RISK HEATMAP ================= -->
<section class="section" id="risk">
  <div class="section__head">
    <span class="kicker">02 — Risk Register</span>
    <h2 class="section__title">Where the exposure actually lives.</h2>
    <p class="section__sub">
      Ten risks plotted by <em>likelihood</em> × <em>impact</em>. The top-right quadrant is the
      part that keeps a CISO awake — a shared root account with no multi-factor, and no way to see a breach happening.
    </p>
  </div>

  <div class="risk">
    <figure class="matrix" aria-label="Five by five risk matrix, likelihood by impact">
      <svg viewBox="0 0 520 520" id="matrix"></svg>
    </figure>
    <aside class="riskcard" id="riskcard" aria-live="polite">
      <span class="riskcard__id">R-001</span>
      <span class="riskcard__level" data-level="Critical">Critical · 20</span>
      <p class="riskcard__desc">Shared AWS admin account without MFA enables full environment compromise.</p>
      <dl class="riskcard__meta">
        <div><dt>Likelihood</dt><dd id="rc-l">4 / 5</dd></div>
        <div><dt>Impact</dt><dd id="rc-i">5 / 5</dd></div>
        <div><dt>Owner</dt><dd id="rc-o">CTO</dd></div>
        <div><dt>CSF</dt><dd id="rc-s">PR.AA-01</dd></div>
      </dl>
      <p class="riskcard__hint">Hover or tap a cell to inspect ·<span id="rc-count"> 10 risks mapped</span></p>
    </aside>
  </div>
</section>

<!-- ================= CONTROL TESTING ================= -->
<section class="section" id="controls">
  <div class="section__head">
    <span class="kicker">03 — Control Testing</span>
    <h2 class="section__title">Design vs. operating effectiveness.</h2>
    <p class="section__sub">
      A control can be perfectly <em>designed</em> on paper and still fail in <em>operation</em>.
      The incident-response plan exists (design: pass) — but was never exercised (operating: fail).
      That gap is the whole point of testing both.
    </p>
  </div>
  <div class="tests" id="tests"></div>
</section>

<!-- ================= REMEDIATION TIMELINE ================= -->
<section class="section" id="remediation">
  <div class="section__head">
    <span class="kicker">04 — Plan of Action &amp; Milestones</span>
    <h2 class="section__title">A sequenced path to Tier 3.</h2>
    <p class="section__sub">
      Ten remediation items, ordered by severity and dependency across Q3 2026 — critical
      access &amp; detection gaps close first, governance polish lands last.
    </p>
  </div>
  <div class="gantt" id="gantt"></div>
  <div class="gantt__axis" id="ganttAxis"></div>
</section>

<!-- ================= CROSSWALK ================= -->
<section class="section" id="crosswalk">
  <div class="section__head">
    <span class="kicker">05 — Multi-Framework Crosswalk</span>
    <h2 class="section__title">Map once. Satisfy five frameworks.</h2>
    <p class="section__sub">
      The core efficiency argument of a unified GRC program: one assessed control maps to
      NIST 800-53, ISO&nbsp;27001:2022, SOC&nbsp;2, HITRUST, and HIPAA simultaneously.
      Pick a Function to trace the equivalences.
    </p>
  </div>

  <div class="xwalk">
    <div class="xwalk__tabs" id="xtabs"></div>
    <div class="xwalk__table" id="xtable"></div>
  </div>

  <ul class="counts" id="counts"></ul>
</section>

<!-- ================= THIRD-PARTY RISK / TPRM ================= -->
<section class="section" id="vendors">
  <div class="section__head">
    <span class="kicker">06 — Third-Party Risk</span>
    <h2 class="section__title">No vendor touches ePHI unscreened.</h2>
    <p class="section__sub">
      A tiered third-party-risk program: rank a vendor on <em>inherent</em> risk at intake, run a
      SIG / CAIQ-aligned questionnaire, review their SOC&nbsp;2 report, then decide. Higher tier → deeper diligence.
    </p>
  </div>

  <div class="tprm">
    <ol class="tiers" id="tiers" aria-label="Vendor inherent-risk tiers"></ol>

    <div class="tprm__flow">
      <span class="tprm__h">Assessment lifecycle</span>
      <ol class="flow" id="flow"></ol>
    </div>

    <div class="tprm__grid">
      <div class="qcard">
        <span class="tprm__h">Questionnaire domains <span class="muted">· SIG-Lite → CAIQ</span></span>
        <ul class="qdomains" id="qdomains"></ul>
      </div>
      <figure class="example" id="example" aria-label="Worked vendor example">
        <figcaption class="example__cap">Worked example</figcaption>
      </figure>
    </div>
  </div>
</section>

<!-- ================= DELIVERABLES / ARTIFACT SET ================= -->
<section class="section" id="deliverables">
  <div class="section__head">
    <span class="kicker">07 — The Deliverables</span>
    <h2 class="section__title">Twelve artifacts. One coherent engagement.</h2>
    <p class="section__sub">
      Everything visualized above is backed by a complete, audit-grade artifact set — the same
      documents a real GRC engagement produces, authored end to end.
    </p>
  </div>
  <ul class="artifacts" id="artifacts"></ul>
</section>

<!-- ================= FOOTER ================= -->
<footer class="footer" id="foot">
  <div class="footer__lead">
    <h2>An audit you can read in five minutes —<br /><span class="serif-em">and defend for an hour.</span></h2>
    <p>
      Every figure on this page traces to an artifact in the repository: scope statement,
      control checklist, risk register, control test plan, POA&amp;M, evidence log, and a tiered
      third-party-risk program. Scored by a Python maturity tool; every control identifier
      verified against authoritative published sources.
    </p>
  </div>
  <div class="footer__cols">
    <div>
      <span class="footer__h">Frameworks</span>
      <ul>
        <li>NIST CSF 2.0</li><li>NIST SP 800-53 Rev 5</li><li>ISO/IEC 27001:2022</li>
        <li>SOC 2 Trust Services Criteria</li><li>HITRUST CSF v11</li><li>HIPAA Security Rule</li>
      </ul>
    </div>
    <div>
      <span class="footer__h">Artifacts</span>
      <ul>
        <li>Scope statement</li><li>Risk register &amp; methodology</li><li>Control test plan</li>
        <li>Audit findings report</li><li>POA&amp;M</li><li>Vendor-risk program</li>
      </ul>
    </div>
    <div>
      <span class="footer__h">Author</span>
      <ul>
        <li>Ozirus B. Morency</li>
        <li><a href="https://github.com/ozzielove" target="_blank" rel="noopener">github.com/ozzielove ↗</a></li>
        <li><a href="https://linkedin.com/in/ozirusmorency" target="_blank" rel="noopener">linkedin.com/in/ozirusmorency ↗</a></li>
      </ul>
    </div>
  </div>
  <p class="footer__disclaimer">
    <strong>Simulated portfolio engagement.</strong> Northwind Health Systems is a fictional organization.
    This is a readiness self-assessment for demonstration — not a SOC 2 audit, HIPAA attestation, or real client work.
  </p>
  <p class="footer__sig">◇ Designed &amp; built from raw assessment data · 2026</p>
</footer>

<script src="data.js"></script>
<script src="app.js"></script>
</body>
</html>

```

## FILE: site/styles.css  (377 lines)

```css
/* ============================================================================
   Northwind CSF 2.0 — "Audit Instrument"
   Dark phosphor-mint compliance console. Editorial serif + instrument mono.
   ========================================================================== */

:root{
  --bg:        #07090c;
  --bg-2:      #0a0e13;
  --surface:   #0e131a;
  --surface-2: #121a23;
  --line:      #1c2630;
  --line-2:    #2a3744;
  --ink:       #e9efe9;
  --ink-soft:  #aeb9b6;
  --muted:     #6c7a78;
  --faint:     #44514f;

  --mint:      #6ef2c0;   /* primary signal — verified / healthy */
  --mint-dim:  #3aa784;
  --cyan:      #74d0ff;

  /* severity scale */
  --moderate:  #6ef2c0;
  --high:      #f5c14e;
  --critical:  #ff6b6b;

  --maxw: 1180px;
  --ease: cubic-bezier(.22,.61,.36,1);
  --ease-out: cubic-bezier(.16,1,.3,1);

  --f-display: "Fraunces", Georgia, serif;
  --f-mono: "IBM Plex Mono", ui-monospace, monospace;
  --f-sans: "IBM Plex Sans", system-ui, sans-serif;
}

*{ box-sizing:border-box; margin:0; padding:0; }
html{ scroll-behavior:smooth; }
@media (prefers-reduced-motion: reduce){ html{ scroll-behavior:auto; } *{ animation:none !important; transition:none !important; } }

body{
  background:var(--bg);
  color:var(--ink);
  font-family:var(--f-sans);
  font-weight:300;
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
  position:relative;
}

::selection{ background:var(--mint); color:#04110c; }

a{ color:inherit; text-decoration:none; }
strong{ font-weight:500; color:var(--ink); }
em{ font-style:italic; }

/* ---------- atmosphere: grain + faint scanline + global grid ---------- */
.grain{
  position:fixed; inset:0; z-index:9999; pointer-events:none; opacity:.04;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.scan{
  position:fixed; inset:0; z-index:9998; pointer-events:none; opacity:.35;
  background:repeating-linear-gradient(to bottom, transparent 0 3px, rgba(0,0,0,.18) 3px 4px);
  mix-blend-mode:multiply;
}
body::before{
  content:""; position:fixed; inset:0; z-index:0; pointer-events:none;
  background:
    radial-gradient(120% 80% at 70% -10%, rgba(110,242,192,.07), transparent 55%),
    radial-gradient(90% 70% at -10% 110%, rgba(116,208,255,.05), transparent 50%);
}

/* ---------- shared layout ---------- */
.section{
  position:relative; z-index:1;
  max-width:var(--maxw);
  margin:0 auto;
  padding:clamp(5rem,11vw,9rem) clamp(1.25rem,5vw,3rem);
  border-top:1px solid var(--line);
}
.kicker{
  font-family:var(--f-mono); font-size:.72rem; letter-spacing:.28em;
  text-transform:uppercase; color:var(--mint-dim);
}
.section__head{ max-width:760px; margin-bottom:clamp(2.5rem,6vw,4.5rem); }
.section__title{
  font-family:var(--f-display); font-weight:340; font-size:clamp(2rem,5.2vw,3.5rem);
  line-height:1.04; letter-spacing:-.015em; margin:1rem 0 1.2rem;
}
.section__sub{ color:var(--ink-soft); font-size:clamp(1rem,1.6vw,1.12rem); max-width:62ch; }
.serif-em{ font-family:var(--f-display); font-style:italic; font-weight:400; color:var(--mint); }
.muted{ color:var(--muted); }
.flag{
  font-family:var(--f-mono); font-size:.82em; color:var(--critical);
  border:1px solid color-mix(in srgb, var(--critical) 40%, transparent);
  border-radius:3px; padding:.05em .4em; background:color-mix(in srgb,var(--critical) 9%,transparent);
}

/* ---------- nav ---------- */
.nav{
  position:fixed; top:0; left:0; right:0; z-index:100;
  display:flex; align-items:center; justify-content:space-between;
  padding:1rem clamp(1.25rem,5vw,3rem);
  background:color-mix(in srgb, var(--bg) 72%, transparent);
  backdrop-filter:blur(14px) saturate(1.2);
  border-bottom:1px solid transparent;
  transition:border-color .4s var(--ease), background .4s var(--ease);
}
.nav.is-stuck{ border-bottom-color:var(--line); }
.nav__mark{ display:flex; align-items:center; gap:.6rem; font-family:var(--f-mono); font-size:.78rem; letter-spacing:.12em; }
.nav__glyph{ color:var(--mint); animation:spin 14s linear infinite; }
@keyframes spin{ to{ transform:rotate(360deg); } }
.nav__links{ display:flex; gap:1.6rem; font-family:var(--f-mono); font-size:.78rem; letter-spacing:.06em; }
.nav__links a{ color:var(--muted); position:relative; transition:color .3s; }
.nav__links a:hover{ color:var(--ink); }
.nav__links a::after{ content:""; position:absolute; left:0; bottom:-5px; width:0; height:1px; background:var(--mint); transition:width .3s var(--ease); }
.nav__links a:hover::after{ width:100%; }
.nav__cta{
  font-family:var(--f-mono); font-size:.76rem; letter-spacing:.05em;
  border:1px solid var(--line-2); border-radius:4px; padding:.45rem .8rem; color:var(--ink-soft);
  transition:border-color .3s, color .3s, background .3s;
}
.nav__cta:hover{ border-color:var(--mint); color:var(--mint); background:color-mix(in srgb,var(--mint) 8%,transparent); }
@media (max-width:760px){ .nav__links{ display:none; } }

/* ---------- hero ---------- */
.hero{ position:relative; min-height:100svh; display:flex; align-items:center; overflow:hidden; padding:7rem clamp(1.25rem,5vw,3rem) 4rem; }
.hero__grid{
  position:absolute; inset:0; z-index:0;
  background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);
  background-size:64px 64px; opacity:.4;
  mask-image:radial-gradient(120% 90% at 60% 30%, #000 30%, transparent 75%);
  -webkit-mask-image:radial-gradient(120% 90% at 60% 30%, #000 30%, transparent 75%);
}
.hero__inner{ position:relative; z-index:1; max-width:var(--maxw); margin:0 auto; width:100%; }
.eyebrow{
  display:inline-flex; align-items:center; gap:.6rem;
  font-family:var(--f-mono); font-size:.76rem; letter-spacing:.18em; text-transform:uppercase;
  color:var(--ink-soft); margin-bottom:1.8rem;
}
.eyebrow__dot{ width:7px; height:7px; border-radius:50%; background:var(--mint); box-shadow:0 0 0 0 var(--mint); animation:pulse 2.4s var(--ease) infinite; }
@keyframes pulse{ 0%{ box-shadow:0 0 0 0 color-mix(in srgb,var(--mint) 60%,transparent);} 70%{ box-shadow:0 0 0 9px transparent;} 100%{ box-shadow:0 0 0 0 transparent;} }

.hero__title{
  font-family:var(--f-display); font-weight:330; font-size:clamp(2.7rem,8.5vw,6.6rem);
  line-height:.98; letter-spacing:-.025em; margin-bottom:1.8rem;
}
.hero__title span{ display:block; }
.hero__lede{ max-width:60ch; color:var(--ink-soft); font-size:clamp(1.02rem,1.7vw,1.22rem); margin-bottom:2.8rem; }

.hero__readout{ display:flex; flex-wrap:wrap; align-items:center; gap:clamp(1.5rem,5vw,4rem); margin-bottom:2.4rem; }

/* radial maturity dial */
.dial{ position:relative; width:172px; height:172px; flex:none; }
.dial__svg{ width:100%; height:100%; transform:rotate(-90deg); }
.dial__track{ fill:none; stroke:var(--line); stroke-width:6; }
.dial__value{ fill:none; stroke:var(--mint); stroke-width:6; stroke-linecap:round;
  stroke-dasharray:578; stroke-dashoffset:578; filter:drop-shadow(0 0 6px color-mix(in srgb,var(--mint) 55%,transparent)); transition:stroke-dashoffset 1.8s var(--ease-out); }
.dial__center{ position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; }
.dial__num{ font-family:var(--f-display); font-size:2.6rem; font-weight:400; line-height:1; }
.dial__scale{ font-family:var(--f-mono); font-size:.72rem; color:var(--muted); margin-top:.15rem; }
.dial__tier{ font-family:var(--f-mono); font-size:.62rem; letter-spacing:.14em; text-transform:uppercase; color:var(--mint-dim); margin-top:.5rem; }

.hero__stats{ list-style:none; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:1.4rem 2.4rem; }
.hero__stats li{ display:flex; flex-direction:column; }
.stat__n{ font-family:var(--f-display); font-size:clamp(1.6rem,3vw,2.2rem); font-weight:400; line-height:1; color:var(--ink); }
.stat__l{ font-family:var(--f-mono); font-size:.7rem; letter-spacing:.08em; color:var(--muted); text-transform:uppercase; margin-top:.4rem; }
.hero__by{ font-family:var(--f-mono); font-size:.82rem; letter-spacing:.04em; color:var(--ink-soft); }

.hero__scrollcue{ position:absolute; bottom:1.6rem; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:.5rem; font-family:var(--f-mono); font-size:.62rem; letter-spacing:.25em; text-transform:uppercase; color:var(--muted); }
.hero__scrollcue i{ width:1px; height:34px; background:linear-gradient(var(--mint),transparent); animation:drop 2s var(--ease) infinite; }
@keyframes drop{ 0%{ transform:scaleY(0); transform-origin:top;} 45%{ transform:scaleY(1); transform-origin:top;} 55%{ transform:scaleY(1); transform-origin:bottom;} 100%{ transform:scaleY(0); transform-origin:bottom;} }

/* ---------- posture / radar ---------- */
.posture{ display:grid; grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr); gap:clamp(2rem,5vw,4rem); align-items:center; }
.radar{ position:relative; }
.radar svg{ width:100%; height:auto; overflow:visible; }
.radar__poly{ fill:color-mix(in srgb,var(--mint) 16%,transparent); stroke:var(--mint); stroke-width:1.6;
  filter:drop-shadow(0 0 10px color-mix(in srgb,var(--mint) 30%,transparent)); }
.radar__dot{ fill:var(--bg); stroke:var(--mint); stroke-width:2; }
.radar__dot.is-priority{ stroke:var(--critical); }
.radar__axis{ stroke:var(--line-2); stroke-width:1; }
.radar__ring{ fill:none; stroke:var(--line); stroke-width:1; }
.radar__label{ font-family:var(--f-mono); font-size:13px; fill:var(--ink-soft); }
.radar__label tspan{ font-size:10px; fill:var(--muted); }

.fnlist{ list-style:none; display:flex; flex-direction:column; gap:.2rem; }
.fnrow{ display:grid; grid-template-columns:2.4rem 1fr auto; align-items:center; gap:1rem; padding:.85rem .4rem; border-bottom:1px solid var(--line); cursor:default; transition:background .3s; }
.fnrow:hover{ background:var(--surface); }
.fnrow__key{ font-family:var(--f-mono); font-size:.78rem; color:var(--mint-dim); }
.fnrow__body{ display:flex; flex-direction:column; gap:.35rem; min-width:0; }
.fnrow__name{ display:flex; align-items:center; gap:.5rem; font-size:1.02rem; font-weight:400; }
.fnrow__name b{ font-weight:500; }
.fnrow__bar{ height:4px; border-radius:2px; background:var(--line); overflow:hidden; }
.fnrow__bar i{ display:block; height:100%; width:0; border-radius:2px; background:var(--mint); transition:width 1.2s var(--ease-out); }
.fnrow.is-priority .fnrow__bar i{ background:var(--critical); }
.fnrow__blurb{ font-size:.82rem; color:var(--muted); }
.fnrow__score{ font-family:var(--f-display); font-size:1.5rem; font-weight:400; text-align:right; }
.tag-prio{ font-family:var(--f-mono); font-size:.58rem; letter-spacing:.1em; text-transform:uppercase; color:var(--critical); border:1px solid color-mix(in srgb,var(--critical) 35%,transparent); border-radius:3px; padding:.05em .35em; }

.density{ display:grid; grid-template-columns:repeat(23,1fr); gap:5px; margin-top:3.5rem; }
.density i{ aspect-ratio:1; border-radius:2px; background:var(--surface); border:1px solid var(--line); transform:scale(0); transition:transform .5s var(--ease-out); }
.density__cap{ font-family:var(--f-mono); font-size:.68rem; letter-spacing:.08em; color:var(--muted); margin-top:.9rem; text-transform:uppercase; }

/* ---------- risk matrix ---------- */
.risk{ display:grid; grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr); gap:clamp(2rem,5vw,3.5rem); align-items:center; }
.matrix svg{ width:100%; height:auto; overflow:visible; }
.cell{ fill:var(--surface); stroke:var(--bg); stroke-width:2; transition:fill .3s; }
.riskdot{ cursor:pointer; transition:transform .25s var(--ease); transform-box:fill-box; transform-origin:center; }
.riskdot circle{ stroke:var(--bg); stroke-width:2; transition:r .25s var(--ease); }
.riskdot text{ font-family:var(--f-mono); font-size:11px; font-weight:500; fill:#06120d; pointer-events:none; }
.riskdot:hover, .riskdot.is-active{ transform:scale(1.18); }
.mx-axis{ font-family:var(--f-mono); font-size:11px; fill:var(--muted); letter-spacing:.1em; text-transform:uppercase; }
.mx-num{ font-family:var(--f-mono); font-size:11px; fill:var(--faint); }

.riskcard{ border:1px solid var(--line); border-radius:8px; padding:1.6rem; background:linear-gradient(160deg,var(--surface),var(--bg-2)); }
.riskcard__id{ font-family:var(--f-mono); font-size:.8rem; color:var(--muted); letter-spacing:.1em; }
.riskcard__level{ display:inline-block; font-family:var(--f-mono); font-size:.72rem; letter-spacing:.08em; text-transform:uppercase; margin-left:.6rem; padding:.1em .5em; border-radius:3px; }
.riskcard__level[data-level="Critical"]{ color:var(--critical); background:color-mix(in srgb,var(--critical) 12%,transparent); }
.riskcard__level[data-level="High"]{ color:var(--high); background:color-mix(in srgb,var(--high) 12%,transparent); }
.riskcard__level[data-level="Moderate"]{ color:var(--mint); background:color-mix(in srgb,var(--mint) 12%,transparent); }
.riskcard__desc{ font-family:var(--f-display); font-size:1.25rem; line-height:1.32; margin:1rem 0 1.4rem; min-height:3.4em; }
.riskcard__meta{ display:grid; grid-template-columns:1fr 1fr; gap:1rem 1.4rem; border-top:1px solid var(--line); padding-top:1.2rem; }
.riskcard__meta dt{ font-family:var(--f-mono); font-size:.64rem; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); }
.riskcard__meta dd{ font-family:var(--f-mono); font-size:.95rem; color:var(--ink); margin-top:.2rem; }
.riskcard__hint{ font-family:var(--f-mono); font-size:.68rem; color:var(--faint); margin-top:1.3rem; }

/* ---------- control tests ---------- */
.tests{ display:grid; gap:.5rem; }
.trow{ display:grid; grid-template-columns:5rem 1fr auto auto; align-items:center; gap:clamp(.8rem,2vw,2rem);
  padding:1.2rem clamp(.8rem,2vw,1.5rem); border:1px solid var(--line); border-radius:6px; background:var(--surface);
  transition:border-color .3s, transform .3s; }
.trow:hover{ border-color:var(--line-2); transform:translateX(4px); }
.trow__id{ font-family:var(--f-mono); font-size:.8rem; color:var(--mint-dim); }
.trow__obj{ display:flex; flex-direction:column; gap:.2rem; min-width:0; }
.trow__obj b{ font-weight:400; font-size:1rem; }
.trow__obj span{ font-family:var(--f-mono); font-size:.7rem; color:var(--muted); letter-spacing:.05em; }
.trow__eff{ display:flex; flex-direction:column; align-items:center; gap:.3rem; min-width:84px; }
.trow__eff span{ font-family:var(--f-mono); font-size:.58rem; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); }
.pill{ font-family:var(--f-mono); font-size:.74rem; padding:.18em .7em; border-radius:99px; border:1px solid; }
.pill[data-r="Pass"]{ color:var(--mint); border-color:color-mix(in srgb,var(--mint) 40%,transparent); background:color-mix(in srgb,var(--mint) 8%,transparent); }
.pill[data-r="Partial"]{ color:var(--high); border-color:color-mix(in srgb,var(--high) 40%,transparent); background:color-mix(in srgb,var(--high) 8%,transparent); }
.pill[data-r="Fail"]{ color:var(--critical); border-color:color-mix(in srgb,var(--critical) 40%,transparent); background:color-mix(in srgb,var(--critical) 8%,transparent); }
@media (max-width:680px){ .trow{ grid-template-columns:1fr 1fr; row-gap:1rem; } .trow__obj{ grid-column:1/-1; } }

/* ---------- gantt / POA&M ---------- */
.gantt{ display:flex; flex-direction:column; gap:.45rem; }
.grow{ display:grid; grid-template-columns:clamp(7rem,16vw,11rem) 1fr; align-items:center; gap:1rem; }
.grow__meta{ display:flex; flex-direction:column; gap:.15rem; }
.grow__id{ font-family:var(--f-mono); font-size:.74rem; color:var(--ink-soft); }
.grow__owner{ font-family:var(--f-mono); font-size:.62rem; color:var(--muted); letter-spacing:.05em; }
.grow__track{ position:relative; height:34px; border-radius:5px; background:var(--surface); border:1px solid var(--line); overflow:hidden; }
.gbar{ position:absolute; top:5px; bottom:5px; border-radius:3px; opacity:0; transform:scaleX(.2); transform-origin:left; transition:opacity .5s var(--ease), transform .8s var(--ease-out);
  display:flex; align-items:center; padding:0 .6rem; }
.gbar[data-sev="Critical"]{ background:color-mix(in srgb,var(--critical) 26%,var(--surface)); border:1px solid color-mix(in srgb,var(--critical) 55%,transparent); }
.gbar[data-sev="High"]{ background:color-mix(in srgb,var(--high) 22%,var(--surface)); border:1px solid color-mix(in srgb,var(--high) 50%,transparent); }
.gbar[data-sev="Moderate"]{ background:color-mix(in srgb,var(--mint) 20%,var(--surface)); border:1px solid color-mix(in srgb,var(--mint) 45%,transparent); }
.gbar.is-in{ opacity:1; transform:scaleX(1); }
.gbar__txt{ font-family:var(--f-mono); font-size:.66rem; color:var(--ink); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.gbar__status{ position:absolute; right:.5rem; font-family:var(--f-mono); font-size:.56rem; letter-spacing:.08em; text-transform:uppercase; color:var(--mint); }
.gantt__axis{ display:flex; justify-content:space-between; margin-top:1rem; padding-left:clamp(8rem,17vw,12rem); font-family:var(--f-mono); font-size:.66rem; color:var(--muted); letter-spacing:.08em; }
@media (max-width:680px){ .grow{ grid-template-columns:1fr; } .grow__meta{ flex-direction:row; gap:.6rem; align-items:baseline; } .gantt__axis{ padding-left:0; } }

/* ---------- crosswalk ---------- */
.xwalk__tabs{ display:flex; flex-wrap:wrap; gap:.5rem; margin-bottom:1.5rem; }
.xtab{ font-family:var(--f-mono); font-size:.78rem; letter-spacing:.04em; color:var(--ink-soft);
  border:1px solid var(--line); background:var(--surface); border-radius:5px; padding:.5rem .9rem; cursor:pointer; transition:all .25s; }
.xtab:hover{ border-color:var(--line-2); color:var(--ink); }
.xtab.is-active{ border-color:var(--mint); color:var(--mint); background:color-mix(in srgb,var(--mint) 10%,transparent); }
.xwalk__table{ border:1px solid var(--line); border-radius:8px; overflow:hidden; }
.xhead, .xr{ display:grid; grid-template-columns:1.5fr 1.2fr 1fr 1fr .9fr 1.2fr; }
.xhead{ background:var(--surface-2); }
.xhead span{ font-family:var(--f-mono); font-size:.6rem; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); padding:.85rem 1rem; }
.xr{ border-top:1px solid var(--line); transition:background .25s; opacity:0; transform:translateY(8px); animation:xin .5s var(--ease-out) forwards; }
.xr:hover{ background:var(--surface); }
.xr > div{ padding:.85rem 1rem; font-size:.86rem; border-left:1px solid var(--line); }
.xr > div:first-child{ border-left:none; }
.xr .xsub{ font-family:var(--f-mono); font-size:.82rem; color:var(--mint); }
.xr .xobj{ color:var(--ink); }
.xr .xctrl{ font-family:var(--f-mono); font-size:.8rem; color:var(--ink-soft); }
@keyframes xin{ to{ opacity:1; transform:translateY(0); } }
@media (max-width:860px){
  .xhead{ display:none; }
  .xr{ grid-template-columns:1fr 1fr; gap:0; }
  .xr > div{ border-left:none; border-top:1px solid var(--line); }
  .xr > div:first-child, .xr > div:nth-child(2){ grid-column:1/-1; }
  .xr > div::before{ content:attr(data-l); display:block; font-family:var(--f-mono); font-size:.55rem; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); margin-bottom:.2rem; }
  .xr > div:first-child::before, .xr > div:nth-child(2)::before{ content:none; }
}

.counts{ list-style:none; display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:1px; margin-top:2.5rem; background:var(--line); border:1px solid var(--line); border-radius:8px; overflow:hidden; }
.counts li{ background:var(--bg-2); padding:1.4rem 1.2rem; }
.counts .cn{ font-family:var(--f-display); font-size:2rem; font-weight:400; color:var(--mint); display:block; line-height:1; }
.counts .cf{ font-size:.86rem; color:var(--ink); margin-top:.5rem; display:block; }
.counts .cnote{ font-family:var(--f-mono); font-size:.62rem; color:var(--muted); margin-top:.3rem; display:block; letter-spacing:.03em; }

/* ---------- TPRM / third-party risk ---------- */
.tprm{ display:flex; flex-direction:column; gap:clamp(2.5rem,5vw,3.5rem); }
.tiers{ list-style:none; display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:8px; overflow:hidden; }
.tier{ background:var(--bg-2); padding:1.4rem 1.2rem; position:relative; transition:background .3s; }
.tier:hover{ background:var(--surface); }
.tier::before{ content:""; position:absolute; left:0; top:0; bottom:0; width:3px; }
.tier[data-tone="critical"]::before{ background:var(--critical); }
.tier[data-tone="high"]::before{ background:var(--high); }
.tier[data-tone="mod"]::before{ background:var(--mint); }
.tier[data-tone="low"]::before{ background:var(--faint); }
.tier__t{ font-family:var(--f-mono); font-size:.78rem; color:var(--muted); letter-spacing:.08em; }
.tier__label{ font-family:var(--f-display); font-size:1.35rem; font-weight:400; margin:.2rem 0 .6rem; }
.tier[data-tone="critical"] .tier__label{ color:var(--critical); }
.tier[data-tone="high"] .tier__label{ color:var(--high); }
.tier[data-tone="mod"] .tier__label{ color:var(--mint); }
.tier__def{ font-size:.82rem; color:var(--ink-soft); line-height:1.45; }

.tprm__h{ font-family:var(--f-mono); font-size:.66rem; letter-spacing:.16em; text-transform:uppercase; color:var(--mint-dim); display:block; margin-bottom:1.2rem; }
.flow{ list-style:none; display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:8px; overflow:hidden; counter-reset:f; }
.flowstep{ background:var(--bg-2); padding:1.2rem 1.1rem; display:flex; flex-direction:column; gap:.4rem; }
.flowstep__n{ font-family:var(--f-mono); font-size:.72rem; color:var(--mint); }
.flowstep__s{ font-size:.92rem; color:var(--ink); }
.flowstep__d{ font-size:.74rem; color:var(--muted); line-height:1.4; }

.tprm__grid{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:1.5rem; align-items:start; }
.qcard{ border:1px solid var(--line); border-radius:8px; padding:1.6rem; background:var(--surface); }
.qdomains{ list-style:none; display:flex; flex-direction:column; gap:.9rem; }
.qdomains li{ display:grid; grid-template-columns:1.8rem 1fr; gap:.8rem; align-items:baseline; }
.qdomains b{ font-family:var(--f-mono); color:var(--mint-dim); font-weight:500; }
.qdomains .qt{ font-size:.96rem; color:var(--ink); }
.qdomains .qm{ font-family:var(--f-mono); font-size:.7rem; color:var(--muted); display:block; margin-top:.15rem; letter-spacing:.02em; }
.example{ border:1px solid color-mix(in srgb,var(--critical) 30%,var(--line)); border-radius:8px; padding:1.6rem; background:linear-gradient(160deg,color-mix(in srgb,var(--critical) 7%,var(--bg-2)),var(--bg-2)); }
.example__cap{ font-family:var(--f-mono); font-size:.64rem; letter-spacing:.14em; text-transform:uppercase; color:var(--critical); margin-bottom:1rem; }
.example__vendor{ font-family:var(--f-display); font-size:1.5rem; font-weight:400; }
.example__vendor span{ font-family:var(--f-sans); font-size:.7rem; color:var(--muted); font-style:italic; margin-left:.5rem; }
.example__meta{ display:flex; flex-direction:column; gap:.6rem; margin:1.1rem 0; }
.example__meta div{ display:flex; gap:.7rem; font-size:.86rem; }
.example__meta dt{ font-family:var(--f-mono); font-size:.64rem; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); min-width:4.5rem; padding-top:.15rem; }
.example__meta dd{ color:var(--ink); }
.example__path{ font-family:var(--f-mono); font-size:.72rem; color:var(--ink-soft); line-height:1.6; border-top:1px solid var(--line); padding-top:1rem; }
@media (max-width:760px){ .tiers{ grid-template-columns:1fr 1fr; } .tprm__grid{ grid-template-columns:1fr; } }
@media (max-width:440px){ .tiers{ grid-template-columns:1fr; } }

/* ---------- deliverables / artifacts ---------- */
.artifacts{ list-style:none; display:grid; grid-template-columns:repeat(auto-fill,minmax(255px,1fr)); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:8px; overflow:hidden; }
.artifact{ background:var(--bg-2); padding:1.5rem 1.4rem; display:flex; flex-direction:column; gap:.5rem; position:relative; transition:background .3s, transform .3s; opacity:0; transform:translateY(14px); }
.artifact.is-in{ opacity:1; transform:none; }
.artifact:hover{ background:var(--surface); }
.artifact__n{ font-family:var(--f-mono); font-size:.7rem; color:var(--mint-dim); letter-spacing:.1em; }
.artifact__t{ font-family:var(--f-display); font-size:1.12rem; font-weight:400; line-height:1.2; }
.artifact__d{ font-size:.82rem; color:var(--ink-soft); line-height:1.5; }
.artifact::after{ content:"✓"; position:absolute; top:1.3rem; right:1.3rem; font-family:var(--f-mono); font-size:.7rem; color:var(--mint-dim); opacity:.55; }

/* ---------- footer ---------- */
.footer{ position:relative; z-index:1; max-width:var(--maxw); margin:0 auto; padding:clamp(5rem,10vw,8rem) clamp(1.25rem,5vw,3rem) 4rem; border-top:1px solid var(--line); }
.footer__lead{ max-width:760px; margin-bottom:4rem; }
.footer__lead h2{ font-family:var(--f-display); font-weight:330; font-size:clamp(1.9rem,5vw,3.2rem); line-height:1.05; letter-spacing:-.02em; }
.footer__lead p{ color:var(--ink-soft); margin-top:1.5rem; max-width:64ch; }
.footer__cols{ display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; padding:2.5rem 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
.footer__h{ font-family:var(--f-mono); font-size:.64rem; letter-spacing:.16em; text-transform:uppercase; color:var(--mint-dim); display:block; margin-bottom:1rem; }
.footer__cols ul{ list-style:none; display:flex; flex-direction:column; gap:.55rem; }
.footer__cols li{ font-size:.9rem; color:var(--ink-soft); }
.footer__cols a:hover{ color:var(--mint); }
.footer__disclaimer{ font-size:.84rem; color:var(--muted); margin-top:2rem; max-width:70ch; }
.footer__disclaimer strong{ color:var(--high); }
.footer__sig{ font-family:var(--f-mono); font-size:.66rem; letter-spacing:.14em; color:var(--faint); margin-top:2.5rem; }
@media (max-width:680px){ .footer__cols{ grid-template-columns:1fr; gap:2rem; } }

/* ---------- reveal system ---------- */
.reveal{ opacity:0; transform:translateY(22px); transition:opacity .9s var(--ease-out), transform .9s var(--ease-out); }
.reveal.is-in{ opacity:1; transform:none; }
.reveal[data-d="1"]{ transition-delay:.05s;} .reveal[data-d="2"]{ transition-delay:.15s;}
.reveal[data-d="3"]{ transition-delay:.25s;} .reveal[data-d="4"]{ transition-delay:.4s;}
.reveal[data-d="5"]{ transition-delay:.55s;} .reveal[data-d="6"]{ transition-delay:.7s;}

@media (max-width:820px){
  .posture, .risk{ grid-template-columns:1fr; }
  .hero__readout{ gap:2rem; }
}

```

## FILE: site/app.js  (443 lines)

```javascript
/* ============================================================================
   app.js — render + choreography for the Northwind CSF 2.0 audit instrument.
   Vanilla JS. Hand-built SVG/DOM viz. No frameworks, no build step.
   ========================================================================== */
(function () {
  "use strict";
  const { ASSESSMENT, FUNCTIONS, SUBSCORES, RISKS, TESTS, POAM, CROSSWALK, FRAMEWORK_COUNTS, TPRM, DELIVERABLES } = window.GRC;
  const SVGNS = "http://www.w3.org/2000/svg";
  const $ = (s, r = document) => r.querySelector(s);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const svg = (tag, attrs = {}) => {
    const el = document.createElementNS(SVGNS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  };

  /* ---- nav stuck state ---- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-stuck", window.scrollY > 24);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- reveal + section-scoped triggers ---- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        if (e.target.dataset.fire) fire(e.target.dataset.fire);
        io.unobserve(e.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );
  document.querySelectorAll(".reveal").forEach((n) => io.observe(n));

  const fired = {};
  function watch(sel, key) {
    const node = $(sel);
    if (!node) return;
    node.dataset.fire = key;
    io.observe(node);
  }
  function fire(key) {
    if (fired[key]) return;
    fired[key] = true;
    (TRIGGERS[key] || (() => {}))();
  }

  /* ---- count-up util ---- */
  function countUp(el, to, opts = {}) {
    const dur = opts.dur || 1400;
    const dec = opts.dec || 0;
    const suffix = opts.suffix || "";
    if (reduce) { el.textContent = to.toFixed(dec) + suffix; return; }
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = (to * e).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = to.toFixed(dec) + suffix;
    };
    requestAnimationFrame(step);
  }

  /* ===================== HERO: dial + stats ===================== */
  function heroReadout() {
    const arc = $("#dialArc");
    const C = 2 * Math.PI * 92; // 578
    const frac = ASSESSMENT.overall / 4;
    arc.style.strokeDasharray = C;
    requestAnimationFrame(() => { arc.style.strokeDashoffset = C * (1 - frac); });
    countUp($("#dialNum"), ASSESSMENT.overall, { dec: 2, dur: 1700 });
    document.querySelectorAll(".stat__n").forEach((el) => {
      countUp(el, +el.dataset.count, { dur: 1300 });
    });
  }
  // hero is above the fold — fire on load
  window.addEventListener("load", () => setTimeout(heroReadout, 350));

  /* ===================== POSTURE: radar ===================== */
  function radar() {
    const root = $("#radar");
    const cx = 240, cy = 240, R = 165, MAX = 4;
    const n = FUNCTIONS.length;
    const ang = (i) => -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const pt = (i, r) => [cx + r * Math.cos(ang(i)), cy + r * Math.sin(ang(i))];

    // rings
    for (let g = 1; g <= MAX; g++) {
      const r = (g / MAX) * R;
      const poly = [];
      for (let i = 0; i < n; i++) { const [x, y] = pt(i, r); poly.push(`${x},${y}`); }
      root.appendChild(svg("polygon", { class: "radar__ring", points: poly.join(" ") }));
    }
    // axes + labels
    FUNCTIONS.forEach((f, i) => {
      const [x, y] = pt(i, R);
      root.appendChild(svg("line", { class: "radar__axis", x1: cx, y1: cy, x2: x, y2: y }));
      const [lx, ly] = pt(i, R + 30);
      const t = svg("text", {
        class: "radar__label", x: lx, y: ly,
        "text-anchor": Math.abs(lx - cx) < 4 ? "middle" : lx > cx ? "start" : "end",
        "dominant-baseline": "middle",
      });
      t.appendChild(Object.assign(document.createElementNS(SVGNS, "tspan"), { textContent: f.name }));
      const sub = svg("tspan", { x: lx, dy: "14", "text-anchor": t.getAttribute("text-anchor") });
      sub.textContent = f.score.toFixed(2);
      t.appendChild(sub);
      root.appendChild(t);
    });

    // value polygon (animated grow)
    const finalPts = FUNCTIONS.map((f, i) => pt(i, (f.score / MAX) * R));
    const centerPts = FUNCTIONS.map((_, i) => pt(i, 0));
    const poly = svg("polygon", { class: "radar__poly", points: centerPts.map((p) => p.join(",")).join(" ") });
    root.appendChild(poly);

    // dots
    const dots = FUNCTIONS.map((f, i) => {
      const d = svg("circle", { class: "radar__dot" + (f.priority ? " is-priority" : ""), cx: cx, cy: cy, r: 4.5 });
      root.appendChild(d);
      return d;
    });

    if (reduce) {
      poly.setAttribute("points", finalPts.map((p) => p.join(",")).join(" "));
      dots.forEach((d, i) => { d.setAttribute("cx", finalPts[i][0]); d.setAttribute("cy", finalPts[i][1]); });
      return;
    }
    const t0 = performance.now(), dur = 1300;
    const grow = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      const cur = finalPts.map((fp, i) => [
        centerPts[i][0] + (fp[0] - centerPts[i][0]) * e,
        centerPts[i][1] + (fp[1] - centerPts[i][1]) * e,
      ]);
      poly.setAttribute("points", cur.map((p) => p.join(",")).join(" "));
      dots.forEach((d, i) => { d.setAttribute("cx", cur[i][0]); d.setAttribute("cy", cur[i][1]); });
      if (p < 1) requestAnimationFrame(grow);
    };
    requestAnimationFrame(grow);
  }

  function fnlist() {
    const ol = $("#fnlist");
    FUNCTIONS.forEach((f) => {
      const li = document.createElement("li");
      li.className = "fnrow" + (f.priority ? " is-priority" : "");
      li.innerHTML = `
        <span class="fnrow__key">${f.key}</span>
        <span class="fnrow__body">
          <span class="fnrow__name"><b>${f.name}</b>
            ${f.priority ? '<span class="tag-prio">Priority</span>' : ""}
            <span class="muted" style="font-family:var(--f-mono);font-size:.7rem">${f.tier}</span>
          </span>
          <span class="fnrow__bar"><i data-w="${(f.score / 4) * 100}"></i></span>
          <span class="fnrow__blurb">${f.blurb}</span>
        </span>
        <span class="fnrow__score">${f.score.toFixed(2)}</span>`;
      ol.appendChild(li);
    });
  }

  function density() {
    const wrap = $("#density");
    const max = 3;
    SUBSCORES.forEach(([fn, sub, sc], idx) => {
      const i = document.createElement("i");
      const a = 0.12 + (sc / max) * 0.88;
      i.style.background = `color-mix(in srgb, var(--mint) ${Math.round(a * 100)}%, var(--surface))`;
      i.style.borderColor = sc >= 3 ? "color-mix(in srgb,var(--mint) 60%,transparent)" : "var(--line)";
      i.title = `${sub} · ${sc}/3`;
      i.style.transitionDelay = (idx * 22) + "ms";
      wrap.appendChild(i);
    });
  }

  /* ===================== RISK MATRIX ===================== */
  function matrix() {
    const root = $("#matrix");
    const pad = 56, size = 520 - pad - 16, cell = size / 5, ox = pad, oy = 8;
    const sevColor = { Critical: "var(--critical)", High: "var(--high)", Moderate: "var(--mint)" };

    // zone background cells (risk appetite gradient): score zone by l*i
    for (let li = 1; li <= 5; li++) {
      for (let im = 1; im <= 5; im++) {
        const x = ox + (li - 1) * cell;
        const y = oy + (5 - im) * cell;
        const s = li * im;
        const tone = s >= 15 ? 0.16 : s >= 10 ? 0.1 : s >= 5 ? 0.05 : 0.02;
        const hue = s >= 15 ? "var(--critical)" : s >= 10 ? "var(--high)" : "var(--mint)";
        const r = svg("rect", { class: "cell", x, y, width: cell, height: cell });
        r.setAttribute("fill", `color-mix(in srgb, ${hue} ${Math.round(tone * 100)}%, var(--surface))`);
        root.appendChild(r);
      }
    }

    // axes labels
    for (let v = 1; v <= 5; v++) {
      const xl = svg("text", { class: "mx-num", x: ox + (v - 0.5) * cell, y: oy + size + 22, "text-anchor": "middle" });
      xl.textContent = v; root.appendChild(xl);
      const yl = svg("text", { class: "mx-num", x: ox - 14, y: oy + (5 - v + 0.5) * cell + 4, "text-anchor": "end" });
      yl.textContent = v; root.appendChild(yl);
    }
    const xa = svg("text", { class: "mx-axis", x: ox + size / 2, y: oy + size + 44, "text-anchor": "middle" });
    xa.textContent = "Likelihood →"; root.appendChild(xa);
    const ya = svg("text", { class: "mx-axis", x: -(oy + size / 2), y: 18, "text-anchor": "middle", transform: "rotate(-90)" });
    ya.textContent = "Impact →"; root.appendChild(ya);

    // jitter overlapping risks within a cell
    const byCell = {};
    RISKS.forEach((r) => { const k = r.l + ":" + r.i; (byCell[k] = byCell[k] || []).push(r); });

    RISKS.forEach((r) => {
      const k = r.l + ":" + r.i;
      const group = byCell[k];
      const gi = group.indexOf(r);
      const spread = group.length > 1 ? (gi - (group.length - 1) / 2) * 26 : 0;
      const cxp = ox + (r.l - 0.5) * cell + spread;
      const cyp = oy + (5 - r.i + 0.5) * cell;
      const g = svg("g", { class: "riskdot", "data-id": r.id, tabindex: "0", role: "button",
        "aria-label": `${r.id}, ${r.level}, ${r.desc}` });
      const c = svg("circle", { cx: cxp, cy: cyp, r: 16, fill: sevColor[r.level] });
      const tx = svg("text", { x: cxp, y: cyp + 4, "text-anchor": "middle" });
      tx.textContent = r.id.split("-")[1];
      g.appendChild(c); g.appendChild(tx); root.appendChild(g);

      const activate = () => setRisk(r, g);
      g.addEventListener("mouseenter", activate);
      g.addEventListener("focus", activate);
      g.addEventListener("click", activate);
    });

    // entrance: pop dots in
    if (!reduce) {
      const ds = root.querySelectorAll(".riskdot");
      ds.forEach((d, i) => {
        d.style.opacity = 0; d.style.transformOrigin = "center";
        setTimeout(() => { d.style.transition = "opacity .4s var(--ease)"; d.style.opacity = 1; }, 120 * i + 200);
      });
    }
  }

  let activeDot = null;
  function setRisk(r, node) {
    if (activeDot) activeDot.classList.remove("is-active");
    if (node) { node.classList.add("is-active"); activeDot = node; }
    const card = $("#riskcard");
    card.querySelector(".riskcard__id").textContent = r.id;
    const lvl = card.querySelector(".riskcard__level");
    lvl.textContent = `${r.level} · ${r.score}`; lvl.dataset.level = r.level;
    card.querySelector(".riskcard__desc").textContent = r.desc + ".";
    $("#rc-l").textContent = r.l + " / 5";
    $("#rc-i").textContent = r.i + " / 5";
    $("#rc-o").textContent = r.owner;
    $("#rc-s").textContent = r.sub;
  }

  /* ===================== CONTROL TESTS ===================== */
  function tests() {
    const wrap = $("#tests");
    TESTS.forEach((t, idx) => {
      const row = document.createElement("div");
      row.className = "trow reveal";
      row.dataset.d = Math.min(6, idx + 1);
      row.innerHTML = `
        <span class="trow__id">${t.id}</span>
        <span class="trow__obj"><b>${t.obj}</b><span>${t.control} · ${t.sub}</span></span>
        <span class="trow__eff"><span>Design</span><span class="pill" data-r="${t.design}">${t.design}</span></span>
        <span class="trow__eff"><span>Operating</span><span class="pill" data-r="${t.operating}">${t.operating}</span></span>`;
      wrap.appendChild(row);
      io.observe(row);
    });
  }

  /* ===================== POA&M GANTT ===================== */
  function gantt() {
    const wrap = $("#gantt");
    const T0 = Date.parse("2026-07-01"), T1 = Date.parse("2026-10-31");
    const span = T1 - T0;
    const pct = (d) => ((Date.parse(d) - T0) / span) * 100;

    POAM.forEach((p, idx) => {
      const left = Math.max(0, pct(p.start));
      const right = Math.min(100, pct(p.due));
      const width = Math.max(3, right - left);
      const row = document.createElement("div");
      row.className = "grow";
      row.innerHTML = `
        <span class="grow__meta">
          <span class="grow__id">${p.id} · ${p.sub}</span>
          <span class="grow__owner">${p.owner}</span>
        </span>
        <span class="grow__track">
          <span class="gbar" data-sev="${p.sev}" style="left:${left}%; width:${width}%">
            <span class="gbar__txt">${p.action}</span>
            ${p.status === "In Progress" ? '<span class="gbar__status">● live</span>' : ""}
          </span>
        </span>`;
      wrap.appendChild(row);
      const bar = row.querySelector(".gbar");
      const obs = new IntersectionObserver((es) => {
        es.forEach((e) => { if (e.isIntersecting) { setTimeout(() => bar.classList.add("is-in"), idx * 90); obs.disconnect(); } });
      }, { threshold: 0.4 });
      obs.observe(row);
    });

    const axis = $("#ganttAxis");
    ["Jul", "Aug", "Sep", "Oct", "Nov"].forEach((m) => {
      const s = document.createElement("span"); s.textContent = m; axis.appendChild(s);
    });
  }

  /* ===================== CROSSWALK ===================== */
  function crosswalk() {
    const tabs = $("#xtabs"), table = $("#xtable");
    const fns = [{ key: "ALL", name: "All" }, ...FUNCTIONS.map((f) => ({ key: f.key, name: f.name }))];
    let active = "ALL";

    fns.forEach((f) => {
      const b = document.createElement("button");
      b.className = "xtab" + (f.key === "ALL" ? " is-active" : "");
      b.textContent = f.key === "ALL" ? "All Functions" : `${f.key} · ${f.name}`;
      b.dataset.key = f.key;
      b.addEventListener("click", () => {
        active = f.key;
        tabs.querySelectorAll(".xtab").forEach((t) => t.classList.toggle("is-active", t.dataset.key === active));
        render();
      });
      tabs.appendChild(b);
    });

    function render() {
      const rows = CROSSWALK.filter((r) => active === "ALL" || r.fn === active);
      table.innerHTML = `
        <div class="xhead">
          <span>CSF 2.0</span><span>Control objective</span><span>NIST 800-53</span>
          <span>ISO 27001:2022</span><span>SOC 2</span><span>HIPAA</span>
        </div>`;
      rows.forEach((r, i) => {
        const div = document.createElement("div");
        div.className = "xr";
        div.style.animationDelay = i * 35 + "ms";
        div.innerHTML = `
          <div class="xsub">${r.sub}</div>
          <div class="xobj">${r.obj}</div>
          <div class="xctrl" data-l="NIST 800-53">${r.n8}</div>
          <div class="xctrl" data-l="ISO 27001:2022">${r.iso}</div>
          <div class="xctrl" data-l="SOC 2">${r.soc}</div>
          <div class="xctrl" data-l="HIPAA">${r.hi}</div>`;
        table.appendChild(div);
      });
    }
    render();
  }

  /* ===================== TPRM ===================== */
  function tprm() {
    const tiers = $("#tiers");
    TPRM.tiers.forEach((t) => {
      const li = document.createElement("li");
      li.className = "tier"; li.dataset.tone = t.tone;
      li.innerHTML = `<span class="tier__t">${t.t} — Inherent</span>
        <span class="tier__label">${t.label}</span>
        <span class="tier__def">${t.def}</span>`;
      tiers.appendChild(li);
    });
    const flow = $("#flow");
    TPRM.lifecycle.forEach((f) => {
      const li = document.createElement("li");
      li.className = "flowstep";
      li.innerHTML = `<span class="flowstep__n">${f.n}</span><span class="flowstep__s">${f.s}</span><span class="flowstep__d">${f.d}</span>`;
      flow.appendChild(li);
    });
    const qd = $("#qdomains");
    TPRM.domains.forEach((d) => {
      const li = document.createElement("li");
      li.innerHTML = `<b>${d.k}</b><span class="qt">${d.t}<span class="qm">${d.m}</span></span>`;
      qd.appendChild(li);
    });
    const ex = $("#example"), e = TPRM.example;
    ex.insertAdjacentHTML("beforeend", `
      <p class="example__vendor">${e.vendor}<span>${e.note}</span></p>
      <dl class="example__meta">
        <div><dt>Tier</dt><dd>${e.tier}</dd></div>
        <div><dt>Data</dt><dd>${e.data}</dd></div>
      </dl>
      <p class="example__path">${e.path}</p>`);
  }

  /* ===================== DELIVERABLES ===================== */
  function deliverables() {
    const ul = $("#artifacts");
    DELIVERABLES.forEach((a, i) => {
      const li = document.createElement("li");
      li.className = "artifact";
      li.style.transition = "opacity .6s var(--ease-out), transform .6s var(--ease-out), background .3s";
      li.style.transitionDelay = (i % 3) * 80 + "ms";
      li.innerHTML = `<span class="artifact__n">${a.n}</span>
        <span class="artifact__t">${a.t}</span>
        <span class="artifact__d">${a.d}</span>`;
      ul.appendChild(li);
      io.observe(li);
    });
  }

  function counts() {
    const ul = $("#counts");
    FRAMEWORK_COUNTS.forEach((c) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="cn">${c.n}</span><span class="cf">${c.name}</span><span class="cnote">${c.note}</span>`;
      ul.appendChild(li);
    });
  }

  /* ===================== TRIGGERS (section-scoped) ===================== */
  const TRIGGERS = {
    posture() {
      radar();
      requestAnimationFrame(() => document.querySelectorAll(".fnrow__bar i").forEach((i) => { i.style.width = i.dataset.w + "%"; }));
      requestAnimationFrame(() => document.querySelectorAll(".density i").forEach((i) => { i.style.transform = "scale(1)"; }));
    },
    risk() { matrix(); },
  };

  /* ---- build static DOM immediately, defer heavy animation to triggers ---- */
  fnlist();
  density();
  tests();
  gantt();
  crosswalk();
  tprm();
  deliverables();
  counts();
  setRisk(RISKS[0], null);

  watch("#posture", "posture");
  watch("#risk", "risk");
})();

```

## FILE: site/data.js  (182 lines)

```javascript
/* ============================================================================
   data.js — Northwind Health Systems · NIST CSF 2.0 GRC Assessment
   All figures trace 1:1 to the published repo artifacts (csf_scores.csv,
   risk_register.csv, poam.csv, control_test_plan.csv, crosswalk md).
   Subject is a FICTIONAL organization — simulated portfolio engagement.
   ========================================================================== */

const ASSESSMENT = {
  org: "Northwind Health Systems",
  sector: "Healthcare SaaS · custodian of ePHI",
  framework: "NIST Cybersecurity Framework 2.0",
  overall: 1.57,
  overallTier: "Tier 2 · Risk Informed",
  targetTier: "Tier 3 · Repeatable",
  subcategories: 23,
  asOf: "Q2 2026",
  analyst: "Ozirus B. Morency",
};

/* Six CSF 2.0 Functions — maturity on the 1–4 Tier scale (from the scorer). */
const FUNCTIONS = [
  { key: "GV", name: "Govern",   score: 1.40, tier: "Tier 1 · Partial",        priority: false,
    blurb: "Risk strategy, policy, and oversight. Risk-appetite statement still missing." },
  { key: "ID", name: "Identify", score: 1.60, tier: "Tier 2 · Risk Informed",  priority: false,
    blurb: "Asset and risk visibility. No formal software inventory yet." },
  { key: "PR", name: "Protect",  score: 2.00, tier: "Tier 2 · Risk Informed",  priority: false,
    blurb: "Strongest Function — encryption in place; access control is the weak seam." },
  { key: "DE", name: "Detect",   score: 1.33, tier: "Tier 1 · Partial",        priority: true,
    blurb: "No SIEM, no log review, no endpoint detection. Breaches would go unseen." },
  { key: "RS", name: "Respond",  score: 1.33, tier: "Tier 1 · Partial",        priority: true,
    blurb: "IR plan authored but never tested; breach-notification clock at risk." },
  { key: "RC", name: "Recover",  score: 1.50, tier: "Tier 2 · Risk Informed",  priority: false,
    blurb: "Backups exist; restore has never been exercised end-to-end." },
];

/* 23 assessed subcategories (for the density strip under the radar). */
const SUBSCORES = [
  ["GV","GV.OC-01",2],["GV","GV.RM-01",1],["GV","GV.RR-02",2],["GV","GV.PO-01",1],["GV","GV.SC-01",1],
  ["ID","ID.AM-01",2],["ID","ID.AM-02",1],["ID","ID.AM-05",2],["ID","ID.RA-01",2],["ID","ID.RA-05",1],
  ["PR","PR.AA-01",2],["PR","PR.AA-05",1],["PR","PR.DS-01",3],["PR","PR.DS-02",3],["PR","PR.AT-01",1],
  ["DE","DE.CM-01",2],["DE","DE.CM-09",1],["DE","DE.AE-02",1],
  ["RS","RS.MA-01",1],["RS","RS.CO-02",2],["RS","RS.AN-03",1],
  ["RC","RC.RP-01",2],["RC","RC.CO-03",1],
];

/* Risk register — likelihood × impact (1–5), score = L×I. */
const RISKS = [
  { id:"R-001", l:4, i:5, score:20, level:"Critical", owner:"CTO",
    desc:"Shared AWS admin account without MFA enables full environment compromise", sub:"PR.AA-01" },
  { id:"R-002", l:4, i:4, score:16, level:"Critical", owner:"CTO",
    desc:"Excessive IAM permissions (no least privilege) allow lateral movement to ePHI", sub:"PR.AA-05" },
  { id:"R-003", l:4, i:4, score:16, level:"Critical", owner:"IT Lead",
    desc:"No SIEM or log review means breaches go undetected", sub:"DE.AE-02" },
  { id:"R-004", l:3, i:5, score:15, level:"High", owner:"IT Lead",
    desc:"IR plan never tested; HIPAA breach-notification clock missed", sub:"RS.MA-01" },
  { id:"R-005", l:4, i:3, score:12, level:"High", owner:"IT Lead",
    desc:"No endpoint detection (EDR) on employee laptops", sub:"DE.CM-09" },
  { id:"R-006", l:4, i:3, score:12, level:"High", owner:"HR / IT Lead",
    desc:"No annual security awareness training; phishing-susceptible workforce", sub:"PR.AT-01" },
  { id:"R-007", l:3, i:4, score:12, level:"High", owner:"Procurement",
    desc:"Vendors onboarded with no security review (supply-chain risk)", sub:"GV.SC-01" },
  { id:"R-008", l:3, i:4, score:12, level:"High", owner:"IT Lead",
    desc:"Backups exist but restore never tested; recovery may fail", sub:"RC.RP-01" },
  { id:"R-009", l:3, i:3, score:9,  level:"Moderate", owner:"IT Lead",
    desc:"No formal software inventory; unpatched / unknown assets", sub:"ID.AM-02" },
  { id:"R-010", l:3, i:2, score:6,  level:"Moderate", owner:"CEO",
    desc:"No risk appetite statement; inconsistent risk decisions", sub:"GV.RM-01" },
];

/* Control testing — design vs operating effectiveness. */
const TESTS = [
  { id:"TEST-01", control:"IA-2",  sub:"PR.AA-01", obj:"MFA on privileged accounts",  design:"Fail",    operating:"Fail" },
  { id:"TEST-02", control:"AC-6",  sub:"PR.AA-05", obj:"Least privilege / RBAC",       design:"Fail",    operating:"Fail" },
  { id:"TEST-03", control:"AU-6",  sub:"DE.AE-02", obj:"Log review & detection",       design:"Partial", operating:"Fail" },
  { id:"TEST-04", control:"IR-8",  sub:"RS.MA-01", obj:"Incident response execution",  design:"Pass",    operating:"Fail" },
  { id:"TEST-05", control:"AT-2",  sub:"PR.AT-01", obj:"Security awareness training",  design:"Fail",    operating:"Fail" },
];

/* POA&M — 10 sequenced remediation items, Jul→Oct 2026. */
const POAM = [
  { id:"POAM-001", sev:"Critical", sub:"PR.AA-01", owner:"CTO",          start:"2026-07-01", due:"2026-07-07", status:"In Progress",
    action:"Provision individual IAM users; enforce MFA; secure root with break-glass" },
  { id:"POAM-002", sev:"Critical", sub:"PR.AA-05", owner:"CTO",          start:"2026-07-15", due:"2026-07-31", status:"Open",
    action:"Define RBAC roles; scope IAM policies; quarterly access reviews" },
  { id:"POAM-003", sev:"Critical", sub:"DE.AE-02", owner:"IT Lead",      start:"2026-07-10", due:"2026-08-15", status:"Open",
    action:"Deploy SIEM; forward CloudTrail + app logs; define alerts; assign triage" },
  { id:"POAM-004", sev:"High",     sub:"RS.MA-01", owner:"IT Lead",      start:"2026-08-01", due:"2026-08-31", status:"Open",
    action:"Run tabletop exercise; assign IR roles; document lessons learned" },
  { id:"POAM-005", sev:"High",     sub:"PR.AT-01", owner:"HR / IT Lead", start:"2026-08-15", due:"2026-09-15", status:"Open",
    action:"Deploy annual training + quarterly phishing simulations" },
  { id:"POAM-006", sev:"High",     sub:"GV.SC-01", owner:"Procurement",  start:"2026-08-01", due:"2026-09-30", status:"Open",
    action:"Stand up vendor risk program; require BAAs; risk-tier vendors" },
  { id:"POAM-007", sev:"High",     sub:"RC.RP-01", owner:"IT Lead",      start:"2026-08-20", due:"2026-09-10", status:"Open",
    action:"Perform full restore test; document RTO / RPO" },
  { id:"POAM-008", sev:"High",     sub:"DE.CM-09", owner:"IT Lead",      start:"2026-08-25", due:"2026-09-20", status:"Open",
    action:"Deploy EDR to all endpoints; centralize alerts" },
  { id:"POAM-009", sev:"Moderate", sub:"ID.AM-02", owner:"IT Lead",      start:"2026-09-01", due:"2026-10-15", status:"Open",
    action:"Build software inventory / SBOM; integrate with vuln scanning" },
  { id:"POAM-010", sev:"Moderate", sub:"GV.RM-01", owner:"CEO",          start:"2026-09-15", due:"2026-10-31", status:"Open",
    action:"Draft and ratify risk appetite + risk management policy" },
];

/* Multi-framework crosswalk — one CSF subcategory → 5 frameworks at once. */
const CROSSWALK = [
  { fn:"GV", sub:"GV.RM-01", obj:"Risk management strategy",   n8:"PM-9, RA-1",  iso:"A.5.1, A.5.2", soc:"CC3.1, CC3.2", hi:"§164.308(a)(1)(ii)(A)" },
  { fn:"GV", sub:"GV.PO-01", obj:"Security policy",            n8:"PL-1, PM-1",  iso:"A.5.1",        soc:"CC1.1, CC5.3", hi:"§164.316(a)" },
  { fn:"GV", sub:"GV.SC-01", obj:"Supply-chain risk mgmt",     n8:"SR-1, SR-3",  iso:"A.5.19, A.5.21",soc:"CC9.2",       hi:"§164.308(b)" },
  { fn:"ID", sub:"ID.AM-01", obj:"Hardware inventory",         n8:"CM-8",        iso:"A.5.9",        soc:"CC6.1",        hi:"§164.310(d)(1)" },
  { fn:"ID", sub:"ID.AM-02", obj:"Software inventory",         n8:"CM-8, CM-10", iso:"A.5.9, A.8.8", soc:"CC6.1",        hi:"§164.308(a)(1)" },
  { fn:"ID", sub:"ID.RA-01", obj:"Vulnerability identification",n8:"RA-5",       iso:"A.8.8",        soc:"CC7.1",        hi:"§164.308(a)(1)(ii)(A)" },
  { fn:"ID", sub:"ID.RA-05", obj:"Risk prioritization",        n8:"RA-3, RA-7",  iso:"A.5.7, A.8.2", soc:"CC3.2",        hi:"§164.308(a)(1)(ii)(B)" },
  { fn:"PR", sub:"PR.AA-01", obj:"Identity & credential mgmt", n8:"IA-2, IA-5",  iso:"A.5.16, A.5.17",soc:"CC6.1, CC6.2",hi:"§164.312(a)(2)(i)" },
  { fn:"PR", sub:"PR.AA-05", obj:"Least privilege",            n8:"AC-6",        iso:"A.8.2, A.8.3", soc:"CC6.3",        hi:"§164.312(a)(1)" },
  { fn:"PR", sub:"PR.DS-01", obj:"Data at rest encryption",    n8:"SC-28",       iso:"A.8.24",       soc:"CC6.1",        hi:"§164.312(a)(2)(iv)" },
  { fn:"PR", sub:"PR.DS-02", obj:"Data in transit encryption", n8:"SC-8",        iso:"A.8.24",       soc:"CC6.7",        hi:"§164.312(e)(1)" },
  { fn:"PR", sub:"PR.AT-01", obj:"Security awareness training",n8:"AT-2",        iso:"A.6.3",        soc:"CC1.4",        hi:"§164.308(a)(5)" },
  { fn:"DE", sub:"DE.CM-01", obj:"Network / system monitoring",n8:"SI-4, AU-6",  iso:"A.8.16",       soc:"CC7.2",        hi:"§164.312(b)" },
  { fn:"DE", sub:"DE.CM-09", obj:"Endpoint monitoring",        n8:"SI-4, SI-3",  iso:"A.8.7",        soc:"CC7.2",        hi:"§164.308(a)(1)(ii)(D)" },
  { fn:"DE", sub:"DE.AE-02", obj:"Event analysis",             n8:"AU-6, IR-4",  iso:"A.8.15, A.8.16",soc:"CC7.3",       hi:"§164.308(a)(1)(ii)(D)" },
  { fn:"RS", sub:"RS.MA-01", obj:"Incident response execution",n8:"IR-4, IR-8",  iso:"A.5.24, A.5.26",soc:"CC7.4",       hi:"§164.308(a)(6)" },
  { fn:"RS", sub:"RS.CO-02", obj:"Incident reporting",         n8:"IR-6",        iso:"A.5.25, A.6.8",soc:"CC7.4",        hi:"§164.408" },
  { fn:"RC", sub:"RC.RP-01", obj:"Recovery plan",              n8:"CP-10, IR-4", iso:"A.5.29, A.5.30",soc:"A1.2, CC7.5", hi:"§164.308(a)(7)" },
  { fn:"RC", sub:"RC.CO-03", obj:"Recovery communication",     n8:"CP-2, IR-7",  iso:"A.5.26",       soc:"CC7.5",        hi:"§164.308(a)(7)(ii)(C)" },
];

const FRAMEWORK_COUNTS = [
  { name:"NIST CSF 2.0",          n:"19", note:"assessed subcategories · 6 Functions" },
  { name:"NIST SP 800-53 Rev 5",  n:"26", note:"controls · AC AT AU CM CP IA IR PL PM RA SC SI SR" },
  { name:"ISO/IEC 27001:2022",    n:"22", note:"Annex A controls · 2022 numbering" },
  { name:"SOC 2 TSC",             n:"16", note:"15 Common Criteria + Availability A1.2" },
  { name:"HITRUST CSF v11",       n:"23", note:"references · 11 control categories" },
  { name:"HIPAA Security Rule",   n:"16", note:"Admin · Physical · Technical safeguards" },
];

/* Third-party / vendor risk program (TPRM). */
const TPRM = {
  tiers: [
    { t:"T1", label:"Critical", tone:"critical", def:"Production access to ePHI / PII or to production systems — BAA required before data flows." },
    { t:"T2", label:"High",     tone:"high",     def:"Access to confidential business data or internal systems." },
    { t:"T3", label:"Moderate", tone:"mod",      def:"Limited or de-identified data; no production access." },
    { t:"T4", label:"Low",      tone:"low",      def:"No sensitive data; informational / marketing only." },
  ],
  lifecycle: [
    { n:"01", s:"Intake & data classification", d:"Capture sponsor, service, data accessed, subprocessors." },
    { n:"02", s:"Inherent-risk tiering",        d:"Tier on what could go wrong before controls — by data sensitivity." },
    { n:"03", s:"SIG / CAIQ questionnaire",     d:"SIG-Lite-aligned domains, exportable to CAIQ." },
    { n:"04", s:"SOC 2 report review",          d:"Read the Type II report; check scope, period, exceptions." },
    { n:"05", s:"Gap identification",           d:"Compare answers + report against required controls." },
    { n:"06", s:"Remediation",                  d:"Track conditions of approval to closure." },
    { n:"07", s:"Onboarding decision",          d:"Approve / approve-with-conditions / reject." },
  ],
  domains: [
    { k:"A", t:"Company & compliance",      m:"SOC 2 Type II · ISO 27001 · BAA · breach history" },
    { k:"B", t:"Access & data protection",  m:"MFA · encryption at rest/in transit · least privilege · tenant segregation" },
    { k:"C", t:"Operations & resilience",   m:"tested IR plan · breach-notification SLAs · backup restore · vuln scanning" },
    { k:"D", t:"Subprocessors",             m:"fourth-party inventory · security flow-down" },
  ],
  example: {
    vendor:"MedStream Analytics", note:"fictional worked example",
    tier:"T1 · Critical", data:"ePHI (member name, DOB, claim detail)",
    path:"Intake → Tier 1 → BAA → SIG/CAIQ → SOC 2 review → gaps → remediation → approve-with-conditions",
  },
};

/* Full deliverable / artifact set — the complete body of work. */
const DELIVERABLES = [
  { n:"01", t:"Assessment scope statement",        d:"Boundary, systems, data types, and exclusions for the engagement." },
  { n:"02", t:"CSF 2.0 controls checklist",        d:"All six Functions assessed across 23 subcategories." },
  { n:"03", t:"Multi-framework crosswalk",         d:"CSF → 800-53 · ISO 27001:2022 · SOC 2 · HITRUST · HIPAA, IDs verified." },
  { n:"04", t:"Control test plan",                 d:"Design vs. operating effectiveness with evidence references." },
  { n:"05", t:"Risk methodology & register",       d:"Likelihood × impact scoring; 10 risks owned and treated." },
  { n:"06", t:"Audit findings report",             d:"Findings with severity, root cause, and close-the-loop matrix." },
  { n:"07", t:"Plan of Action & Milestones",       d:"10 sequenced remediation items with owners and dates." },
  { n:"08", t:"Information security policy",        d:"Baseline policy tied to assessed control objectives." },
  { n:"09", t:"Evidence collection log",           d:"Nine evidence items mapped to the controls they satisfy." },
  { n:"10", t:"Tiered third-party-risk program",   d:"4-tier model, SIG/CAIQ questionnaire, SOC 2 review, worked example." },
  { n:"11", t:"CSF maturity scoring tool",         d:"Python — per-Function scores, KPI summary, priority sequencing." },
  { n:"12", t:"Gap analysis & roadmap",            d:"Current vs. target state with a phased path to Tier 3." },
];

window.GRC = { ASSESSMENT, FUNCTIONS, SUBSCORES, RISKS, TESTS, POAM, CROSSWALK, FRAMEWORK_COUNTS, TPRM, DELIVERABLES };

```

## FILE: site/vercel.json  (23 lines)

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" }
      ]
    },
    {
      "source": "/(.*).(css|js)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}

```
