/* ============================================================================
   tour.js - self-guided onboarding for the Northwind CSF 2.0 audit instrument.
   Two parts, dependency-free vanilla JS:
     1) first-entry optional popup (game-style "take the tour?" prompt)
     2) a sequential coachmark tour that spotlights each section in order.
   Additive only: does not touch window.GRC, #apistat, or the reveal observer.
   No emoji, no em/en dashes in any UI copy.
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "nw_tour_seen";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- ordered tour steps: every section, in document order ---- */
  var STEPS = [
    { target: "#start", title: "Start Here",
      body: "This page is a practice security review of a fictional company. Read it, or let this tour guide you. Why this matters: it shows the full workflow, not just talk." },
    { target: "#posture", title: "Posture",
      body: "A report card for the whole security program: 1.57 of 4.0, Tier 2. Detect and Respond are weakest. Why this matters: it grades itself honestly, flaws included." },
    { target: "#risk", title: "Risk",
      body: "Ten risks plotted by likelihood and impact. The worst, R-001, scores 20 and is Critical. Why this matters: it ranks danger like a professional, worst first." },
    { target: "#controls", title: "Controls",
      body: "Each rule is tested twice: on paper and in real life. The incident plan exists but was never practiced. Why this matters: a rule that fails in practice is no rule at all." },
    { target: "#remediation", title: "Repair Plan",
      body: "Ten fixes, each with an owner and a due date, urgent ones first. Why this matters: it turns a list of problems into an accountable plan." },
    { target: "#crosswalk", title: "Crosswalk",
      body: "One good control can satisfy four different rulebooks at once. Why this matters: that is how a compliance team avoids duplicate work." },
    { target: "#vendors", title: "Third-Party Risk",
      body: "Outside vendors are ranked by risk; the riskiest must sign a contract before any data flows. Why this matters: most breaches come through trusted vendors." },
    { target: "#deliverables", title: "Deliverables",
      body: "The real documents that sit behind every chart on the page. Why this matters: the visuals are backed by defensible paperwork." },
    { target: "#transferable", title: "Experience",
      body: "Prior audit, federal-review, and root-cause work maps straight into this field. Why this matters: the discipline is real even though the title is new." },
    { target: "#claimmap", title: "Proof",
      body: "Every claim is tied to a file you can open. Why this matters: you can verify the work instead of trusting it." },
    { target: "#demo", title: "Live Demo",
      body: "Live buttons recompute the score in real time, and the full study guide is downloadable. Why this matters: it proves working software, not just slides. That is the tour; explore freely." }
  ];

  /* ---- small helpers ---- */
  function el(tag, cls, attrs) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
  function focusables(root) {
    return Array.prototype.slice.call(
      root.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(function (e) { return !e.disabled && e.offsetParent !== null; });
  }

  /* ===================== FIRST-ENTRY POPUP ===================== */
  var popupOpen = false;
  function buildPopup() {
    var lastFocus = document.activeElement;
    var back = el("div", "nwpop__backdrop");
    var modal = el("div", "nwpop", {
      role: "dialog", "aria-modal": "true", "aria-labelledby": "nwpopTitle", "aria-describedby": "nwpopBody"
    });
    modal.innerHTML =
      '<button class="nwpop__x" type="button" aria-label="Close">Close</button>' +
      '<p class="nwpop__eyebrow">Simulated GRC assessment</p>' +
      '<h2 class="nwpop__title" id="nwpopTitle">New here? Take the 60-second tour.</h2>' +
      '<p class="nwpop__body" id="nwpopBody">This is a simulated security review of a fictional company. ' +
      'I can walk you through every part, or you can explore on your own.</p>' +
      '<div class="nwpop__actions">' +
      '<button class="probe probe--solid nwpop__go" type="button">Start the tour</button>' +
      '<button class="probe nwpop__skip" type="button">Explore on my own</button>' +
      '</div>';
    back.appendChild(modal);
    document.body.appendChild(back);
    popupOpen = true;

    function seen() { try { localStorage.setItem(STORAGE_KEY, "1"); } catch (e) {} }
    function close() {
      if (!popupOpen) return;
      popupOpen = false;
      seen();
      document.removeEventListener("keydown", onKey, true);
      back.remove();
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    function onKey(e) {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key === "Tab") {
        var f = focusables(modal);
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener("keydown", onKey, true);
    back.addEventListener("click", function (e) { if (e.target === back) close(); });
    modal.querySelector(".nwpop__x").addEventListener("click", close);
    modal.querySelector(".nwpop__skip").addEventListener("click", close);
    modal.querySelector(".nwpop__go").addEventListener("click", function () {
      close();
      startTour();
    });

    requestAnimationFrame(function () {
      back.classList.add("is-in");
      var go = modal.querySelector(".nwpop__go");
      if (go) go.focus();
    });
  }

  /* ===================== GUIDED TOUR ===================== */
  var tour = null; // active tour state

  function startTour() {
    if (tour) teardownTour();
    var lastFocus = document.activeElement;

    var overlay = el("div", "nwtour");
    var spot = el("div", "nwtour__spot", { "aria-hidden": "true" });
    var card = el("div", "nwtour__card", {
      role: "dialog", "aria-modal": "true", "aria-labelledby": "nwtourTitle", "aria-describedby": "nwtourBody"
    });
    card.innerHTML =
      '<p class="nwtour__count" id="nwtourCount"></p>' +
      '<h3 class="nwtour__title" id="nwtourTitle"></h3>' +
      '<p class="nwtour__body" id="nwtourBody"></p>' +
      '<div class="nwtour__controls">' +
      '<button class="probe nwtour__skip" type="button">Skip tour</button>' +
      '<span class="nwtour__nav">' +
      '<button class="probe nwtour__back" type="button">Back</button>' +
      '<button class="probe probe--solid nwtour__next" type="button">Next</button>' +
      '</span></div>';
    overlay.appendChild(spot);
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    tour = { overlay: overlay, spot: spot, card: card, i: 0, lastFocus: lastFocus, target: null };

    card.querySelector(".nwtour__skip").addEventListener("click", teardownTour);
    card.querySelector(".nwtour__back").addEventListener("click", function () { go(tour.i - 1); });
    card.querySelector(".nwtour__next").addEventListener("click", function () {
      if (tour.i >= STEPS.length - 1) teardownTour(); else go(tour.i + 1);
    });
    document.addEventListener("keydown", onTourKey, true);
    window.addEventListener("resize", reposition, true);
    window.addEventListener("scroll", reposition, true);

    go(0);
  }

  function onTourKey(e) {
    if (!tour) return;
    if (e.key === "Escape") { e.preventDefault(); teardownTour(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); if (tour.i < STEPS.length - 1) go(tour.i + 1); else teardownTour(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(tour.i - 1); }
    else if (e.key === "Tab") {
      var f = focusables(tour.card);
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function resolveTarget(startIdx, dir) {
    // skip missing targets gracefully
    var i = startIdx;
    while (i >= 0 && i < STEPS.length) {
      var t = document.querySelector(STEPS[i].target);
      if (t) return { i: i, node: t };
      i += dir;
    }
    return null;
  }

  // a tall section makes a poor spotlight; highlight its compact heading block
  function highlightNode(section) {
    var head = section.querySelector(".section__head");
    if (head && section.getBoundingClientRect().height > window.innerHeight * 0.85) return head;
    return section;
  }

  function go(idx) {
    if (!tour) return;
    var dir = idx >= tour.i ? 1 : -1;
    var clamped = Math.max(0, Math.min(STEPS.length - 1, idx));
    var found = resolveTarget(clamped, dir) || resolveTarget(clamped, -dir);
    if (!found) { teardownTour(); return; }

    tour.i = found.i;
    tour.target = found.node;
    tour.hl = highlightNode(found.node);
    var step = STEPS[found.i];

    tour.card.querySelector("#nwtourCount").textContent = "Step " + (found.i + 1) + " of " + STEPS.length;
    tour.card.querySelector("#nwtourTitle").textContent = step.title;
    tour.card.querySelector("#nwtourBody").textContent = step.body;
    var backBtn = tour.card.querySelector(".nwtour__back");
    var nextBtn = tour.card.querySelector(".nwtour__next");
    backBtn.disabled = found.i === 0;
    nextBtn.textContent = found.i === STEPS.length - 1 ? "Finish" : "Next";

    // scroll the highlight into view, then position spotlight + card
    try { tour.hl.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }); }
    catch (e) { tour.hl.scrollIntoView(); }
    setTimeout(reposition, reduce ? 0 : 320);
    reposition();

    // move focus to Next so keyboard + ESC are reachable
    if (nextBtn && nextBtn.focus) nextBtn.focus();
  }

  function reposition() {
    if (!tour || !tour.hl) return;
    var r = tour.hl.getBoundingClientRect();
    var pad = 8;
    var top = Math.max(pad, r.top - pad);
    var left = Math.max(pad, r.left - pad);
    var width = Math.min(window.innerWidth - left - pad, r.width + pad * 2);
    var height = r.height + pad * 2;
    var s = tour.spot.style;
    s.top = top + "px";
    s.left = left + "px";
    s.width = width + "px";
    s.height = height + "px";

    // place card: below the target if room, else above, else pinned to bottom
    var card = tour.card;
    var ch = card.offsetHeight || 180;
    var cw = Math.min(card.offsetWidth || 340, window.innerWidth - 24);
    var belowSpace = window.innerHeight - (top + height);
    var cardTop, cardLeft;
    if (belowSpace > ch + 24) cardTop = top + height + 12;
    else if (top > ch + 24) cardTop = top - ch - 12;
    else cardTop = window.innerHeight - ch - 16;
    cardLeft = Math.min(Math.max(12, left), window.innerWidth - cw - 12);
    card.style.top = Math.max(12, cardTop) + "px";
    card.style.left = cardLeft + "px";
  }

  function teardownTour() {
    if (!tour) return;
    document.removeEventListener("keydown", onTourKey, true);
    window.removeEventListener("resize", reposition, true);
    window.removeEventListener("scroll", reposition, true);
    tour.overlay.remove();
    var lf = tour.lastFocus;
    tour = null;
    if (lf && lf.focus) { try { lf.focus(); } catch (e) {} }
  }

  /* ===================== THEME TOGGLE ===================== */
  function initTheme() {
    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    function current() {
      return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    }
    function sync() { btn.setAttribute("aria-checked", current() === "dark" ? "true" : "false"); }
    sync();
    btn.addEventListener("click", function () {
      var next = current() === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("nw_theme", next); } catch (e) {}
      sync();
    });
  }

  /* ===================== WIRING ===================== */
  function init() {
    initTheme();
    // relaunch buttons inside the Start Here section
    ["startTourBtn", "startTourBtn2"].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) b.addEventListener("click", function () { if (!tour) startTour(); });
    });

    // first-entry popup, only if never seen before
    var seen = false;
    try { seen = localStorage.getItem(STORAGE_KEY) === "1"; } catch (e) {}
    if (!seen) setTimeout(function () { if (!tour && !popupOpen) buildPopup(); }, 600);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // expose a tiny hook for manual relaunch / testing
  window.NWTour = { start: startTour, openPopup: buildPopup };
})();
