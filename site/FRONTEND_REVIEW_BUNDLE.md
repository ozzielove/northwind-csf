# Northwind CSF 2.0 - Full Source Review Bundle

Single-file concat of the **full-stack** portfolio (frontend + serverless API + Python +
tests + data + docs) for external review. Generated for ChatGPT audit drag-and-drop.

**Integrity:** Northwind is fictional; assessment is simulated; readiness only - not audit/
compliance/attestation/client/production. Crosswalk = 4 row-level frameworks (800-53, ISO
27001:2022, SOC 2, HIPAA); no HITRUST row-level mapping is claimed. Overall maturity =
sum(23 subscores=36)/23 = 1.57 (subcategory-weighted, not the 1.53 simple mean).


## File inventory
```
CLAIM_MATRIX.md
DEMO_SCRIPT.md
DEPLOY.md
README.md
api/assessment.js
api/crosswalk.js
api/evidence.js
api/health.js
api/risks.js
api/score.js
api/vendor-tier.js
apiutil.js
app.js
data.js
data/control_tests.csv
data/crosswalk.csv
data/csf_scores.csv
data/evidence_log.csv
data/poam.csv
data/risk_register.csv
index.html
package.json
scoring.js
scripts/run_demo.sh
scripts/score_maturity.py
scripts/validate_crosswalk.py
styles.css
tests/api.test.js
tests/assessment.test.js
vercel.json
```


---

## `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Northwind Health Systems - NIST CSF 2.0 Assessment</title>
<meta name="description" content="A simulated NIST Cybersecurity Framework 2.0 GRC readiness assessment - interactive readiness instrument. Portfolio work by Ozirus B. Morency." />
<meta name="theme-color" content="#07090c" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Northwind Health Systems - NIST CSF 2.0 Assessment" />
<meta property="og:description" content="Simulated employer-facing GRC portfolio: CSF 2.0 maturity scoring, risk register, control testing, POA&amp;M, TPRM, and framework crosswalk." />
<meta property="og:site_name" content="Northwind CSF 2.0 Portfolio" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="Northwind Health Systems - NIST CSF 2.0 Assessment" />
<meta name="twitter:description" content="Simulated GRC readiness portfolio built as a static assessment instrument." />
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%2307090c'/%3E%3Cpath d='M16 6l8 10-8 10-8-10z' fill='none' stroke='%236ef2c0' stroke-width='1.6'/%3E%3C/svg%3E" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,400&family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="styles.css" />
</head>
<body>
<a class="skip-link" href="#main">Skip to assessment content</a>
<div class="grain" aria-hidden="true"></div>
<div class="scan" aria-hidden="true"></div>

<!-- ================= NAV ================= -->
<header class="nav" id="nav">
  <a class="nav__mark" href="#top">
    <span class="nav__glyph">◇</span>
    <span class="nav__id">NORTHWIND&nbsp;/&nbsp;CSF&nbsp;2.0</span>
  </a>
  <nav class="nav__links" aria-label="Primary sections">
    <a href="#posture">Posture</a>
    <a href="#risk">Risk</a>
    <a href="#controls">Controls</a>
    <a href="#crosswalk">Crosswalk</a>
    <a href="#claimmap">Proof</a>
    <a href="#demo">Demo</a>
  </nav>
  <span class="apistat" id="apistat" role="status" aria-live="polite" data-state="checking">
    <span class="apistat__dot"></span><span class="apistat__txt">checking API…</span>
  </span>
  <a class="nav__cta" href="#demo">Live demo ↓</a>
</header>

<!-- ================= HERO ================= -->
<main id="main">
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
      A full governance, risk &amp; compliance readiness assessment of <strong>Northwind Health Systems</strong>,
      a fictional healthcare-SaaS scenario involving simulated ePHI-class data - scored against
      all six Functions of the <em>NIST Cybersecurity Framework&nbsp;2.0</em> and mapped, at the
      control level, to four adjacent frameworks.
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
        <li><span class="stat__n" data-count="4">0</span><span class="stat__l">Frameworks per control</span></li>
      </ul>
    </div>

    <p class="hero__by reveal" data-d="6">
      Assessment, tooling &amp; report - <strong>Ozirus&nbsp;B.&nbsp;Morency</strong> ·
      <span class="muted">Q2 2026</span>
    </p>
  </div>
  <div class="hero__scrollcue" aria-hidden="true"><span>scroll</span><i></i></div>
</section>

<!-- ================= POSTURE / RADAR ================= -->
<section class="section" id="posture">
  <div class="section__head">
    <span class="kicker">01 - Posture</span>
    <h2 class="section__title">Six Functions, one honest verdict.</h2>
    <p class="section__sub">
      Maturity on the CSF implementation-tier scale (1 Partial → 4 Adaptive). The program sits at
      <strong>1.57 - Tier 2</strong>. <span class="flag">Detect</span> and <span class="flag">Respond</span>
      are the floor, and they sequence first in remediation.
    </p>
  </div>

  <div class="posture">
    <figure class="radar" role="img" aria-label="Radar chart of six CSF Function maturity scores">
      <svg viewBox="0 0 480 480" id="radar"></svg>
    </figure>
    <ol class="fnlist" id="fnlist"></ol>
  </div>

  <div class="density" id="density" aria-hidden="true"></div>
  <p class="density__cap">23 assessed subcategories · cell brightness = subcategory score (1-3)</p>
</section>

<!-- ================= RISK HEATMAP ================= -->
<section class="section" id="risk">
  <div class="section__head">
    <span class="kicker">02 - Risk Register</span>
    <h2 class="section__title">Where the exposure actually lives.</h2>
    <p class="section__sub">
      Ten risks plotted by <em>likelihood</em> × <em>impact</em>. The top-right quadrant contains
      the highest-loss scenarios: shared privileged access without MFA, excessive IAM permissions, and missing detection coverage.
    </p>
  </div>

  <div class="risk">
    <figure class="matrix" role="img" aria-label="Five by five risk matrix, likelihood by impact">
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
      <p class="riskcard__hint">Hover, tap, or focus a risk dot to inspect ·<span id="rc-count"> 10 risks mapped</span></p>
    </aside>
  </div>
</section>

<!-- ================= CONTROL TESTING ================= -->
<section class="section" id="controls">
  <div class="section__head">
    <span class="kicker">03 - Control Testing</span>
    <h2 class="section__title">Design vs. operating effectiveness.</h2>
    <p class="section__sub">
      A control can be perfectly <em>designed</em> on paper and still fail in <em>operation</em>.
      The incident-response plan exists (design: pass) - but was never exercised (operating: fail).
      That gap is the whole point of testing both.
    </p>
  </div>
  <div class="tests" id="tests"></div>
</section>

<!-- ================= REMEDIATION TIMELINE ================= -->
<section class="section" id="remediation">
  <div class="section__head">
    <span class="kicker">04 - Plan of Action &amp; Milestones</span>
    <h2 class="section__title">A sequenced path to Tier 3.</h2>
    <p class="section__sub">
      Ten remediation items, ordered by severity and dependency across Q3 2026 - critical
      access &amp; detection gaps close first, governance polish lands last.
    </p>
  </div>
  <div class="gantt" id="gantt"></div>
  <div class="gantt__axis" id="ganttAxis"></div>
</section>

<!-- ================= CROSSWALK ================= -->
<section class="section" id="crosswalk">
  <div class="section__head">
    <span class="kicker">05 - Multi-Framework Crosswalk</span>
    <h2 class="section__title">Map once. Trace four control frameworks.</h2>
    <p class="section__sub">
      The core efficiency argument of a unified GRC program: one assessed control can support
      multiple framework mappings at once. This interactive sample traces CSF controls to
      NIST 800-53, ISO&nbsp;27001:2022, SOC&nbsp;2, and HIPAA at the control level.
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
    <span class="kicker">06 - Third-Party Risk</span>
    <h2 class="section__title">No simulated ePHI vendor passes intake unscreened.</h2>
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
    <span class="kicker">07 - The Deliverables</span>
    <h2 class="section__title">Twelve artifacts. One defensible assessment package.</h2>
    <p class="section__sub">
      Everything visualized above is backed by a complete readiness artifact set - the same
      document types a simulated GRC assessment should produce, authored end to end.
    </p>
  </div>
  <ul class="artifacts" id="artifacts"></ul>
</section>

<!-- ================= TRANSFERABLE EXPERIENCE ================= -->
<section class="section" id="transferable">
  <div class="section__head">
    <span class="kicker">08 - Transferable Audit Experience</span>
    <h2 class="section__title">Regulated-operations discipline, retooled for GRC.</h2>
    <p class="section__sub">
      This project translates prior regulated-operations discipline into cybersecurity GRC artifacts:
      findings, root cause, corrective action, evidence, ownership, and remediation tracking. The
      background below is operations and military experience - not prior cybersecurity employment.
    </p>
  </div>
  <ul class="xfer">
    <li class="xcard">
      <span class="xcard__from">4+ years client-facing operations in federally audited environments</span>
      <span class="xcard__arrow" aria-hidden="true">→</span>
      <span class="xcard__to">Comfort working to written standards, scope, and external review - the operating context of an audit.</span>
    </li>
    <li class="xcard">
      <span class="xcard__from">OSHA / EPA audit support</span>
      <span class="xcard__arrow" aria-hidden="true">→</span>
      <span class="xcard__to">Evidence collection and audit readiness under a regulator - the same muscle as a SOC 2 / HIPAA evidence log.</span>
    </li>
    <li class="xcard">
      <span class="xcard__from">50+ Root Cause Analysis investigations</span>
      <span class="xcard__arrow" aria-hidden="true">→</span>
      <span class="xcard__to">Maps directly to the GRC loop: <em>finding → root cause → corrective action → POA&amp;M closure</em>.</span>
    </li>
    <li class="xcard">
      <span class="xcard__from">Technical &amp; expository documentation</span>
      <span class="xcard__arrow" aria-hidden="true">→</span>
      <span class="xcard__to">The assessment report, policy, and crosswalk in this portfolio are the deliverable form of that writing.</span>
    </li>
    <li class="xcard">
      <span class="xcard__from">Google Cybersecurity Professional Certificate · June 2026</span>
      <span class="xcard__arrow" aria-hidden="true">→</span>
      <span class="xcard__to">Foundational SIEM, log-review, and triage concepts - beginner-level coursework, not production SOC work.</span>
    </li>
    <li class="xcard">
      <span class="xcard__from">U.S. Army National Guard veteran</span>
      <span class="xcard__arrow" aria-hidden="true">→</span>
      <span class="xcard__to">Mission discipline, chain-of-custody habits, and documentation rigor that carry into evidence handling.</span>
    </li>
  </ul>
</section>

<!-- ================= RESUME CLAIM PROOF MAP ================= -->
<section class="section" id="claimmap">
  <div class="section__head">
    <span class="kicker">09 - Resume Claim Proof Map</span>
    <h2 class="section__title">Every claim, tied to evidence you can open.</h2>
    <p class="section__sub">
      Each card maps a résumé claim to the artifact, endpoint, or script that backs it - with the
      proof type and the honest boundary. Nothing here is asserted as real client work; coursework and
      prior operations are labeled as exactly that.
    </p>
  </div>
  <ul class="prooflegend" id="prooflegend" aria-label="Proof-type legend"></ul>
  <ul class="claimgrid" id="claimgrid"></ul>
</section>

<!-- ================= INTERVIEW DEMO MODE ================= -->
<section class="section" id="demo">
  <div class="section__head">
    <span class="kicker">10 - Interview Demo Mode</span>
    <h2 class="section__title">Poke the backend. It answers in real time.</h2>
    <p class="section__sub">
      Live serverless endpoints computing over the same repository data. Click a probe and the raw JSON
      appears below. If the API is offline (static hosting), the page falls back to the bundled data and
      says so - every figure still resolves.
    </p>
  </div>

  <div class="demo">
    <div class="demo__panel">
      <span class="demo__h">Endpoint probes</span>
      <div class="demo__probes" id="demoProbes">
        <button class="probe" type="button" data-get="/api/health">API health check</button>
        <button class="probe" type="button" data-get="/api/assessment">Assessment JSON</button>
        <button class="probe" type="button" data-get="/api/risks?level=Critical">Critical risks</button>
        <button class="probe" type="button" data-get="/api/crosswalk?sub=PR.AA-01">Crosswalk · PR.AA-01</button>
        <button class="probe" type="button" data-get="/api/evidence">Evidence log</button>
        <button class="probe" type="button" data-post="/api/score" data-body="{}">Recalculate maturity → 1.57</button>
        <button class="probe" type="button" data-explain="scoring">Explain the scoring formula</button>
      </div>
    </div>

    <form class="demo__form" id="vendorForm">
      <span class="demo__h">Vendor tiering demo <span class="muted">· POST /api/vendor-tier</span></span>
      <label class="demo__field">
        <span>Vendor name</span>
        <input type="text" id="vName" name="vendorName" value="MedStream Analytics" autocomplete="off" />
      </label>
      <fieldset class="demo__checks">
        <legend>Data &amp; access</legend>
        <label><input type="checkbox" id="vEphi" checked /> Handles ePHI</label>
        <label><input type="checkbox" id="vPii" checked /> Handles PII</label>
        <label><input type="checkbox" id="vProd" checked /> Production-like access</label>
        <label><input type="checkbox" id="vSys" /> System access</label>
        <label><input type="checkbox" id="vSub" checked /> Uses subprocessors</label>
      </fieldset>
      <button class="probe probe--solid" type="submit">Run vendor tiering</button>
    </form>

    <div class="demo__outwrap">
      <div class="demo__outhead">
        <span class="demo__label" id="demoLabel">output</span>
        <span class="demo__badge" id="demoMode"></span>
      </div>
      <pre class="demo__out" id="demoOut" tabindex="0" aria-live="polite" aria-label="API response output">Click a probe above to call the backend. Results render here as formatted JSON.</pre>
    </div>

    <div class="demo__links">
      <a href="https://github.com/ozzielove" target="_blank" rel="noopener">Open GitHub profile ↗</a>
      <a href="DEMO_SCRIPT.md" target="_blank" rel="noopener">View the 5-minute demo script ↗</a>
      <a href="https://northwind-csf.vercel.app" target="_blank" rel="noopener">Open the live site ↗</a>
    </div>
  </div>
</section>

</main>

<!-- ================= FOOTER ================= -->
<footer class="footer" id="foot">
  <div class="footer__lead">
    <h2>A readiness assessment you can read in five minutes -<br /><span class="serif-em">and defend for an hour.</span></h2>
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
        <li>SOC 2 Trust Services Criteria</li><li>HIPAA Security Rule</li>
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
    This is a readiness self-assessment for demonstration - not a SOC 2 audit, HIPAA attestation, or real client work.
  </p>
  <p class="footer__sig">◇ Designed &amp; built from raw assessment data · 2026</p>
