/* ============================================================================
   app.js — render + choreography for the Northwind CSF 2.0 audit instrument.
   Vanilla JS. Hand-built SVG/DOM viz. No frameworks, no build step.
   ========================================================================== */
(function () {
  "use strict";
  const { ASSESSMENT, FUNCTIONS, SUBSCORES, RISKS, TESTS, POAM, CROSSWALK, FRAMEWORK_COUNTS } = window.GRC;
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
  counts();
  setRisk(RISKS[0], null);

  watch("#posture", "posture");
  watch("#risk", "risk");
})();
