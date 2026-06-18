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
      i.setAttribute("role", "listitem");
      i.setAttribute("aria-label", `${sub}, score ${sc} of 3`);
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
          <span class="gbar" data-sev="${p.sev}" title="${p.action}" style="left:${left}%; width:${width}%">
            ${p.status === "In Progress" ? '<span class="gbar__status">● live</span>' : ""}
          </span>
        </span>
        <span class="grow__desc">${p.action}</span>`;
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