</footer>

<noscript>
  <section class="section noscript">
    <div class="section__head">
      <span class="kicker">Static fallback</span>
      <h2 class="section__title">JavaScript is required for the interactive readiness views.</h2>
      <p class="section__sub">
        This simulated portfolio assessment includes NIST CSF 2.0 maturity scoring, a risk register,
        control testing, POA&amp;M sequencing, third-party-risk workflow, and a multi-framework crosswalk.
        Enable JavaScript to view the charts and generated artifact sections.
      </p>
    </div>
  </section>
</noscript>
<script src="data.js"></script>
<script src="scoring.js"></script>
<script src="app.js"></script>
</body>
</html>
```

---

## `styles.css`

```css
/* ============================================================================
   Northwind CSF 2.0 - "Audit Instrument"
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
  --muted:     #74837f;
  --faint:     #70807c;

  --mint:      #6ef2c0;   /* primary signal - verified / healthy */
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
@media (prefers-reduced-motion: reduce){
  html{ scroll-behavior:auto; }
  *{ animation:none !important; transition:none !important; }
  .reveal,
  .artifact,
  .gbar{
    opacity:1 !important;
    transform:none !important;
  }
}

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
a:focus-visible,
button:focus-visible,
[tabindex]:focus-visible{
  outline:2px solid var(--mint);
  outline-offset:4px;
}
.skip-link{
  position:fixed;
  top:.75rem;
  left:.75rem;
  z-index:10000;
  transform:translateY(-140%);
  background:var(--mint);
  color:#04110c;
  border-radius:4px;
  padding:.55rem .8rem;
  font-family:var(--f-mono);
  font-size:.75rem;
  font-weight:600;
}
.skip-link:focus{ transform:none; }
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
  background:rgba(7,9,12,.86);
  background:color-mix(in srgb, var(--bg) 72%, transparent);
  -webkit-backdrop-filter:blur(14px) saturate(1.2);
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
@media (max-width:760px){
  .nav{
    align-items:flex-start;
    gap:.8rem;
    flex-wrap:wrap;
  }
  .nav__links{
    order:3;
    width:100%;
    display:flex;
    gap:1rem;
    overflow-x:auto;
    padding-bottom:.15rem;
    scrollbar-width:none;
  }
  .nav__links::-webkit-scrollbar{ display:none; }
  .nav__cta{ margin-left:auto; }
}
@media (max-width:420px){
  .nav__id{ display:none; }
}

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
.riskdot:hover, .riskdot:focus-visible, .riskdot.is-active{ transform:scale(1.18); }
.riskdot:focus-visible circle{ stroke:var(--ink); stroke-width:3; }
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
.riskcard__hint{ font-family:var(--f-mono); font-size:.68rem; color:var(--muted); margin-top:1.3rem; }

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
.gbar__txt{
  font-family:var(--f-mono);
  font-size:.66rem;
  color:var(--ink);
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  padding-right:2.6rem;
}
.gbar__status{
  position:absolute;
  right:.5rem;
  max-width:2.1rem;
  overflow:hidden;
  font-family:var(--f-mono);
  font-size:.56rem;
  letter-spacing:.08em;
  text-transform:uppercase;
  color:var(--mint);
}
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
.xr .xctrl{ font-family:var(--f-mono); font-size:.8rem; color:var(--ink-soft); overflow-wrap:anywhere; }
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
.artifacts{ list-style:none; display:grid; grid-template-columns:repeat(auto-fill,minmax(min(255px,100%),1fr)); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:8px; overflow:hidden; }
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
.footer__sig{ font-family:var(--f-mono); font-size:.66rem; letter-spacing:.14em; color:var(--muted); margin-top:2.5rem; }
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

/* ---------- backend status widget (nav) ---------- */
.apistat{
  display:inline-flex; align-items:center; gap:.5rem;
  font-family:var(--f-mono); font-size:.68rem; letter-spacing:.06em;
  color:var(--muted); border:1px solid var(--line); border-radius:99px;
  padding:.3rem .7rem; white-space:nowrap;
}
.apistat__dot{ width:7px; height:7px; border-radius:50%; background:var(--faint); flex:none; }
.apistat[data-state="online"]{ color:var(--mint); border-color:color-mix(in srgb,var(--mint) 35%,transparent); }
.apistat[data-state="online"] .apistat__dot{ background:var(--mint); box-shadow:0 0 7px var(--mint); }
.apistat[data-state="static"]{ color:var(--high); border-color:color-mix(in srgb,var(--high) 35%,transparent); }
.apistat[data-state="static"] .apistat__dot{ background:var(--high); }
.apistat[data-state="checking"] .apistat__dot{ animation:pulse 1.6s var(--ease) infinite; background:var(--muted); }
@media (max-width:980px){ .apistat{ font-size:.62rem; padding:.25rem .55rem; } }

/* ---------- transferable experience ---------- */
.xfer{ list-style:none; display:grid; grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr)); gap:1px; background:var(--line); border:1px solid var(--line); border-radius:8px; overflow:hidden; }
.xcard{ background:var(--bg-2); padding:1.5rem 1.4rem; display:grid; grid-template-columns:1fr auto; grid-template-areas:"from arrow" "to to"; gap:.5rem .8rem; align-items:start; transition:background .3s; }
.xcard:hover{ background:var(--surface); }
.xcard__from{ grid-area:from; font-family:var(--f-display); font-size:1.05rem; font-weight:400; line-height:1.25; color:var(--ink); }
.xcard__arrow{ grid-area:arrow; font-family:var(--f-mono); color:var(--mint-dim); font-size:1.1rem; }
.xcard__to{ grid-area:to; font-size:.84rem; color:var(--ink-soft); line-height:1.5; border-top:1px solid var(--line); padding-top:.7rem; margin-top:.3rem; }
.xcard__to em{ color:var(--mint); font-style:normal; font-family:var(--f-mono); font-size:.8rem; }

/* ---------- proof map ---------- */
.prooflegend{ list-style:none; display:flex; flex-wrap:wrap; gap:.6rem; margin-bottom:2.5rem; }
.pt{ font-family:var(--f-mono); font-size:.62rem; letter-spacing:.06em; text-transform:uppercase;
  border:1px solid; border-radius:99px; padding:.22em .7em; display:inline-block; white-space:nowrap; }
.pt-portfolio{ color:var(--mint);     border-color:color-mix(in srgb,var(--mint) 40%,transparent);     background:color-mix(in srgb,var(--mint) 8%,transparent); }
.pt-backend{   color:var(--cyan);     border-color:color-mix(in srgb,var(--cyan) 40%,transparent);     background:color-mix(in srgb,var(--cyan) 8%,transparent); }
.pt-script{    color:#c4b5fd;         border-color:color-mix(in srgb,#c4b5fd 40%,transparent);          background:color-mix(in srgb,#c4b5fd 8%,transparent); }
.pt-docs{      color:var(--ink-soft); border-color:var(--line-2);                                       background:var(--surface); }
.pt-course{    color:var(--high);     border-color:color-mix(in srgb,var(--high) 40%,transparent);     background:color-mix(in srgb,var(--high) 8%,transparent); }
.pt-ops{       color:#f0a868;         border-color:color-mix(in srgb,#f0a868 40%,transparent);          background:color-mix(in srgb,#f0a868 8%,transparent); }
.pt-mil{       color:#9fb0c9;         border-color:color-mix(in srgb,#9fb0c9 40%,transparent);          background:color-mix(in srgb,#9fb0c9 10%,transparent); }

.claimgrid{ list-style:none; display:grid; grid-template-columns:repeat(auto-fill,minmax(min(330px,100%),1fr)); gap:1rem; }
.claim{ border:1px solid var(--line); border-radius:8px; padding:1.5rem 1.4rem; background:linear-gradient(165deg,var(--surface),var(--bg-2)); display:flex; flex-direction:column; gap:.9rem; transition:border-color .3s, transform .3s; }
.claim:hover{ border-color:var(--line-2); transform:translateY(-2px); }
.claim__claim{ font-family:var(--f-display); font-size:1.12rem; font-weight:400; line-height:1.25; color:var(--ink); }
.claim__badges{ display:flex; flex-wrap:wrap; gap:.4rem; }
.claim__meta{ display:flex; flex-direction:column; gap:.7rem; border-top:1px solid var(--line); padding-top:.9rem; }
.claim__meta div{ display:flex; flex-direction:column; gap:.2rem; }
.claim__meta dt{ font-family:var(--f-mono); font-size:.6rem; letter-spacing:.12em; text-transform:uppercase; color:var(--mint-dim); }
.claim__meta dd{ font-size:.82rem; color:var(--ink-soft); line-height:1.45; }
.claim__bound{ color:var(--muted) !important; font-style:italic; }

/* ---------- interview demo mode ---------- */
.demo{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:1.2rem; }
.demo__panel, .demo__form{ border:1px solid var(--line); border-radius:8px; padding:1.5rem 1.4rem; background:var(--surface); }
.demo__h{ font-family:var(--f-mono); font-size:.66rem; letter-spacing:.14em; text-transform:uppercase; color:var(--mint-dim); display:block; margin-bottom:1.1rem; }
.demo__probes{ display:flex; flex-wrap:wrap; gap:.55rem; }
.probe{ font-family:var(--f-mono); font-size:.74rem; letter-spacing:.02em; color:var(--ink-soft);
  border:1px solid var(--line-2); background:var(--bg-2); border-radius:5px; padding:.5rem .8rem; cursor:pointer;
  transition:border-color .25s, color .25s, background .25s, transform .15s; }
.probe:hover{ border-color:var(--mint); color:var(--mint); background:color-mix(in srgb,var(--mint) 8%,transparent); }
.probe:active{ transform:translateY(1px); }
.probe--solid{ color:#04110c; background:var(--mint); border-color:var(--mint); font-weight:600; }
.probe--solid:hover{ color:#04110c; background:color-mix(in srgb,var(--mint) 86%,white); }
.demo__field{ display:flex; flex-direction:column; gap:.35rem; margin-bottom:1rem; }
.demo__field span{ font-family:var(--f-mono); font-size:.66rem; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); }
.demo__field input[type="text"]{ font-family:var(--f-mono); font-size:.86rem; color:var(--ink); background:var(--bg-2); border:1px solid var(--line-2); border-radius:5px; padding:.55rem .7rem; }
.demo__field input:focus-visible{ outline:2px solid var(--mint); outline-offset:2px; }
.demo__checks{ border:1px solid var(--line); border-radius:6px; padding:1rem; margin-bottom:1.1rem; display:flex; flex-direction:column; gap:.6rem; }
.demo__checks legend{ font-family:var(--f-mono); font-size:.6rem; letter-spacing:.12em; text-transform:uppercase; color:var(--mint-dim); padding:0 .4rem; }
.demo__checks label{ display:flex; align-items:center; gap:.6rem; font-size:.86rem; color:var(--ink-soft); cursor:pointer; }
.demo__checks input[type="checkbox"]{ accent-color:var(--mint); width:15px; height:15px; }
.demo__outwrap{ grid-column:1/-1; border:1px solid var(--line); border-radius:8px; overflow:hidden; background:var(--bg-2); }
.demo__outhead{ display:flex; align-items:center; justify-content:space-between; gap:1rem; padding:.7rem 1rem; background:var(--surface-2); border-bottom:1px solid var(--line); }
.demo__label{ font-family:var(--f-mono); font-size:.72rem; color:var(--ink-soft); letter-spacing:.04em; }
.demo__badge{ font-family:var(--f-mono); font-size:.6rem; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); border:1px solid var(--line-2); border-radius:99px; padding:.16em .6em; }
.demo__badge[data-mode="live API"]{ color:var(--mint); border-color:color-mix(in srgb,var(--mint) 40%,transparent); }
.demo__badge[data-mode="static fallback"]{ color:var(--high); border-color:color-mix(in srgb,var(--high) 40%,transparent); }
.demo__out{ margin:0; padding:1.1rem 1.2rem; font-family:var(--f-mono); font-size:.78rem; line-height:1.55; color:var(--ink); max-height:360px; overflow:auto; white-space:pre-wrap; word-break:break-word; }
.demo__out:focus-visible{ outline:2px solid var(--mint); outline-offset:-2px; }
.demo__links{ grid-column:1/-1; display:flex; flex-wrap:wrap; gap:1.4rem; padding-top:.4rem; }
.demo__links a{ font-family:var(--f-mono); font-size:.78rem; color:var(--ink-soft); border-bottom:1px solid var(--line-2); padding-bottom:1px; transition:color .25s, border-color .25s; }
.demo__links a:hover{ color:var(--mint); border-color:var(--mint); }
@media (max-width:760px){ .demo{ grid-template-columns:1fr; } }
```

---

## `app.js`

```javascript
/* ============================================================================
   app.js - render + choreography for the Northwind CSF 2.0 audit instrument.
   Vanilla JS. Hand-built SVG/DOM viz. No frameworks, no build step.
   ========================================================================== */
(function () {
  "use strict";
  const GRC = window.GRC;
  if (!GRC) {
    document.documentElement.classList.add("data-error");
    return;
  }
  const { ASSESSMENT, FUNCTIONS, SUBSCORES, RISKS, TESTS, POAM, CROSSWALK, FRAMEWORK_COUNTS, TPRM, DELIVERABLES, EVIDENCE, CLAIMS } = GRC;
  const SCORE = window.GRCScore || null;
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
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add("is-in");
            if (e.target.dataset.fire) fire(e.target.dataset.fire);
            io.unobserve(e.target);
          });
        },
        { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
      )
    : null;

  document.querySelectorAll(".reveal").forEach((n) => {
    if (io) io.observe(n);
    else n.classList.add("is-in");
  });

  const fired = {};
  function watch(sel, key) {
    const node = $(sel);
    if (!node) return;
    node.dataset.fire = key;
    if (io) io.observe(node);
    else fire(key);
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
  // hero is above the fold - fire on load
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
      const g = svg("g", {
        class: "riskdot",
        "data-id": r.id,
        tabindex: "0",
        role: "button",
        "aria-pressed": "false",
        "aria-label": `${r.id}, ${r.level}, score ${r.score}, likelihood ${r.l} of 5, impact ${r.i} of 5. ${r.desc}`
      });
      const c = svg("circle", { cx: cxp, cy: cyp, r: 16, fill: sevColor[r.level] });
      const tx = svg("text", { x: cxp, y: cyp + 4, "text-anchor": "middle" });
      tx.textContent = r.id.split("-")[1];
      g.appendChild(c); g.appendChild(tx); root.appendChild(g);

      const activate = () => setRisk(r, g);
      g.addEventListener("mouseenter", activate);
      g.addEventListener("focus", activate);
      g.addEventListener("click", activate);
      g.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        activate();
      });
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
    if (activeDot) {
      activeDot.classList.remove("is-active");
      activeDot.setAttribute("aria-pressed", "false");
    }
    if (node) {
      node.classList.add("is-active");
      node.setAttribute("aria-pressed", "true");
      activeDot = node;
    }
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
      if (io) io.observe(row);
      else row.classList.add("is-in");
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
      if ("IntersectionObserver" in window) {
        const obs = new IntersectionObserver((es) => {
          es.forEach((e) => { if (e.isIntersecting) { setTimeout(() => bar.classList.add("is-in"), idx * 90); obs.disconnect(); } });
        }, { threshold: 0.4 });
        obs.observe(row);
      } else {
        bar.classList.add("is-in");
      }
    });

    const axis = $("#ganttAxis");
    ["Jul", "Aug", "Sep", "Oct", "Nov"].forEach((m) => {
      const s = document.createElement("span"); s.textContent = m; axis.appendChild(s);
    });
  }

  /* ===================== CROSSWALK ===================== */
  function crosswalk() {
    const tabs = $("#xtabs"), table = $("#xtable");
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", "Filter crosswalk rows by CSF Function");
    table.setAttribute("role", "tabpanel");
    table.id = "xtable";
    const fns = [{ key: "ALL", name: "All" }, ...FUNCTIONS.map((f) => ({ key: f.key, name: f.name }))];
    let active = "ALL";

    fns.forEach((f) => {
      const b = document.createElement("button");
      b.className = "xtab" + (f.key === "ALL" ? " is-active" : "");
      b.type = "button";
      b.id = `xtab-${f.key}`;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-controls", "xtable");
      b.setAttribute("aria-selected", f.key === "ALL" ? "true" : "false");
      b.tabIndex = f.key === "ALL" ? 0 : -1;
      b.textContent = f.key === "ALL" ? "All Functions" : `${f.key} · ${f.name}`;
      b.dataset.key = f.key;
      b.addEventListener("click", () => activateTab(f.key));
      b.addEventListener("keydown", onTabKeydown);
      tabs.appendChild(b);
    });

    function activateTab(key) {
      active = key;
      tabs.querySelectorAll(".xtab").forEach((t) => {
        const selected = t.dataset.key === active;
        t.classList.toggle("is-active", selected);
        t.setAttribute("aria-selected", selected ? "true" : "false");
        t.tabIndex = selected ? 0 : -1;
      });
      table.setAttribute("aria-labelledby", `xtab-${active}`);
      render();
    }

    function onTabKeydown(e) {
      const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
      if (!keys.includes(e.key)) return;
      e.preventDefault();
      const all = Array.from(tabs.querySelectorAll(".xtab"));
      const idx = all.indexOf(document.activeElement);
      const next =
        e.key === "Home" ? 0 :
        e.key === "End" ? all.length - 1 :
        e.key === "ArrowRight" ? (idx + 1) % all.length :
        (idx - 1 + all.length) % all.length;
      all[next].focus();
      activateTab(all[next].dataset.key);
    }

    table.setAttribute("aria-labelledby", "xtab-ALL");

    function render() {
      const rows = CROSSWALK.filter((r) => active === "ALL" || r.fn === active);
      table.innerHTML = `
        <div class="xhead" role="row">
          <span role="columnheader">CSF 2.0</span><span role="columnheader">Control objective</span><span role="columnheader">NIST 800-53</span>
          <span role="columnheader">ISO 27001:2022</span><span role="columnheader">SOC 2</span><span role="columnheader">HIPAA</span>
        </div>`;
      rows.forEach((r, i) => {
        const div = document.createElement("div");
        div.className = "xr";
        div.setAttribute("role", "row");
        div.style.animationDelay = i * 35 + "ms";
        div.innerHTML = `
          <div class="xsub" role="cell">${r.sub}</div>
          <div class="xobj" role="cell">${r.obj}</div>
          <div class="xctrl" role="cell" data-l="NIST 800-53">${r.n8}</div>
          <div class="xctrl" role="cell" data-l="ISO 27001:2022">${r.iso}</div>
          <div class="xctrl" role="cell" data-l="SOC 2">${r.soc}</div>
          <div class="xctrl" role="cell" data-l="HIPAA">${r.hi}</div>`;
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
      li.innerHTML = `<span class="tier__t">${t.t} - Inherent</span>
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
      if (io) io.observe(li);
      else li.classList.add("is-in");
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

  /* ===================== RESUME CLAIM PROOF MAP ===================== */
  const PROOF_TYPES = [
    { key: "Portfolio",        cls: "pt-portfolio",  label: "Portfolio-proven" },
    { key: "Backend",          cls: "pt-backend",    label: "Backend-demo-proven" },
    { key: "Script",           cls: "pt-script",     label: "Script-proven" },
    { key: "Documentation",    cls: "pt-docs",       label: "Documentation-proven" },
    { key: "Coursework",       cls: "pt-course",     label: "Coursework exposure" },
    { key: "Prior operations", cls: "pt-ops",        label: "Prior operations" },
    { key: "Military",         cls: "pt-mil",        label: "Military experience" },
  ];
  const proofClass = (t) => (PROOF_TYPES.find((p) => p.key === t) || { cls: "pt-portfolio" }).cls;

  function claimmap() {
    if (!CLAIMS) return;
    const legend = $("#prooflegend");
    if (legend) {
      PROOF_TYPES.forEach((p) => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="pt ${p.cls}">${p.label}</span>`;
        legend.appendChild(li);
      });
    }
    const grid = $("#claimgrid");
    CLAIMS.forEach((c, i) => {
      const li = document.createElement("li");
      li.className = "claim reveal";
      li.dataset.d = Math.min(6, (i % 6) + 1);
      const badges = (c.types || []).map((t) => `<span class="pt ${proofClass(t)}">${t}</span>`).join("");
      li.innerHTML = `
        <p class="claim__claim">${c.claim}</p>
        <div class="claim__badges">${badges}</div>
        <dl class="claim__meta">
          <div><dt>Evidence</dt><dd>${c.evidence}</dd></div>
          <div><dt>Demo path</dt><dd>${c.demo}</dd></div>
          <div><dt>Boundary</dt><dd class="claim__bound">${c.boundary}</dd></div>
        </dl>`;
      grid.appendChild(li);
      if (io) io.observe(li); else li.classList.add("is-in");
    });
  }

  /* ===================== INTERVIEW DEMO MODE ===================== */
  const SCORING_EXPLAINER = {
    note: "Scoring formula - subcategory-weighted maturity",
    rule: "overall = sum(all assessed subcategory scores) / count(assessed subcategories)",
    worked: "sum = 36 across 23 subcategories → 36 / 23 = 1.565 → 1.57",
    contrast: "A simple mean of the six Function averages would be 1.53. The weighting by how many subcategories each Function carries is what makes the number defensible.",
    scale: "Tiers: <1.5 Partial · 1.5-2.5 Risk Informed · 2.5-3.5 Repeatable · >=3.5 Adaptive",
  };

  function localFallback(path, method, body) {
    if (!SCORE) return { _offline: true, error: "Local scoring module unavailable" };
    const url = new URL(path, "http://x");
    const p = url.pathname; const q = Object.fromEntries(url.searchParams);
    if (p === "/api/health") return { ok: true, mode: "static-fallback", note: "API offline - computed from bundled data", timestamp: new Date().toISOString() };
    if (p === "/api/assessment") return SCORE.assessmentSummary(GRC);
    if (p === "/api/risks") return { ok: true, ...SCORE.filterRisks(RISKS, q) };
    if (p === "/api/crosswalk") return { ok: true, ...SCORE.filterCrosswalk(CROSSWALK, q) };
    if (p === "/api/evidence") return { ok: true, count: EVIDENCE.length, evidence: EVIDENCE };
    if (p === "/api/score") return { ok: true, source: "bundled sample", ...summarizeScore(SCORE.scoreFromSubscores((body && body.subscores) || SUBSCORES)) };
    if (p === "/api/vendor-tier") return { ok: true, ...SCORE.vendorTier(body || {}) };
    return { _offline: true, error: "No local fallback for " + p };
  }
  function summarizeScore(r) {
    return { overallMaturity: r.overall, overallTier: r.overallTier, assessedSubcategories: r.assessedSubcategories, perFunction: r.functions, priorityFunctions: r.priorityFunctions, method: r.method };
  }

  let apiOnline = null; // null=unknown, true/false after probe
  function renderOut(label, data, mode) {
    const out = $("#demoOut"), lbl = $("#demoLabel"), badge = $("#demoMode");
    if (lbl) lbl.textContent = label;
    if (badge) { badge.textContent = mode; badge.dataset.mode = mode; }
    out.textContent = typeof data === "string" ? data : JSON.stringify(data, null, 2);
  }
  async function callApi(path, method, body) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 4000);
    try {
      const opts = { method, signal: ctrl.signal, headers: {} };
      if (body !== undefined) { opts.headers["Content-Type"] = "application/json"; opts.body = JSON.stringify(body); }
      const res = await fetch(path, opts);
      clearTimeout(timer);
      const text = await res.text();
      let json; try { json = JSON.parse(text); } catch (_) { json = text; }
      apiOnline = true;
      return { live: true, json };
    } catch (_) {
      clearTimeout(timer);
      apiOnline = false;
      return { live: false, json: localFallback(path, method, body) };
    }
  }
  function demoMode() {
    const probes = $("#demoProbes");
    if (probes) {
      probes.addEventListener("click", async (e) => {
        const btn = e.target.closest(".probe"); if (!btn) return;
        if (btn.dataset.explain === "scoring") { renderOut("scoring formula", SCORING_EXPLAINER, "explainer"); return; }
        const getp = btn.dataset.get, postp = btn.dataset.post;
        const path = getp || postp; const method = getp ? "GET" : "POST";
        const body = postp ? JSON.parse(btn.dataset.body || "{}") : undefined;
        renderOut(`${method} ${path}`, "calling " + path + " …", "…");
        const r = await callApi(path, method, body);
        renderOut(`${method} ${path}`, r.json, r.live ? "live API" : "static fallback");
      });
    }
    const form = $("#vendorForm");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const dataTypes = [];
        if ($("#vEphi").checked) dataTypes.push("ePHI");
        if ($("#vPii").checked) dataTypes.push("PII");
        const body = {
          vendorName: $("#vName").value || "Unnamed vendor",
          dataTypes,
          productionAccess: $("#vProd").checked,
          systemAccess: $("#vSys").checked,
          subprocessors: $("#vSub").checked,
        };
        renderOut("POST /api/vendor-tier", "tiering " + body.vendorName + " …", "…");
        const r = await callApi("/api/vendor-tier", "POST", body);
        renderOut("POST /api/vendor-tier", r.json, r.live ? "live API" : "static fallback");
      });
    }
  }

  /* ===================== BACKEND STATUS WIDGET ===================== */
  async function backendStatus() {
    const el = $("#apistat"); if (!el) return;
    const dot = el.querySelector(".apistat__dot"), txt = el.querySelector(".apistat__txt");
    const set = (state, label) => { el.dataset.state = state; if (txt) txt.textContent = label; };
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 4000);
    try {
      const res = await fetch("/api/health", { signal: ctrl.signal });
      clearTimeout(timer);
      const j = await res.json();
      if (res.ok && j && j.ok) { set("online", "API online"); apiOnline = true; }
      else { set("static", "static mode"); apiOnline = false; }
    } catch (_) {
      clearTimeout(timer);
      set("static", "static mode"); apiOnline = false;
    }
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
  claimmap();
  demoMode();
  backendStatus();
  setRisk(RISKS[0], null);

  watch("#posture", "posture");
  watch("#risk", "risk");
})();
```

---

## `data.js`

```javascript
/* ============================================================================
   data.js - Northwind Health Systems · NIST CSF 2.0 GRC Assessment
   Displayed figures are derived from the published portfolio artifacts
   (csf_scores.csv, risk_register.csv, poam.csv, control_test_plan.csv, crosswalk md).
   Subject is a FICTIONAL organization - simulated portfolio engagement.
   ========================================================================== */

const ASSESSMENT = {
  org: "Northwind Health Systems",
  sector: "Healthcare SaaS · simulated ePHI scenario",
  framework: "NIST Cybersecurity Framework 2.0",
  overall: 1.57,
  overallTier: "Tier 2 · Risk Informed",
  targetTier: "Tier 3 · Repeatable",
  subcategories: 23,
  asOf: "Q2 2026",
  analyst: "Ozirus B. Morency",
};

/* Six CSF 2.0 Functions - maturity on the 1-4 Tier scale (from the scorer). */
const FUNCTIONS = [
  { key: "GV", name: "Govern",   score: 1.40, tier: "Tier 1 · Partial",        priority: false,
    blurb: "Risk strategy, policy, and oversight. Risk-appetite statement still missing." },
  { key: "ID", name: "Identify", score: 1.60, tier: "Tier 2 · Risk Informed",  priority: false,
    blurb: "Asset and risk visibility. No formal software inventory yet." },
  { key: "PR", name: "Protect",  score: 2.00, tier: "Tier 2 · Risk Informed",  priority: false,
    blurb: "Strongest Function - encryption in place; access control is the weak seam." },
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

/* Risk register - likelihood × impact (1-5), score = L×I. */
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

/* Control testing - design vs operating effectiveness. */
const TESTS = [
  { id:"TEST-01", control:"IA-2",  sub:"PR.AA-01", obj:"MFA on privileged accounts",  design:"Fail",    operating:"Fail" },
  { id:"TEST-02", control:"AC-6",  sub:"PR.AA-05", obj:"Least privilege / RBAC",       design:"Fail",    operating:"Fail" },
  { id:"TEST-03", control:"AU-6",  sub:"DE.AE-02", obj:"Log review & detection",       design:"Partial", operating:"Fail" },
  { id:"TEST-04", control:"IR-8",  sub:"RS.MA-01", obj:"Incident response execution",  design:"Pass",    operating:"Fail" },
  { id:"TEST-05", control:"AT-2",  sub:"PR.AT-01", obj:"Security awareness training",  design:"Fail",    operating:"Fail" },
];

/* POA&M - 10 sequenced remediation items, Jul→Oct 2026. */
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

/* Multi-framework crosswalk - one CSF subcategory → 4 row-level framework mappings. */
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

/* Crosswalk renders FOUR frameworks at row level: 800-53, ISO, SOC 2, HIPAA. */
const FRAMEWORK_COUNTS = [
  { name:"NIST CSF 2.0",          n:"19", note:"mapped subcategories shown · 6 Functions" },
  { name:"NIST SP 800-53 Rev 5",  n:"26", note:"row-level controls · AC AT AU CM CP IA IR PL PM RA SC SI SR" },
  { name:"ISO/IEC 27001:2022",    n:"22", note:"row-level Annex A controls · 2022 numbering" },
  { name:"SOC 2 TSC",             n:"16", note:"row-level · 15 Common Criteria + Availability A1.2" },
  { name:"HIPAA Security Rule",   n:"17", note:"unique row-level references · Admin · Physical · Technical safeguards" },
];

/* Third-party / vendor risk program (TPRM). */
const TPRM = {
  tiers: [
    { t:"T1", label:"Critical", tone:"critical", def:"Simulated ePHI / PII-class data or production-like system access - BAA review required before data flows." },
    { t:"T2", label:"High",     tone:"high",     def:"Access to confidential business data or internal systems." },
    { t:"T3", label:"Moderate", tone:"mod",      def:"Limited or de-identified data; no production-like system access." },
    { t:"T4", label:"Low",      tone:"low",      def:"No sensitive data; informational / marketing only." },
  ],
  lifecycle: [
    { n:"01", s:"Intake & data classification", d:"Capture sponsor, service, data accessed, subprocessors." },
    { n:"02", s:"Inherent-risk tiering",        d:"Tier on what could go wrong before controls - by data sensitivity." },
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
    tier:"T1 · Critical", data:"simulated ePHI-class data (member name, DOB, claim detail)",
    path:"Intake → Tier 1 → BAA → SIG/CAIQ → SOC 2 review → gaps → remediation → approve-with-conditions",
  },
};

/* Full deliverable / artifact set - the complete body of work. */
const DELIVERABLES = [
  { n:"01", t:"Assessment scope statement",        d:"Boundary, systems, data types, and exclusions for the engagement." },
  { n:"02", t:"CSF 2.0 controls checklist",        d:"All six Functions assessed across 23 subcategories." },
  { n:"03", t:"Multi-framework crosswalk",         d:"CSF → 800-53 · ISO 27001:2022 · SOC 2 · HIPAA, IDs verified." },
  { n:"04", t:"Control test plan",                 d:"Design vs. operating effectiveness with evidence references." },
  { n:"05", t:"Risk methodology & register",       d:"Likelihood × impact scoring; 10 risks owned and treated." },
  { n:"06", t:"Audit findings report",             d:"Findings with severity, root cause, and close-the-loop matrix." },
  { n:"07", t:"Plan of Action & Milestones",       d:"10 sequenced remediation items with owners and dates." },
  { n:"08", t:"Information security policy",        d:"Baseline policy tied to assessed control objectives." },
  { n:"09", t:"Evidence collection log",           d:"Nine evidence items mapped to the controls they satisfy." },
  { n:"10", t:"Tiered third-party-risk program",   d:"4-tier model, SIG/CAIQ questionnaire, SOC 2 review, worked example." },
  { n:"11", t:"CSF maturity scoring tool",         d:"Python - per-Function scores, KPI summary, priority sequencing." },
  { n:"12", t:"Gap analysis & roadmap",            d:"Current vs. target state with a phased path to Tier 3." },
];

/* Evidence collection log - nine simulated/portfolio evidence items, each mapped to a
   control and CSF subcategory. All items are portfolio artifacts for a FICTIONAL org. */
const EVIDENCE = [
  { id:"E-01", artifact:"IAM configuration export",          map:"PR.AA-01 · IA-2",  type:"Configuration", status:"Simulated", note:"Shared admin account, MFA disabled - substantiates R-001." },
  { id:"E-02", artifact:"IAM policy JSON review",            map:"PR.AA-05 · AC-6",  type:"Configuration", status:"Simulated", note:"Wildcard permissions; no least-privilege roles." },
  { id:"E-03", artifact:"Logging architecture diagram",     map:"DE.AE-02 · AU-6",  type:"Diagram",       status:"Simulated", note:"No SIEM; CloudTrail not forwarded or reviewed." },
  { id:"E-04", artifact:"Incident response plan v1",        map:"RS.MA-01 · IR-8",  type:"Plan",          status:"Portfolio", note:"Authored end to end; tabletop not yet exercised." },
  { id:"E-05", artifact:"Security awareness training log",  map:"PR.AT-01 · AT-2",  type:"Records",       status:"Simulated", note:"No completion records on file." },
  { id:"E-06", artifact:"Backup & restore runbook",         map:"RC.RP-01 · CP-10", type:"Procedure",     status:"Portfolio", note:"Backups configured; restore never tested end to end." },
  { id:"E-07", artifact:"Vendor inventory & BAA tracker",   map:"GV.SC-01 · SR-3",  type:"Register",      status:"Portfolio", note:"Tiered vendor list; BAA status per vendor." },
  { id:"E-08", artifact:"Encryption-at-rest settings",      map:"PR.DS-01 · SC-28", type:"Configuration", status:"Simulated", note:"AES-256 enabled on data stores - a passing control." },
  { id:"E-09", artifact:"Software inventory gap memo",      map:"ID.AM-02 · CM-8",  type:"Memo",          status:"Portfolio", note:"No authoritative software/SBOM inventory yet." },
];

/* Resume-claim → evidence proof map. cat drives the legend grouping. */
const CLAIMS = [
  { cat:"portfolio", types:["Portfolio","Script","Backend"],
    claim:"NIST CSF 2.0 assessment across all six Functions",
    evidence:"Radar + per-Function scores · csf_scores.csv · score_maturity.py · GET /api/assessment",
    demo:"Run score_maturity.py and open /api/assessment while the Posture radar is on screen.",
    boundary:"Simulated, fictional healthcare-SaaS organization." },
  { cat:"portfolio", types:["Portfolio"],
    claim:"Multi-framework control crosswalk (NIST 800-53, ISO 27001:2022, SOC 2, HIPAA)",
    evidence:"Interactive crosswalk · 19 rows × 4 frameworks · GET /api/crosswalk",
    demo:"Filter to Protect, then call /api/crosswalk?sub=PR.AA-01 to show one control → four mappings.",
    boundary:"Four frameworks mapped at control level. No HITRUST row-level mapping is claimed." },
  { cat:"backend", types:["Portfolio","Backend"],
    claim:"Risk assessment methodology and risk register",
    evidence:"5×5 likelihood×impact matrix · risk_register.csv · GET /api/risks",
    demo:"Open /api/risks?level=Critical - returns the three critical risks with summary counts.",
    boundary:"Simulated risks for a fictional org." },
  { cat:"portfolio", types:["Portfolio"],
    claim:"Control testing - design vs. operating effectiveness",
    evidence:"Five control tests (IA-2, AC-6, AU-6, IR-8, AT-2) · control_tests.csv",
    demo:"Walk TEST-04: the IR plan is designed (pass) but was never exercised (operating: fail).",
    boundary:"Readiness testing - not a SOC 2 audit opinion." },
  { cat:"portfolio", types:["Portfolio"],
    claim:"POA&M remediation tracking",
    evidence:"10 sequenced POA&M items with owners and dates · poam.csv",
    demo:"Show the Gantt; critical access and detection gaps close first, governance polish last.",
    boundary:"Simulated remediation plan." },
  { cat:"backend", types:["Portfolio","Backend"],
    claim:"Third-party risk (TPRM) tiering, SIG/CAIQ, SOC 2 review",
    evidence:"4-tier inherent-risk model + lifecycle · POST /api/vendor-tier",
    demo:"Run the vendor-tiering form: simulated ePHI + production-like access → Tier 1 Critical, BAA review required.",
    boundary:"Simulated TPRM demonstration." },
  { cat:"script", types:["Script"],
    claim:"Python, file parsing, regex, JSON, CSV automation",
    evidence:"score_maturity.py (CSV → KPI JSON) · validate_crosswalk.py (regex ID validation)",
    demo:"Run python3 scripts/score_maturity.py - prints per-Function scores and overall 1.57.",
    boundary:"Portfolio tooling over simulated data." },
  { cat:"script", types:["Script"],
    claim:"Bash automation",
    evidence:"scripts/run_demo.sh runs the scorer and validator end to end",
    demo:"Run bash scripts/run_demo.sh from a clean clone.",
    boundary:"Light demo script - not a production pipeline." },
  { cat:"docs", types:["Documentation"],
    claim:"Technical & executive report writing, policy, SOPs",
    evidence:"README · CLAIM_MATRIX · DEMO_SCRIPT · 12-artifact deliverable set",
    demo:"Open the Deliverables section and the repo docs.",
    boundary:"Portfolio documentation." },
  { cat:"coursework", types:["Coursework"],
    claim:"Google Cybersecurity Professional Certificate (June 2026)",
    evidence:"Candidate background; SIEM/log concepts behind the Detect-function findings",
    demo:"Explain the log-review and alert-triage concepts behind the Detect gaps.",
    boundary:"Beginner-level certificate. Not production SOC experience." },
  { cat:"coursework", types:["Coursework"],
    claim:"Splunk, Chronicle, Suricata; SIEM queries, log review, alert triage",
    evidence:"Coursework exposure; Detect findings reference missing SIEM / log review",
    demo:"Discuss what a SIEM would catch for R-003 / DE.AE-02.",
    boundary:"Coursework / tool exposure - no production tool administration." },
  { cat:"operations", types:["Prior operations"],
    claim:"4+ yrs client-facing ops in federally audited environments; OSHA/EPA audit support; 50+ RCA investigations",
    evidence:"Transferable-experience section mapping RCA discipline to finding → root cause → corrective action → POA&M",
    demo:"Explain how RCA discipline maps to the audit findings and POA&M workflow.",
    boundary:"Regulated-operations experience - not cybersecurity employment." },
  { cat:"military", types:["Military"],
    claim:"U.S. Army National Guard veteran",
    evidence:"Candidate background section",
    demo:"Connect mission discipline and documentation rigor to GRC evidence handling.",
    boundary:"Military service - context for work ethic and clearance-readiness." },
];

const GRC = { ASSESSMENT, FUNCTIONS, SUBSCORES, RISKS, TESTS, POAM, CROSSWALK, FRAMEWORK_COUNTS, TPRM, DELIVERABLES, EVIDENCE, CLAIMS };

/* Dual export: browser (window.GRC) and Node/Vercel API (module.exports). */
if (typeof window !== "undefined") { window.GRC = GRC; }
if (typeof module !== "undefined" && module.exports) { module.exports = GRC; }
```

---

## `scoring.js`

```javascript
/* ============================================================================
   scoring.js - pure GRC compute. No DOM, no I/O. Dual-exported so the browser
   (window.GRCScore), the Vercel API handlers, the Node test suite, and the
   Python scorer all agree on one definition of every number.

   Maturity rule (the one that matters): overall is weighted by ASSESSED
   SUBCATEGORY COUNT, not a simple mean of the six Function means.
   For the shipped data: sum(23 subscores)=36 → 36/23 = 1.565 → 1.57.
   ========================================================================== */
(function (root, factory) {
  const api = factory();
  if (typeof window !== "undefined") { window.GRCScore = api; }
  if (typeof module !== "undefined" && module.exports) { module.exports = api; }
})(this, function () {
  "use strict";

  const FN_NAMES = { GV:"Govern", ID:"Identify", PR:"Protect", DE:"Detect", RS:"Respond", RC:"Recover" };
  const round2 = (n) => Math.round(n * 100) / 100;

  /* Tier interpretation on the 1-4 implementation-tier scale. */
  function tierFor(score) {
    if (score == null || Number.isNaN(score)) return "Unscored";
    if (score < 1.5) return "Tier 1 · Partial";
    if (score < 2.5) return "Tier 2 · Risk Informed";
    if (score < 3.5) return "Tier 3 · Repeatable";
    return "Tier 4 · Adaptive";
  }

  /* Per-Function averages + subcategory-weighted overall from [fn, sub, score] rows. */
  function scoreFromSubscores(subscores) {
    if (!Array.isArray(subscores) || !subscores.length) {
      throw new Error("scoreFromSubscores: expected a non-empty array of [fn, sub, score] rows");
    }
    const buckets = {};
    let total = 0, count = 0;
    subscores.forEach((row, idx) => {
      const fn = row[0], sub = row[1], raw = Number(row[2]);
      if (!fn || !FN_NAMES[fn]) throw new Error(`row ${idx}: unknown Function "${fn}"`);
      if (!Number.isFinite(raw) || raw < 1 || raw > 4) throw new Error(`row ${idx} (${sub}): invalid score "${row[2]}"`);
      (buckets[fn] = buckets[fn] || []).push(raw);
      total += raw; count += 1;
    });
    const order = ["GV","ID","PR","DE","RS","RC"];
    const functions = order.filter((k) => buckets[k]).map((k) => {
      const arr = buckets[k];
      const avg = round2(arr.reduce((a, b) => a + b, 0) / arr.length);
      return { key:k, name:FN_NAMES[k], score:avg, assessed:arr.length, tier:tierFor(avg), priority:false };
    });
    const overall = round2(total / count);
    const floor = functions.length ? Math.min(...functions.map((f) => f.score)) : null;
    functions.forEach((f) => { f.priority = floor != null && Math.abs(f.score - floor) < 1e-9; });
    const priority = functions.filter((f) => f.priority).map((f) => f.name);
    return {
      functions,
      overall,
      overallTier: tierFor(overall),
      assessedSubcategories: count,
      functionsScored: functions.length,
      priorityFunctions: priority,
      method: "subcategory-weighted (sum of all subcategory scores ÷ assessed count)",
      kpi: { total, count, simpleMeanOfFunctions: round2(functions.reduce((a, f) => a + f.score, 0) / functions.length) },
    };
  }

  /* Risk register filtering + summary. opts: {level, owner, sub, minScore}. */
  function filterRisks(risks, opts = {}) {
    let rows = Array.isArray(risks) ? risks.slice() : [];
    if (opts.level)  rows = rows.filter((r) => String(r.level).toLowerCase() === String(opts.level).toLowerCase());
    if (opts.owner)  rows = rows.filter((r) => String(r.owner).toLowerCase().includes(String(opts.owner).toLowerCase()));
    if (opts.sub)    rows = rows.filter((r) => String(r.sub).toLowerCase() === String(opts.sub).toLowerCase());
    if (opts.minScore != null && opts.minScore !== "") {
      const m = Number(opts.minScore);
      if (!Number.isNaN(m)) rows = rows.filter((r) => Number(r.score) >= m);
    }
    const byLevel = rows.reduce((a, r) => { a[r.level] = (a[r.level] || 0) + 1; return a; }, {});
    return { count: rows.length, byLevel, risks: rows };
  }

  /* Crosswalk filtering. opts: {fn, sub, framework}. Only 4 row-level frameworks exist. */
  const FRAMEWORK_FIELDS = { n8:"NIST 800-53", iso:"ISO 27001:2022", soc:"SOC 2", hi:"HIPAA" };
  const FRAMEWORK_ALIASES = {
    "n8":"n8", "800-53":"n8", "80053":"n8", "nist":"n8", "nist800-53":"n8", "nist80053":"n8", "sp800-53":"n8", "sp80053":"n8",
    "iso":"iso", "iso27001":"iso", "27001":"iso",
    "soc":"soc", "soc2":"soc",
    "hi":"hi", "hipaa":"hi",
  };
  function filterCrosswalk(crosswalk, opts = {}) {
    let rows = Array.isArray(crosswalk) ? crosswalk.slice() : [];
    if (opts.fn)  rows = rows.filter((r) => String(r.fn).toLowerCase() === String(opts.fn).toLowerCase());
    if (opts.sub) rows = rows.filter((r) => String(r.sub).toLowerCase() === String(opts.sub).toLowerCase());
    let framework = null, frameworkLabel = null;
    if (opts.framework) {
      const requested = String(opts.framework);
      const key = FRAMEWORK_ALIASES[requested.toLowerCase().replace(/[\s/._]/g, "")];
      if (!key) {
        return {
          count: 0,
          rowLevelFrameworks: Object.values(FRAMEWORK_FIELDS),
          framework: null,
          unsupportedFramework: requested,
          rows: [],
          note: "Unsupported row-level framework filter. Available row-level filters: nist, iso, soc2, hipaa."
        };
      }
      framework = key;
      frameworkLabel = FRAMEWORK_FIELDS[key];
    }
    const out = rows.map((r) => {
      if (!framework) return r;
      return { fn:r.fn, sub:r.sub, obj:r.obj, framework:frameworkLabel, mapping:r[framework] };
    });
    return { count: out.length, rowLevelFrameworks: Object.values(FRAMEWORK_FIELDS), framework: frameworkLabel, rows: out };
  }

  /* TPRM inherent-risk tiering from a mock vendor intake. */
  function vendorTier(intake = {}) {
    const dataTypes = (intake.dataTypes || []).map((d) => String(d).toLowerCase());
    const touchesEphi = dataTypes.includes("ephi") || dataTypes.includes("phi");
    const touchesPii  = dataTypes.includes("pii");
    const prod = !!intake.productionAccess;
    const sys  = !!intake.systemAccess;
    const subprocessors = !!intake.subprocessors;
    const why = [];

    let tier, label, tone;
    if ((touchesEphi || touchesPii) && prod) {
      tier = "T1"; label = "Critical"; tone = "critical";
      why.push("Production-like access combined with simulated ePHI/PII-class data - highest inherent loss before controls.");
    } else if (touchesEphi || prod) {
      tier = "T2"; label = "High"; tone = "high";
      why.push(touchesEphi ? "Handles simulated ePHI-class data without production-like access." : "Production-like access without regulated data.");
    } else if (touchesPii || sys) {
      tier = "T3"; label = "Moderate"; tone = "mod";
      why.push("Confidential/internal data or system access; no production-like access or simulated ePHI-class data.");
    } else {
      tier = "T4"; label = "Low"; tone = "low";
      why.push("No sensitive data and no production-like/system access - informational only.");
    }
    if (subprocessors) why.push("Subprocessors present - fourth-party flow-down review required.");

    const critical = tier === "T1";
    const high = tier === "T1" || tier === "T2";
    const dueDiligence = [];
    if (high) dueDiligence.push("SOC 2 Type II report review (scope, period, exceptions)");
    if (high) dueDiligence.push("SIG-Lite / CAIQ security questionnaire");
    if (critical) dueDiligence.push("Executed BAA before any data flows");
    if (critical) dueDiligence.push("Encryption, MFA, and least-privilege attestation");
    if (subprocessors) dueDiligence.push("Subprocessor inventory + security flow-down");
    if (!high) dueDiligence.push("Lightweight intake questionnaire; periodic re-tier");

    return {
      vendorName: intake.vendorName || "Unnamed vendor",
      inherentTier: `${tier} · ${label}`,
      tier, label, tone,
      why,
      requiredDueDiligence: dueDiligence,
      baaReviewRequired: critical,
      soc2ReviewRequired: high,
      questionnaireRequired: high,
      disclaimer: "Simulated TPRM demonstration - fictional vendor, no real third-party data.",
    };
  }

  /* High-level assessment summary from the full data object. */
  function assessmentSummary(GRC) {
    const a = GRC.ASSESSMENT || {};
    const computed = scoreFromSubscores(GRC.SUBSCORES);
    return {
      organization: a.org,
      sector: a.sector,
      framework: a.framework,
      asOf: a.asOf,
      overallMaturity: computed.overall,
      overallTier: a.overallTier || computed.overallTier,
      targetTier: a.targetTier,
      functions: computed.functionsScored,
      assessedSubcategories: computed.assessedSubcategories,
      risks: (GRC.RISKS || []).length,
      criticalRisks: (GRC.RISKS || []).filter((r) => r.level === "Critical").length,
      controlTests: (GRC.TESTS || []).length,
      poamItems: (GRC.POAM || []).length,
      deliverables: (GRC.DELIVERABLES || []).length,
      crosswalkRows: (GRC.CROSSWALK || []).length,
      rowLevelFrameworks: 4,
      analyst: a.analyst,
      mode: "simulated-portfolio",
      disclaimer: "Simulated portfolio engagement. Northwind Health Systems is fictional. Readiness assessment - not a SOC 2 audit, HIPAA attestation, or real client work.",
    };
  }

  return { tierFor, scoreFromSubscores, filterRisks, filterCrosswalk, vendorTier, assessmentSummary, FRAMEWORK_FIELDS };
});
```

---

## `apiutil.js`

```javascript
/* ============================================================================
   apiutil.js - tiny request/response helpers shared by the /api functions.
   Lives at repo root (not /api) so Vercel never treats it as a route.
   No dependencies. Works under @vercel/node, `vercel dev`, and mock req/res.
   ========================================================================== */
"use strict";

function send(res, status, body) {
  if (status === 204) {
    if (typeof res.status === "function" && typeof res.end === "function") {
      res.setHeader("Cache-Control", "no-store");
      return res.status(status).end();
    }
    res.statusCode = status;
    res.setHeader("Cache-Control", "no-store");
    return res.end();
  }
  const payload = JSON.stringify(body, null, 2);
  if (typeof res.status === "function" && typeof res.json === "function") {
    res.setHeader("Cache-Control", "no-store");
    return res.status(status).json(body);
  }
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(payload);
}

function query(req) {
  if (req && req.query && typeof req.query === "object") return req.query;
  try {
    const u = new URL(req.url, "http://localhost");
    return Object.fromEntries(u.searchParams.entries());
  } catch (_) {
    return {};
  }
}

function readBody(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === "object") return resolve(req.body);
    if (typeof req.body === "string") {
      try { return resolve(JSON.parse(req.body || "{}")); } catch (_) { return resolve({}); }
    }
    let raw = "";
    try {
      req.on("data", (c) => (raw += c));
      req.on("end", () => { try { resolve(JSON.parse(raw || "{}")); } catch (_) { resolve({}); } });
      req.on("error", () => resolve({}));
    } catch (_) {
      resolve({});
    }
  });
}

/* Wrap a handler: enforce method, catch errors → 500 JSON. */
function handler(methods, fn) {
  const allowed = (Array.isArray(methods) ? methods : [methods]).map((m) => m.toUpperCase());
  return async (req, res) => {
    const method = (req.method || "GET").toUpperCase();
    if (method === "OPTIONS") { res.setHeader("Allow", allowed.join(", ")); return send(res, 204, {}); }
    if (!allowed.includes(method)) {
      res.setHeader("Allow", allowed.join(", "));
      return send(res, 405, { ok: false, error: `Method ${method} not allowed`, allow: allowed });
    }
    try {
      await fn(req, res);
    } catch (err) {
      send(res, 500, { ok: false, error: String(err && err.message ? err.message : err) });
    }
  };
}

module.exports = { send, query, readBody, handler };
```

---

## `api/health.js`

```javascript
"use strict";
const { send, handler } = require("../apiutil.js");

module.exports = handler("GET", (req, res) => {
  send(res, 200, {
    ok: true,
    project: "Northwind CSF 2.0 GRC Assessment",
    mode: "simulated-portfolio",
    dataSource: "local repository data",
    timestamp: new Date().toISOString(),
  });
});
```

---

## `api/assessment.js`

```javascript
"use strict";
const GRC = require("../data.js");
const S = require("../scoring.js");
const { send, handler } = require("../apiutil.js");

module.exports = handler("GET", (req, res) => {
  send(res, 200, S.assessmentSummary(GRC));
});
```

---

## `api/risks.js`

```javascript
"use strict";
const GRC = require("../data.js");
const S = require("../scoring.js");
const { send, query, handler } = require("../apiutil.js");

module.exports = handler("GET", (req, res) => {
  const q = query(req);
  const result = S.filterRisks(GRC.RISKS, {
    level: q.level, owner: q.owner, sub: q.sub, minScore: q.minScore,
  });
  send(res, 200, {
    ok: true,
    filters: { level: q.level || null, owner: q.owner || null, sub: q.sub || null, minScore: q.minScore || null },
    ...result,
    disclaimer: "Simulated risks for a fictional organization.",
  });
});
```

---

## `api/crosswalk.js`

```javascript
"use strict";
const GRC = require("../data.js");
const S = require("../scoring.js");
const { send, query, handler } = require("../apiutil.js");

module.exports = handler("GET", (req, res) => {
  const q = query(req);
  const result = S.filterCrosswalk(GRC.CROSSWALK, { fn: q.fn, sub: q.sub, framework: q.framework });
  send(res, 200, {
    ok: true,
    filters: { fn: q.fn || null, sub: q.sub || null, framework: q.framework || null },
    note: "Four frameworks are mapped at row level: NIST 800-53, ISO 27001:2022, SOC 2, and HIPAA. No HITRUST row-level identifiers are exposed by this endpoint.",
    ...result,
  });
});
```

---

## `api/score.js`

```javascript
"use strict";
const GRC = require("../data.js");
const S = require("../scoring.js");
const { send, readBody, handler } = require("../apiutil.js");

/* POST body: { subscores: [[fn, sub, score], ...] }.
   With no body, scores the shipped 23-subcategory data set (overall → 1.57). */
module.exports = handler(["POST", "GET"], async (req, res) => {
  const body = req.method === "POST" ? await readBody(req) : {};
  const subscores = Array.isArray(body.subscores) && body.subscores.length ? body.subscores : GRC.SUBSCORES;
  const usedSample = subscores === GRC.SUBSCORES;
  let result;
  try {
    result = S.scoreFromSubscores(subscores);
  } catch (err) {
    return send(res, 400, {
      ok: false,
      error: String(err && err.message ? err.message : err),
      disclaimer: "Simulated portfolio scoring input rejected; valid subcategory scores are 1 through 4."
    });
  }
  send(res, 200, {
    ok: true,
    source: usedSample ? "shipped sample data (23 subcategories)" : "request body",
    perFunction: result.functions,
    overallMaturity: result.overall,
    overallTier: result.overallTier,
    assessedSubcategories: result.assessedSubcategories,
    priorityFunctions: result.priorityFunctions,
    method: result.method,
    kpi: result.kpi,
    disclaimer: "Simulated portfolio scoring. Overall is subcategory-weighted, not a simple mean of Function averages.",
  });
});
```

---

## `api/vendor-tier.js`

```javascript
"use strict";
const S = require("../scoring.js");
const { send, readBody, handler } = require("../apiutil.js");

/* POST body: { vendorName, dataTypes:[], productionAccess, systemAccess, subprocessors } */
module.exports = handler(["POST", "GET"], async (req, res) => {
  const body = req.method === "POST" ? await readBody(req) : {
    vendorName: "MedStream Analytics (sample)", dataTypes: ["ePHI", "PII"],
    productionAccess: true, systemAccess: true, subprocessors: true,
  };
  send(res, 200, { ok: true, ...S.vendorTier(body) });
});
```

---

## `api/evidence.js`

```javascript
"use strict";
const GRC = require("../data.js");
const { send, query, handler } = require("../apiutil.js");

module.exports = handler("GET", (req, res) => {
  const q = query(req);
  let items = (GRC.EVIDENCE || []).slice();
  if (q.status) items = items.filter((e) => String(e.status).toLowerCase() === String(q.status).toLowerCase());
  if (q.sub)    items = items.filter((e) => String(e.map).toLowerCase().includes(String(q.sub).toLowerCase()));
  const byStatus = items.reduce((a, e) => { a[e.status] = (a[e.status] || 0) + 1; return a; }, {});
  send(res, 200, {
    ok: true,
    count: items.length,
    byStatus,
    evidence: items.map((e) => ({
      evidenceId: e.id, artifact: e.artifact, mapping: e.map,
      type: e.type, portfolioStatus: e.status, notes: e.note,
    })),
    disclaimer: "Evidence items are simulated/portfolio artifacts for a fictional organization.",
  });
});
```

---

## `scripts/score_maturity.py`

```python
#!/usr/bin/env python3
"""
score_maturity.py - Northwind CSF 2.0 maturity scorer.

Reads the assessed CSF subcategory scores from data/csf_scores.csv, computes
per-Function maturity and the subcategory-WEIGHTED overall maturity, identifies
the priority (lowest) Functions, writes a machine-readable KPI summary to
outputs/kpi_summary.json, and prints a console summary suitable for a live demo.

Scoring rule: overall = sum(all subcategory scores) / count(subcategories).
For the shipped data this is 36 / 23 = 1.565 -> 1.57. This is intentionally NOT
the simple mean of the six Function means (which is 1.53).

Usage:
    python3 scripts/score_maturity.py
    python3 scripts/score_maturity.py --csv data/csf_scores.csv --out outputs/kpi_summary.json

Simulated portfolio engagement. Northwind Health Systems is fictional.
"""

import argparse
import csv
import json
import os
import sys

PROJECT = "Northwind CSF 2.0 GRC Assessment"
DISCLAIMER = ("Simulated portfolio engagement. Northwind Health Systems is fictional. "
              "Readiness assessment - not a SOC 2 audit, HIPAA attestation, or real client work.")

FN_NAMES = {"GV": "Govern", "ID": "Identify", "PR": "Protect",
            "DE": "Detect", "RS": "Respond", "RC": "Recover"}
FN_ORDER = ["GV", "ID", "PR", "DE", "RS", "RC"]


def tier_for(score):
    if score is None:
        return "Unscored"
    if score < 1.5:
        return "Tier 1 · Partial"
    if score < 2.5:
        return "Tier 2 · Risk Informed"
    if score < 3.5:
        return "Tier 3 · Repeatable"
    return "Tier 4 · Adaptive"


def repo_root():
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_scores(csv_path):
    """Return list of (function, subcategory, score). Raises on fatal problems."""
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"CSF score file not found: {csv_path}")

    rows = []
    with open(csv_path, newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        required = {"function", "subcategory", "score"}
        if reader.fieldnames is None or not required.issubset({c.strip() for c in reader.fieldnames}):
            raise ValueError(f"CSV must have columns {sorted(required)}; got {reader.fieldnames}")
        for ln, raw in enumerate(reader, start=2):
            fn = (raw.get("function") or "").strip()
            sub = (raw.get("subcategory") or "").strip()
            val = (raw.get("score") or "").strip()
            if not fn and not sub and not val:
                continue  # skip blank line
            if fn not in FN_NAMES:
                print(f"  ! line {ln}: unknown Function '{fn}' - skipped", file=sys.stderr)
                continue
            try:
                score = float(val)
            except ValueError:
                print(f"  ! line {ln} ({sub}): non-numeric score '{val}' - skipped", file=sys.stderr)
                continue
            if not (1 <= score <= 4):
                print(f"  ! line {ln} ({sub}): score {score} out of range 1-4 - skipped", file=sys.stderr)
                continue
            rows.append((fn, sub, score))

    if not rows:
        raise ValueError("No valid score rows parsed.")
    return rows


def compute(rows):
    buckets = {}
    total = 0.0
    for fn, sub, score in rows:
        buckets.setdefault(fn, []).append(score)
        total += score
    count = len(rows)

    functions = []
    for fn in FN_ORDER:
        if fn not in buckets:
            continue
        arr = buckets[fn]
        avg = round(sum(arr) / len(arr), 2)
        functions.append({
            "key": fn, "name": FN_NAMES[fn], "score": avg,
            "assessed": len(arr), "tier": tier_for(avg), "priority": False,
        })

    overall = round(total / count, 2)
    floor = min(f["score"] for f in functions)
    for f in functions:
        f["priority"] = abs(f["score"] - floor) < 1e-9
    priority = [f["name"] for f in functions if f["priority"]]
    simple_mean = round(sum(f["score"] for f in functions) / len(functions), 2)

    return {
        "project": PROJECT,
        "mode": "simulated-portfolio",
        "disclaimer": DISCLAIMER,
        "functions": functions,
        "overallMaturity": overall,
        "overallTier": tier_for(overall),
        "assessedSubcategories": count,
        "functionsScored": len(functions),
        "priorityFunctions": priority,
        "method": "subcategory-weighted (sum of subcategory scores ÷ assessed count)",
        "kpi": {"totalPoints": round(total, 2), "subcategoryCount": count,
                "simpleMeanOfFunctions": simple_mean},
    }


def bar(score, width=20):
    filled = int(round((score / 4) * width))
    return "█" * filled + "·" * (width - filled)


def print_summary(result):
    line = "─" * 60
    print(line)
    print(f"  {result['project']}")
    print(f"  {result['disclaimer']}")
    print(line)
    print(f"  Per-Function maturity (1 Partial → 4 Adaptive):\n")
    for f in result["functions"]:
        flag = "  ◀ PRIORITY" if f["priority"] else ""
        print(f"    {f['key']}  {f['name']:<9} {f['score']:.2f}  [{bar(f['score'])}]  "
              f"{f['tier']}{flag}")
    print()
    print(f"  Overall maturity .......... {result['overallMaturity']:.2f} / 4.00  "
          f"({result['overallTier']})")
    print(f"  Method .................... {result['method']}")
    print(f"  Assessed subcategories .... {result['assessedSubcategories']}")
    print(f"  Functions scored .......... {result['functionsScored']}")
    print(f"  Priority remediation ...... {', '.join(result['priorityFunctions'])}")
    print(f"  (Simple mean of Functions . {result['kpi']['simpleMeanOfFunctions']:.2f} - "
          f"shown only to contrast; not the reported number)")
    print(line)


def main(argv=None):
    root = repo_root()
    parser = argparse.ArgumentParser(description="Northwind CSF 2.0 maturity scorer")
    parser.add_argument("--csv", default=os.path.join(root, "data", "csf_scores.csv"))
    parser.add_argument("--out", default=os.path.join(root, "outputs", "kpi_summary.json"))
    args = parser.parse_args(argv)

    try:
        rows = load_scores(args.csv)
        result = compute(rows)
    except (FileNotFoundError, ValueError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as fh:
        json.dump(result, fh, indent=2, ensure_ascii=False)

    print_summary(result)
    print(f"  KPI summary written → {os.path.relpath(args.out, root)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

---

## `scripts/validate_crosswalk.py`

```python
#!/usr/bin/env python3
"""
validate_crosswalk.py - sanity-check control identifiers in the framework crosswalk.

Reads data/crosswalk.csv and validates every control identifier in the four
ROW-LEVEL frameworks with regular expressions:

    NIST SP 800-53 Rev 5 : two-letter family + number + optional enhancement   e.g. IA-2, SC-28, AC-6
    ISO/IEC 27001:2022   : A.<clause>[.<sub>]                                   e.g. A.5.1, A.8.24
    SOC 2 TSC            : Common Criteria CCx.y or Availability A1.z           e.g. CC6.1, A1.2
    HIPAA Security Rule  : §164.<section> with optional (a)(2)(i)-style suffix  e.g. §164.312(a)(2)(i)

HITRUST is intentionally NOT validated here because this repo exposes no
HITRUST row-level mapping data.

Exit code 0 if all IDs parse, 1 if any malformed ID is found.
Usage: python3 scripts/validate_crosswalk.py [--csv data/crosswalk.csv]
"""

import argparse
import csv
import os
import re
import sys

PATTERNS = {
    "nist_800_53": re.compile(r"^[A-Z]{2}-\d+(?:\(\d+\))?$"),
    "iso_27001":   re.compile(r"^A\.\d+(?:\.\d+)?$"),
    "soc2":        re.compile(r"^(?:CC\d+\.\d+|A\d+\.\d+|PI\d+\.\d+|C\d+\.\d+|P\d+\.\d+)$"),
    "hipaa":       re.compile(r"^§164\.\d+(?:\([A-Za-z0-9]+\))*$"),
}
LABELS = {
    "nist_800_53": "NIST 800-53", "iso_27001": "ISO 27001:2022",
    "soc2": "SOC 2", "hipaa": "HIPAA",
}


def repo_root():
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def split_ids(cell):
    # IDs are comma-separated within a cell, e.g. "PM-9, RA-1"
    return [tok.strip() for tok in (cell or "").split(",") if tok.strip()]


def main(argv=None):
    root = repo_root()
    parser = argparse.ArgumentParser(description="Validate crosswalk control IDs")
    parser.add_argument("--csv", default=os.path.join(root, "data", "crosswalk.csv"))
    args = parser.parse_args(argv)

    if not os.path.exists(args.csv):
        print(f"ERROR: crosswalk file not found: {args.csv}", file=sys.stderr)
        return 1

    totals = {k: 0 for k in PATTERNS}
    problems = []
    rows_seen = 0

    with open(args.csv, newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        for ln, row in enumerate(reader, start=2):
            rows_seen += 1
            sub = (row.get("sub") or "").strip()
            for col, pat in PATTERNS.items():
                for ident in split_ids(row.get(col)):
                    totals[col] += 1
                    if not pat.match(ident):
                        problems.append((ln, sub, LABELS[col], ident))

    print("─" * 58)
    print("  Crosswalk control-ID validation - Northwind CSF 2.0")
    print("  (simulated portfolio; 4 row-level frameworks)")
    print("─" * 58)
    print(f"  Rows checked .............. {rows_seen}")
    for col in PATTERNS:
        print(f"  {LABELS[col]:<16} IDs ...... {totals[col]:>3}")
    print(f"  Total IDs validated ....... {sum(totals.values())}")
    print("─" * 58)

    if problems:
        print(f"  {len(problems)} malformed identifier(s):")
        for ln, sub, fw, ident in problems:
            print(f"    line {ln}  {sub}  [{fw}]  -> '{ident}'")
        return 1

    print("  All control identifiers well-formed. ✓")
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

---

## `scripts/run_demo.sh`

```bash
#!/usr/bin/env bash
# run_demo.sh - one-shot interview demo of the offline scoring + validation tools.
# Runs the Python maturity scorer and the crosswalk validator end to end.
# Usage:  bash scripts/run_demo.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "=============================================================="
echo "  Northwind CSF 2.0 - offline demo (simulated portfolio data)"
echo "=============================================================="

echo
echo ">> 1/3  Maturity scoring"
python3 scripts/score_maturity.py

echo
echo ">> 2/3  Crosswalk ID validation"
python3 scripts/validate_crosswalk.py

echo
echo ">> 3/3  KPI summary (machine-readable)"
if command -v python3 >/dev/null 2>&1; then
  python3 -c "import json; d=json.load(open('outputs/kpi_summary.json')); print('   overall:', d['overallMaturity'], '| priority:', ', '.join(d['priorityFunctions']))"
fi

echo
echo "Done. JSON at outputs/kpi_summary.json"
```

---

## `tests/assessment.test.js`

```javascript
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");

const GRC = require("../data.js");
const S = require("../scoring.js");

test("assessment data exists", () => {
  assert.ok(GRC && GRC.ASSESSMENT, "ASSESSMENT present");
  assert.equal(GRC.ASSESSMENT.org, "Northwind Health Systems");
});

test("six CSF Functions exist", () => {
  assert.equal(GRC.FUNCTIONS.length, 6);
  assert.deepEqual(GRC.FUNCTIONS.map((f) => f.key), ["GV", "ID", "PR", "DE", "RS", "RC"]);
});

test("23 assessed subcategories", () => {
  assert.equal(GRC.SUBSCORES.length, 23);
  assert.equal(GRC.ASSESSMENT.subcategories, 23);
});

test("weighted overall maturity rounds to 1.57", () => {
  const r = S.scoreFromSubscores(GRC.SUBSCORES);
  assert.equal(r.overall, 1.57);
  assert.equal(r.assessedSubcategories, 23);
  assert.equal(r.overallTier, "Tier 2 · Risk Informed");
});

test("weighted overall differs from the simple mean of Function means", () => {
  const r = S.scoreFromSubscores(GRC.SUBSCORES);
  assert.equal(r.kpi.simpleMeanOfFunctions, 1.53);
  assert.notEqual(r.overall, r.kpi.simpleMeanOfFunctions);
});

test("per-Function scores match the published figures", () => {
  const r = S.scoreFromSubscores(GRC.SUBSCORES);
  const byKey = Object.fromEntries(r.functions.map((f) => [f.key, f.score]));
  assert.deepEqual(byKey, { GV: 1.4, ID: 1.6, PR: 2.0, DE: 1.33, RS: 1.33, RC: 1.5 });
});

test("priority Functions are Detect and Respond (the 1.33 floor)", () => {
  const r = S.scoreFromSubscores(GRC.SUBSCORES);
  assert.deepEqual(r.priorityFunctions.sort(), ["Detect", "Respond"]);
});

test("risk register contains 10 risks with 3 critical", () => {
  assert.equal(GRC.RISKS.length, 10);
  const crit = S.filterRisks(GRC.RISKS, { level: "Critical" });
  assert.equal(crit.count, 3);
  assert.deepEqual(crit.risks.map((r) => r.id), ["R-001", "R-002", "R-003"]);
});

test("risk minScore filter works", () => {
  const r = S.filterRisks(GRC.RISKS, { minScore: 12 });
  assert.equal(r.count, 8);
  assert.ok(r.risks.every((x) => x.score >= 12));
});

test("crosswalk lookup for PR.AA-01 returns expected mappings", () => {
  const r = S.filterCrosswalk(GRC.CROSSWALK, { sub: "PR.AA-01" });
  assert.equal(r.count, 1);
  assert.equal(r.rows[0].n8, "IA-2, IA-5");
  assert.match(r.rows[0].hi, /164\.312\(a\)\(2\)\(i\)/);
});

test("crosswalk exposes exactly four row-level frameworks", () => {
  const r = S.filterCrosswalk(GRC.CROSSWALK, {});
  assert.equal(r.rowLevelFrameworks.length, 4);
  assert.deepEqual(r.rowLevelFrameworks, ["NIST 800-53", "ISO 27001:2022", "SOC 2", "HIPAA"]);
});

test("crosswalk framework filter returns a single mapping column", () => {
  const r = S.filterCrosswalk(GRC.CROSSWALK, { sub: "PR.AA-01", framework: "hipaa" });
  assert.equal(r.framework, "HIPAA");
  assert.equal(r.rows[0].mapping, "§164.312(a)(2)(i)");
});

test("unsupported HITRUST framework filter returns no row-level mappings", () => {
  const r = S.filterCrosswalk(GRC.CROSSWALK, { framework: "hitrust" });
  assert.equal(r.count, 0);
  assert.equal(r.unsupportedFramework, "hitrust");
  assert.deepEqual(r.rows, []);
});

test("vendor tiering: simulated ePHI + production-like access => Tier 1 Critical, BAA review required", () => {
  const v = S.vendorTier({ vendorName: "X", dataTypes: ["ePHI", "PII"], productionAccess: true, subprocessors: true });
  assert.equal(v.tier, "T1");
  assert.equal(v.label, "Critical");
  assert.equal(v.baaReviewRequired, true);
  assert.equal(v.soc2ReviewRequired, true);
  assert.equal(v.questionnaireRequired, true);
});

test("vendor tiering: no sensitive data, no access => Tier 4 Low", () => {
  const v = S.vendorTier({ vendorName: "Y", dataTypes: [], productionAccess: false, systemAccess: false });
  assert.equal(v.tier, "T4");
  assert.equal(v.baaReviewRequired, false);
});

test("scoreFromSubscores rejects out-of-range scores", () => {
  assert.throws(() => S.scoreFromSubscores([["GV", "GV.OC-01", 0]]), /invalid score/);
  assert.throws(() => S.scoreFromSubscores([["GV", "GV.OC-01", 9]]), /invalid score/);
});

test("scoreFromSubscores rejects an unknown Function", () => {
  assert.throws(() => S.scoreFromSubscores([["ZZ", "ZZ.OC-01", 2]]), /unknown Function/);
});

test("evidence log has nine items", () => {
  assert.equal(GRC.EVIDENCE.length, 9);
});

test("claim map covers every proof-type category", () => {
  const cats = new Set(GRC.CLAIMS.map((c) => c.cat));
  ["portfolio", "backend", "script", "docs", "coursework", "operations", "military"]
    .forEach((c) => assert.ok(cats.has(c), `missing category ${c}`));
});
```

---

## `tests/api.test.js`

```javascript
"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");

/* Invoke a serverless handler with a mock req/res and capture the JSON response. */
function invoke(handler, { method = "GET", url = "/", body } = {}) {
  return new Promise((resolve, reject) => {
    const res = {
      statusCode: 200,
      _headers: {},
      setHeader(k, v) { this._headers[k] = v; },
      end(payload) {
        let json = null;
        try { json = payload ? JSON.parse(payload) : {}; } catch (e) { return reject(e); }
        resolve({ status: this.statusCode, headers: this._headers, json });
      },
    };
    Promise.resolve(handler({ method, url, body }, res)).catch(reject);
  });
}

test("GET /api/health returns ok + simulated-portfolio mode", async () => {
  const { status, json } = await invoke(require("../api/health.js"));
  assert.equal(status, 200);
  assert.equal(json.ok, true);
  assert.equal(json.mode, "simulated-portfolio");
  assert.ok(json.timestamp);
});

test("GET /api/assessment returns the weighted overall 1.57", async () => {
  const { status, json } = await invoke(require("../api/assessment.js"));
  assert.equal(status, 200);
  assert.equal(json.overallMaturity, 1.57);
  assert.equal(json.functions, 6);
  assert.equal(json.assessedSubcategories, 23);
  assert.equal(json.risks, 10);
  assert.equal(json.rowLevelFrameworks, 4);
});

test("GET /api/risks?level=Critical returns three risks", async () => {
  const { json } = await invoke(require("../api/risks.js"), { url: "/api/risks?level=Critical" });
  assert.equal(json.count, 3);
  assert.equal(json.byLevel.Critical, 3);
});

test("GET /api/crosswalk?sub=PR.AA-01 returns one row, four frameworks", async () => {
  const { json } = await invoke(require("../api/crosswalk.js"), { url: "/api/crosswalk?sub=PR.AA-01" });
  assert.equal(json.count, 1);
  assert.equal(json.rows[0].n8, "IA-2, IA-5");
  assert.equal(json.rowLevelFrameworks.length, 4);
});

test("GET /api/crosswalk?framework=hitrust returns no row-level mappings", async () => {
  const { json } = await invoke(require("../api/crosswalk.js"), { url: "/api/crosswalk?framework=hitrust" });
  assert.equal(json.count, 0);
  assert.equal(json.unsupportedFramework, "hitrust");
  assert.deepEqual(json.rows, []);
});

test("POST /api/score with no body scores the shipped data to 1.57", async () => {
  const { json } = await invoke(require("../api/score.js"), { method: "POST", body: {} });
  assert.equal(json.overallMaturity, 1.57);
  assert.equal(json.assessedSubcategories, 23);
  assert.ok(Array.isArray(json.perFunction));
});

test("POST /api/score with custom subscores recomputes", async () => {
  const body = { subscores: [["GV", "GV.OC-01", 4], ["PR", "PR.AA-01", 2]] };
  const { json } = await invoke(require("../api/score.js"), { method: "POST", body });
  assert.equal(json.overallMaturity, 3); // (4+2)/2
  assert.equal(json.source, "request body");
});

test("POST /api/vendor-tier: simulated ePHI + production-like access => Tier 1 Critical", async () => {
  const body = { vendorName: "MedStream", dataTypes: ["ePHI"], productionAccess: true };
  const { json } = await invoke(require("../api/vendor-tier.js"), { method: "POST", body });
  assert.equal(json.tier, "T1");
  assert.equal(json.baaReviewRequired, true);
});

test("GET /api/evidence returns nine items", async () => {
  const { json } = await invoke(require("../api/evidence.js"));
  assert.equal(json.count, 9);
  assert.equal(json.evidence[0].evidenceId, "E-01");
});

test("disallowed method returns 405 with Allow header", async () => {
  const { status, headers } = await invoke(require("../api/health.js"), { method: "POST" });
  assert.equal(status, 405);
  assert.ok(headers.Allow.includes("GET"));
});
```

---

## `package.json`

```json
{
  "name": "northwind-csf",
  "version": "1.0.0",
  "private": true,
  "description": "Northwind Health Systems - simulated NIST CSF 2.0 GRC assessment portfolio (static frontend + serverless API + Python scoring).",
  "type": "commonjs",
  "scripts": {
    "dev": "vercel dev",
    "serve": "python3 -m http.server 8777",
    "test": "node --test",
    "score": "python3 scripts/score_maturity.py",
    "validate": "python3 scripts/validate_crosswalk.py",
    "demo": "bash scripts/run_demo.sh"
  },
  "engines": {
    "node": ">=18"
  },
  "license": "MIT"
}
```

---

## `vercel.json`

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
      "source": "/(.*)\\.(css|js)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
      ]
    }
  ]
}
```

---

## `data/csf_scores.csv`

```csv
function,function_name,subcategory,score
GV,Govern,GV.OC-01,2
GV,Govern,GV.RM-01,1
GV,Govern,GV.RR-02,2
GV,Govern,GV.PO-01,1
GV,Govern,GV.SC-01,1
ID,Identify,ID.AM-01,2
ID,Identify,ID.AM-02,1
ID,Identify,ID.AM-05,2
ID,Identify,ID.RA-01,2
ID,Identify,ID.RA-05,1
PR,Protect,PR.AA-01,2
PR,Protect,PR.AA-05,1
PR,Protect,PR.DS-01,3
PR,Protect,PR.DS-02,3
PR,Protect,PR.AT-01,1
DE,Detect,DE.CM-01,2
DE,Detect,DE.CM-09,1
DE,Detect,DE.AE-02,1
RS,Respond,RS.MA-01,1
RS,Respond,RS.CO-02,2
RS,Respond,RS.AN-03,1
RC,Recover,RC.RP-01,2
RC,Recover,RC.CO-03,1
```

---

## `data/risk_register.csv`

```csv
id,likelihood,impact,score,level,owner,subcategory,description
R-001,4,5,20,Critical,CTO,PR.AA-01,"Shared AWS admin account without MFA enables full environment compromise"
R-002,4,4,16,Critical,CTO,PR.AA-05,"Excessive IAM permissions (no least privilege) allow lateral movement to ePHI"
R-003,4,4,16,Critical,IT Lead,DE.AE-02,"No SIEM or log review means breaches go undetected"
R-004,3,5,15,High,IT Lead,RS.MA-01,"IR plan never tested; HIPAA breach-notification clock missed"
R-005,4,3,12,High,IT Lead,DE.CM-09,"No endpoint detection (EDR) on employee laptops"
R-006,4,3,12,High,HR / IT Lead,PR.AT-01,"No annual security awareness training; phishing-susceptible workforce"
R-007,3,4,12,High,Procurement,GV.SC-01,"Vendors onboarded with no security review (supply-chain risk)"
R-008,3,4,12,High,IT Lead,RC.RP-01,"Backups exist but restore never tested; recovery may fail"
R-009,3,3,9,Moderate,IT Lead,ID.AM-02,"No formal software inventory; unpatched / unknown assets"
R-010,3,2,6,Moderate,CEO,GV.RM-01,"No risk appetite statement; inconsistent risk decisions"
```

---

## `data/poam.csv`

```csv
id,severity,subcategory,owner,start,due,status,action
POAM-001,Critical,PR.AA-01,CTO,2026-07-01,2026-07-07,In Progress,"Provision individual IAM users; enforce MFA; secure root with break-glass"
POAM-002,Critical,PR.AA-05,CTO,2026-07-15,2026-07-31,Open,"Define RBAC roles; scope IAM policies; quarterly access reviews"
POAM-003,Critical,DE.AE-02,IT Lead,2026-07-10,2026-08-15,Open,"Deploy SIEM; forward CloudTrail + app logs; define alerts; assign triage"
POAM-004,High,RS.MA-01,IT Lead,2026-08-01,2026-08-31,Open,"Run tabletop exercise; assign IR roles; document lessons learned"
POAM-005,High,PR.AT-01,HR / IT Lead,2026-08-15,2026-09-15,Open,"Deploy annual training + quarterly phishing simulations"
POAM-006,High,GV.SC-01,Procurement,2026-08-01,2026-09-30,Open,"Stand up vendor risk program; require BAAs; risk-tier vendors"
POAM-007,High,RC.RP-01,IT Lead,2026-08-20,2026-09-10,Open,"Perform full restore test; document RTO / RPO"
POAM-008,High,DE.CM-09,IT Lead,2026-08-25,2026-09-20,Open,"Deploy EDR to all endpoints; centralize alerts"
POAM-009,Moderate,ID.AM-02,IT Lead,2026-09-01,2026-10-15,Open,"Build software inventory / SBOM; integrate with vuln scanning"
POAM-010,Moderate,GV.RM-01,CEO,2026-09-15,2026-10-31,Open,"Draft and ratify risk appetite + risk management policy"
```

---

## `data/control_tests.csv`

```csv
id,control,subcategory,objective,design,operating
TEST-01,IA-2,PR.AA-01,MFA on privileged accounts,Fail,Fail
TEST-02,AC-6,PR.AA-05,Least privilege / RBAC,Fail,Fail
TEST-03,AU-6,DE.AE-02,Log review & detection,Partial,Fail
TEST-04,IR-8,RS.MA-01,Incident response execution,Pass,Fail
TEST-05,AT-2,PR.AT-01,Security awareness training,Fail,Fail
```

---

## `data/evidence_log.csv`

```csv
id,artifact,mapping,type,status,note
E-01,IAM configuration export,PR.AA-01 · IA-2,Configuration,Simulated,"Shared admin account, MFA disabled - substantiates R-001"
E-02,IAM policy JSON review,PR.AA-05 · AC-6,Configuration,Simulated,"Wildcard permissions; no least-privilege roles"
E-03,Logging architecture diagram,DE.AE-02 · AU-6,Diagram,Simulated,"No SIEM; CloudTrail not forwarded or reviewed"
E-04,Incident response plan v1,RS.MA-01 · IR-8,Plan,Portfolio,"Authored end to end; tabletop not yet exercised"
E-05,Security awareness training log,PR.AT-01 · AT-2,Records,Simulated,"No completion records on file"
E-06,Backup & restore runbook,RC.RP-01 · CP-10,Procedure,Portfolio,"Backups configured; restore never tested end to end"
E-07,Vendor inventory & BAA tracker,GV.SC-01 · SR-3,Register,Portfolio,"Tiered vendor list; BAA status per vendor"
E-08,Encryption-at-rest settings,PR.DS-01 · SC-28,Configuration,Simulated,"AES-256 enabled on data stores - a passing control"
E-09,Software inventory gap memo,ID.AM-02 · CM-8,Memo,Portfolio,"No authoritative software/SBOM inventory yet"
```

---

## `data/crosswalk.csv`

```csv
fn,sub,objective,nist_800_53,iso_27001,soc2,hipaa
GV,GV.RM-01,"Risk management strategy","PM-9, RA-1","A.5.1, A.5.2","CC3.1, CC3.2","§164.308(a)(1)(ii)(A)"
GV,GV.PO-01,"Security policy","PL-1, PM-1","A.5.1","CC1.1, CC5.3","§164.316(a)"
GV,GV.SC-01,"Supply-chain risk mgmt","SR-1, SR-3","A.5.19, A.5.21","CC9.2","§164.308(b)"
ID,ID.AM-01,"Hardware inventory","CM-8","A.5.9","CC6.1","§164.310(d)(1)"
ID,ID.AM-02,"Software inventory","CM-8, CM-10","A.5.9, A.8.8","CC6.1","§164.308(a)(1)"
ID,ID.RA-01,"Vulnerability identification","RA-5","A.8.8","CC7.1","§164.308(a)(1)(ii)(A)"
ID,ID.RA-05,"Risk prioritization","RA-3, RA-7","A.5.7, A.8.2","CC3.2","§164.308(a)(1)(ii)(B)"
PR,PR.AA-01,"Identity & credential mgmt","IA-2, IA-5","A.5.16, A.5.17","CC6.1, CC6.2","§164.312(a)(2)(i)"
PR,PR.AA-05,"Least privilege","AC-6","A.8.2, A.8.3","CC6.3","§164.312(a)(1)"
PR,PR.DS-01,"Data at rest encryption","SC-28","A.8.24","CC6.1","§164.312(a)(2)(iv)"
PR,PR.DS-02,"Data in transit encryption","SC-8","A.8.24","CC6.7","§164.312(e)(1)"
PR,PR.AT-01,"Security awareness training","AT-2","A.6.3","CC1.4","§164.308(a)(5)"
DE,DE.CM-01,"Network / system monitoring","SI-4, AU-6","A.8.16","CC7.2","§164.312(b)"
DE,DE.CM-09,"Endpoint monitoring","SI-4, SI-3","A.8.7","CC7.2","§164.308(a)(1)(ii)(D)"
DE,DE.AE-02,"Event analysis","AU-6, IR-4","A.8.15, A.8.16","CC7.3","§164.308(a)(1)(ii)(D)"
RS,RS.MA-01,"Incident response execution","IR-4, IR-8","A.5.24, A.5.26","CC7.4","§164.308(a)(6)"
RS,RS.CO-02,"Incident reporting","IR-6","A.5.25, A.6.8","CC7.4","§164.408"
RC,RC.RP-01,"Recovery plan","CP-10, IR-4","A.5.29, A.5.30","A1.2, CC7.5","§164.308(a)(7)"
RC,RC.CO-03,"Recovery communication","CP-2, IR-7","A.5.26","CC7.5","§164.308(a)(7)(ii)(C)"
```

---

## `README.md`

````markdown
# Northwind Health Systems - NIST CSF 2.0 GRC Assessment (Portfolio)

A **simulated** Governance, Risk & Compliance assessment of a **fictional** healthcare-SaaS
organization, built as an interactive readiness instrument with a live backend, a Python scoring
workflow, and a test suite. Built by **Ozirus B. Morency** as an entry-level GRC / Compliance &
Risk Analyst portfolio.

> **Simulated portfolio engagement.** Northwind Health Systems is fictional. This is a *readiness
> self-assessment for demonstration* - **not** a SOC 2 audit, a HIPAA attestation, real client
> work, or production GRC employment. No real ePHI is involved.

**Live:** https://northwind-csf.vercel.app

---

## What this repo proves (and the honest boundary)

| Resume claim | Proof in this repo | Proof type | Boundary |
|---|---|---|---|
| NIST CSF 2.0 assessment across 6 Functions | Radar, `data/csf_scores.csv`, `scripts/score_maturity.py`, `GET /api/assessment` | Portfolio + Script + Backend | Simulated, fictional org |
| Multi-framework crosswalk (800-53, ISO 27001:2022, SOC 2, HIPAA) | Interactive crosswalk (19 rows × **4** frameworks), `GET /api/crosswalk` | Portfolio | 4 frameworks at control level; no HITRUST row-level mapping claimed |
| Risk assessment & register | 5×5 matrix, `data/risk_register.csv`, `GET /api/risks` | Portfolio + Backend | Simulated risks |
| Control testing (design vs operating) | 5 tests, `data/control_tests.csv` | Portfolio | Readiness testing, not an audit opinion |
| POA&M remediation tracking | 10 items, `data/poam.csv` | Portfolio | Simulated plan |
| TPRM tiering / SIG-CAIQ / SOC 2 review | 4-tier model, `POST /api/vendor-tier` | Portfolio + Backend | Simulated TPRM demo |
| Python / regex / JSON / CSV / Bash | `scripts/*.py`, `scripts/run_demo.sh` | Script | Portfolio tooling |
| Google Cybersecurity Cert (June 2026) | Background section | Coursework | Beginner-level; not production SOC |
| Splunk / Chronicle / Suricata / SIEM | Background + Detect findings | Coursework exposure | Coursework, not production tooling |
| 4+ yrs federally-audited ops, OSHA/EPA, 50+ RCA | Transferable-experience section | Prior operations | Not cybersecurity employment |
| Army National Guard veteran | Background section | Military | Context, not technical claim |

Full mapping: [`CLAIM_MATRIX.md`](CLAIM_MATRIX.md).

---

## Architecture

Vanilla, no build step. Static frontend + Vercel serverless functions + Python tooling.

```
index.html · styles.css · app.js     Frontend (hand-built SVG/DOM, no framework)
data.js                              Single source of truth (dual-exported: browser + Node)
scoring.js                           Pure compute, shared by frontend / API / tests
apiutil.js                           Tiny request/response helpers for the API
/api/*.js                            Serverless endpoints (health, assessment, risks,
                                       crosswalk, score, vendor-tier, evidence)
/scripts/*.py + run_demo.sh          Python maturity scorer + crosswalk validator
/data/*.csv                          CSV mirrors of the assessment data
/tests/*.test.js                     node --test suite (27 tests)
/outputs/kpi_summary.json            Generated by the scorer
```

### The number that matters
Overall maturity is **weighted by assessed subcategory count**, not a simple mean of the six
Function averages:

```
overall = sum(all 23 subcategory scores) / 23 = 36 / 23 = 1.565 → 1.57
```

(The simple mean of the six Function averages is 1.53 - shown only for contrast.)

---

## Quickstart

```bash
git clone https://github.com/ozzielove/<repo>.git
cd <repo>            # the site lives in Projects/grc-nist-csf-assessment/site

# 1) Static preview (no API)
python3 -m http.server 8777      # → http://localhost:8777

# 2) Full local stack with live API (needs Vercel CLI)
npm install -g vercel            # one-time, only if you don't have it
npm run dev                      # vercel dev → http://localhost:3000 with /api/* live
```

> The site works **with or without** the API. If `/api/*` is unreachable it falls back to the
> bundled data and the nav badge shows **static mode**.

### Test
```bash
npm test                         # node --test → 27 passing
```

### Run the Python scoring workflow
```bash
python3 scripts/score_maturity.py        # prints per-Function + overall 1.57; writes outputs/kpi_summary.json
python3 scripts/validate_crosswalk.py    # regex-validates 102 control IDs across 4 frameworks
bash    scripts/run_demo.sh              # both, end to end
```

---

## API endpoints

| Endpoint | Method | Example |
|---|---|---|
| `/api/health` | GET | service status + mode |
| `/api/assessment` | GET | summary (overall 1.57, counts, disclaimer) |
| `/api/risks` | GET | `?level=Critical` · `?owner=CTO` · `?minScore=12` · `?sub=PR.AA-01` |
| `/api/crosswalk` | GET | `?fn=PR` · `?sub=PR.AA-01` · `?framework=hipaa` |
| `/api/score` | POST | `{ "subscores": [["GV","GV.OC-01",2], ...] }` (empty body → ships 1.57) |
| `/api/vendor-tier` | POST | `{ "dataTypes":["ePHI"], "productionAccess":true }` → Tier 1 Critical for simulated ePHI + production-like access |
| `/api/evidence` | GET | evidence log (9 items) · `?status=Portfolio` |

---

## Deployment
See [`DEPLOY.md`](DEPLOY.md). Deploys to Vercel with zero secrets; the `/api` folder becomes
serverless functions automatically.

## Integrity boundaries
- Fictional org; simulated assessment; readiness - never compliance/attestation/audit authority.
- Four frameworks crosswalked at control level; no HITRUST row-level mapping is claimed.
- Splunk/Chronicle/Suricata/SQL/PCI DSS/OWASP/RMF/SAP = coursework or prior-ops exposure, not
  production work, unless an artifact in this repo proves otherwise.
````

---

## `DEMO_SCRIPT.md`

````markdown
# 5-Minute Interview Demo Script - Northwind CSF 2.0

Say it out loud. Times are approximate. Keep the honesty framing in every section.

---

### 0:00 - Open & frame (30s)
> "This is a **simulated** GRC assessment I built for a **fictional** healthcare-SaaS company,
> Northwind Health Systems. It's a readiness assessment and portfolio piece - not real client work,
> not a SOC 2 audit. Everything you see traces to an artifact in the repo, and there's a live API
> behind it you can poke."

Open **https://northwind-csf.vercel.app**. Point to the nav badge: *"API online."*

### 0:30 - CSF maturity scoring (45s)
Scroll to **Posture**. 
> "Six NIST CSF 2.0 Functions, scored on the 1-4 tier scale. Overall is **1.57 - Tier 2**. That
> number is **weighted by how many subcategories each Function carries**, not a flat average - a flat
> average would be 1.53. Detect and Respond are the floor, so they sequence first."

### 1:15 - Risk register (40s)
Scroll to **Risk**. Click the top-right dot (**R-001**).
> "Ten risks scored likelihood × impact. The critical cluster is shared admin access without MFA,
> over-permissioned IAM, and no detection coverage."

### 1:55 - Control testing (30s)
Scroll to **Controls**. Point to **TEST-04**.
> "Design vs. operating effectiveness. The IR plan is *designed* - it passes on paper - but it was
> never exercised, so it **fails in operation**. Testing both is the whole point."

### 2:25 - POA&M (25s)
Scroll to **Plan of Action & Milestones**.
> "Ten remediation items with owners and dates. Critical access and detection close first; governance
> polish lands last."

### 2:50 - Crosswalk (35s)
Scroll to **Crosswalk**. Filter to **Protect**.
> "One assessed control maps to **four** frameworks at once - 800-53, ISO 27001:2022, SOC 2, and
> HIPAA. That's the efficiency argument for a unified program. I do not claim HITRUST row-level
> mapping here because the repo only exposes four row-level framework mappings."

### 3:25 - TPRM (25s)
Scroll to **Third-Party Risk**.
> "A four-tier vendor model. A simulated vendor touching ePHI-class data with production-like access
> is Tier 1 - BAA review before data flows, SOC 2 review, SIG/CAIQ questionnaire."

### 3:50 - Live backend (45s)
Scroll to **Interview Demo Mode**.
- Click **API health check** → *"Live serverless endpoint."*
- Click **Recalculate maturity → 1.57** → *"The backend recomputes from the same data and returns 1.57."*
- In the **vendor tiering** form, leave simulated ePHI + production-like access checked, click **Run vendor tiering** →
  *"Tier 1, Critical, BAA required - computed server-side."*

> "And if the API is ever down, the page falls back to the bundled data and tells you so."

Optionally, in a terminal:
```bash
python3 scripts/score_maturity.py
```
> "Same scoring, offline, in Python - prints per-Function scores and overall 1.57."

### 4:35 - Resume claim proof map (25s)
Scroll to **Resume Claim Proof Map**.
> "Every résumé claim is tied to the artifact, endpoint, or script that backs it, with the proof type
> and the honest boundary - what's portfolio work, what's coursework, what's prior operations."

### 5:00 - Close (honesty)
> "To be precise about boundaries: the assessment is simulated on a fictional org. My SIEM and tooling
> exposure - Splunk, Chronicle, Suricata - is **coursework**, not production. The audit discipline -
> OSHA/EPA support, 50-plus root-cause investigations - is **prior operations**, not cybersecurity
> employment. This portfolio is how I translate that discipline into GRC artifacts: findings, root
> cause, corrective action, evidence, ownership, remediation."
````

---

## `CLAIM_MATRIX.md`

```markdown
# Claim Matrix - résumé claim → evidence

Proof types: **Portfolio-proven** · **Backend-demo-proven** · **Script-proven** ·
**Documentation-proven** · **Coursework exposure** · **Prior operations** · **Military** ·
**Not yet evidenced**.

Integrity: Northwind is fictional; the assessment is simulated; this is a readiness assessment,
not compliance, attestation, audit authority, client work, or production employment.

| # | Résumé claim | Repo / site evidence | API / script evidence | Proof type | Interview talking point | Integrity boundary |
|---|---|---|---|---|---|---|
| 1 | NIST CSF 2.0 assessment, 6 Functions | Posture radar; `data/csf_scores.csv` | `GET /api/assessment`; `score_maturity.py` | Portfolio + Backend + Script | "Six Functions, overall 1.57, subcategory-weighted" | Simulated, fictional org |
| 2 | NIST SP 800-53 Rev 5 mapping | Crosswalk col 1; `data/crosswalk.csv` | `GET /api/crosswalk?framework=nist` | Portfolio | "Each control maps to an 800-53 family" | Row-level; readiness not audit |
| 3 | ISO/IEC 27001:2022 Annex A mapping | Crosswalk col 2 | `GET /api/crosswalk?framework=iso` | Portfolio | "2022 Annex A numbering" | Row-level mapping |
| 4 | SOC 2 Trust Services Criteria mapping | Crosswalk col 3 | `GET /api/crosswalk?framework=soc` | Portfolio | "CC + Availability criteria" | Mapping, not a SOC 2 report |
| 5 | HIPAA Security Rule mapping | Crosswalk col 4 | `GET /api/crosswalk?framework=hipaa` | Portfolio | "Admin/Physical/Technical safeguard cites" | No real ePHI; readiness |
| 6 | Multi-framework crosswalk | Crosswalk (19 rows × 4) | `validate_crosswalk.py` (102 IDs) | Portfolio + Script | "Map once, trace four control frameworks" | **4** frameworks; no HITRUST row-level mapping claimed |
| 7 | Control crosswalk / gap analysis | Posture blurbs; deliverable #12 | - | Portfolio | "Current vs target, phased to Tier 3" | Simulated |
| 8 | Risk assessment methodology | Risk matrix; `risk_register.csv` | `GET /api/risks` | Portfolio + Backend | "Likelihood × impact, owned + treated" | Simulated risks |
| 9 | Risk register | 10 risks | `GET /api/risks?minScore=12` | Portfolio + Backend | "Top-right quadrant = highest loss" | Simulated |
| 10 | Control testing (design vs operating) | 5 tests; `control_tests.csv` | - | Portfolio | "IR plan passes design, fails operation" | Readiness testing |
| 11 | Audit findings / readiness / evidence | Findings report (#06); evidence log (#09) | `GET /api/evidence` | Portfolio + Backend | "9 evidence items mapped to controls" | Simulated artifacts |
| 12 | POA&M remediation tracking | Gantt; `poam.csv` | - | Portfolio | "10 items, owners, dates, sequencing" | Simulated plan |
| 13 | TPRM / tiered vendor / SIG / CAIQ / SOC 2 review | Vendors section | `POST /api/vendor-tier` | Portfolio + Backend | "simulated ePHI + production-like access → Tier 1, BAA review required" | Simulated TPRM demo |
| 14 | NIST IR lifecycle | TEST-04 (IR-8); POAM-004 tabletop | - | Portfolio (light) | "IR plan → test → lessons learned" | Simulated; not a real incident |
| 15 | Python, file parsing, regex, JSON, CSV | `score_maturity.py`, `validate_crosswalk.py` | `npm test` (27) | Script | "CSV → KPI JSON; regex ID validation" | Portfolio tooling |
| 16 | Bash | `scripts/run_demo.sh` | - | Script | "One-shot offline demo" | Light script |
| 17 | Git version control | repo history | - | Documentation | "Versioned, branchable" | - |
| 18 | Technical & executive report writing, policy, SOPs | README, CLAIM_MATRIX, DEMO_SCRIPT, deliverables #06/#08 | - | Documentation | "The deliverable form of expository writing" | Portfolio docs |
| 19 | Google Cybersecurity Cert (June 2026) | Transferable section | - | Coursework | "Foundational SIEM/log/triage" | Beginner-level; not production SOC |
| 20 | Splunk / Chronicle / Suricata; SIEM, log review, triage | Transferable section; Detect findings | - | Coursework exposure | "What a SIEM would catch for DE.AE-02" | Coursework, **not** production tooling |
| 21 | 4+ yrs federally-audited ops; OSHA/EPA support; 50+ RCA | Transferable section | - | Prior operations | "RCA → finding → root cause → corrective action → POA&M" | Not cybersecurity employment |
| 22 | SAP S/4HANA | (not in this repo) | - | Prior operations | "ERP/tool exposure from prior ops" | Prior ops only; not used here |
| 23 | Army National Guard veteran | Transferable section | - | Military | "Mission discipline, documentation rigor" | Context, not a technical claim |
| 24 | PCI DSS | - | - | **Not yet evidenced** | Name only; would add a cardholder-data scope artifact | No artifact in repo |
| 25 | OWASP Top 10 | - | - | **Not yet evidenced** | Name only; would add an app-sec finding set | No artifact in repo |
| 26 | NIST RMF | - | - | **Not yet evidenced** (adjacent to the CSF work) | Would add a categorize→authorize artifact | No standalone RMF artifact |
| 27 | SQL filters and joins | - | - | **Not yet evidenced** | Would add a `.sql` query over the register | No SQL artifact (CSV/JSON only) |

## Not-yet-evidenced summary (be upfront in interviews)
PCI DSS, OWASP Top 10, NIST RMF (standalone), and SQL are listed on the résumé as skills but have
**no artifact in this repo**. Present them as coursework/skill exposure, or add a small artifact
before claiming them as demonstrated. ISO / SOC 2 / HIPAA appear only as a **readiness
crosswalk** - never as a compliance attestation. HITRUST is not evidenced in this repo as a row-level mapping.
```

---

## `DEPLOY.md`

````markdown
# Deploy - Northwind CSF 2.0 site

Vanilla frontend + Vercel serverless functions (`/api`). No secrets, no database.
The `/api/*.js` files become serverless functions automatically; everything else is static.

## Local development

```bash
cd /Users/ozirusmorency/Downloads/Pal/Projects/grc-nist-csf-assessment/site

# Static only (no API) - fastest:
python3 -m http.server 8777        # → http://localhost:8777  (nav shows "static mode")

# Full stack with live /api/* :
vercel dev                         # → http://localhost:3000  (nav shows "API online")
```

## One-time auth
```bash
vercel login        # interactive (browser) - run yourself in Terminal
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
````
