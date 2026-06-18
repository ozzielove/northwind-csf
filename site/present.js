/* ============================================================================
   present.js - "Guided Presentation" mode for the live demo (presenter cue cards).
   Sibling of tour.js: same dependency-free vanilla JS house style, same coachmark
   engine, but aimed at the PRESENTER instead of a newcomer. Each step targets a
   real demo control, surfaces a SAY line (what to say) and a DO line (what to
   click), and offers an optional "Run probe" button that fires the real demo
   handler so live JSON appears mid-sentence while the presenter keeps pacing.

   Additive only: does not touch window.GRC, #apistat, the reveal observer, or any
   app.js demo handler. "Run probe" merely dispatches a click on an existing control.
   No emoji, no em/en dashes in any UI copy.
   ========================================================================== */
(function () {
  "use strict";

  var OFFER_KEY = "nw_pres_offer_dismissed"; // sessionStorage: offer again next visit, not while scrolling
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- presenter steps: each targets a real demo control; fire is optional ---- */
  var STEPS = [
    { target: "#demo .section__head",
      title: "Open and frame",
      say: "This is a simulated GRC assessment I built for a fictional healthcare-SaaS company, Northwind Health Systems. Not real client work, not a SOC 2 audit. Every figure traces to a repo artifact, and there is a live API behind it.",
      doit: "Point to the API online badge in the header." },
    { target: '#demoProbes button[data-get="/api/health"]', fire: '#demoProbes button[data-get="/api/health"]',
      title: "Live backend, online",
      say: "This is a live serverless endpoint, not a static mock.",
      doit: "Press Run probe to call /api/health." },
    { target: '#demoProbes button[data-post="/api/score"]', fire: '#demoProbes button[data-post="/api/score"]',
      title: "Recompute the score",
      say: "The backend recomputes from the same repository data and returns 1.57. The headline number is reproducible, not typed in.",
      doit: "Press Run probe." },
    { target: '#demoProbes button[data-explain="scoring"]', fire: '#demoProbes button[data-explain="scoring"]',
      title: "Why 1.57, not 1.53",
      say: "It is weighted by how many subcategories each Function carries, not a flat average. Sum of 36 over 23 subcategories is 1.57. A flat Function-mean would be 1.53.",
      doit: "Press Run probe." },
    { target: '#demoProbes button[data-get="/api/risks?level=Critical"]', fire: '#demoProbes button[data-get="/api/risks?level=Critical"]',
      title: "The critical cluster",
      say: "Ten risks scored likelihood times impact. Three are Critical, led by a shared admin account without MFA.",
      doit: "Press Run probe." },
    { target: '#demoProbes button[data-get="/api/crosswalk?sub=PR.AA-01"]', fire: '#demoProbes button[data-get="/api/crosswalk?sub=PR.AA-01"]',
      title: "One control, four rulebooks",
      say: "One assessed control maps to four frameworks at once: 800-53, ISO 27001:2022, SOC 2, and HIPAA. I do not claim HITRUST row-level mapping, because the repo only exposes four.",
      doit: "Press Run probe." },
    { target: '#demoProbes button[data-get="/api/evidence"]', fire: '#demoProbes button[data-get="/api/evidence"]',
      title: "Evidence, honestly labeled",
      say: "Nine evidence items, every one tagged Simulated or Portfolio. Nothing is presented as real client evidence.",
      doit: "Press Run probe." },
    { target: "#vendorForm", fire: '#vendorForm button[type="submit"]',
      title: "Vendor tiering, server-side",
      say: "A simulated vendor touching ePHI-class data with production-like access is Tier 1, Critical, with a BAA required before data flows. Computed server-side.",
      doit: "Leave the defaults checked and press Run probe to POST the form." },
    { target: "#demoOut",
      title: "Resilient by design",
      say: "If the API is ever down, the page falls back to the bundled data and says so, so every figure still resolves. That is the demo.",
      doit: "Press Finish." }
  ];

  /* ---- small helpers (mirror tour.js) ---- */
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
  // a tour is "busy" if its overlay or first-entry popup is mounted; never collide with it
  function tourBusy() {
    return !!(document.querySelector(".nwtour") || document.querySelector(".nwpop__backdrop"));
  }

  /* ===================== OFFER POPOUT (mirror tour.js buildPopup) ===================== */
  var offerOpen = false;
  function openOffer() {
    if (offerOpen || pres || tourBusy()) return;
    var lastFocus = document.activeElement;
    var back = el("div", "nwpop__backdrop nwpres-offer");
    var modal = el("div", "nwpop", {
      role: "dialog", "aria-modal": "true", "aria-labelledby": "nwpresOfferTitle", "aria-describedby": "nwpresOfferBody"
    });
    modal.innerHTML =
      '<button class="nwpop__x" type="button" aria-label="Close">Close</button>' +
      '<p class="nwpop__eyebrow">Live demo</p>' +
      '<h2 class="nwpop__title" id="nwpresOfferTitle">Presenting? Enter guided presentation.</h2>' +
      '<p class="nwpop__body" id="nwpresOfferBody">I can cue you through the demo step by step - what to say, what to click - while you lead. Or explore on your own.</p>' +
      '<div class="nwpop__actions">' +
      '<button class="probe probe--solid nwpres-offer__go" type="button">Start guided presentation</button>' +
      '<button class="probe nwpres-offer__skip" type="button">Not now</button>' +
      '</div>';
    back.appendChild(modal);
    document.body.appendChild(back);
    offerOpen = true;

    function dismiss() { try { sessionStorage.setItem(OFFER_KEY, "1"); } catch (e) {} }
    function close() {
      if (!offerOpen) return;
      offerOpen = false;
      dismiss();
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
    modal.querySelector(".nwpres-offer__skip").addEventListener("click", close);
    modal.querySelector(".nwpres-offer__go").addEventListener("click", function () {
      close();
      start();
    });

    requestAnimationFrame(function () {
      back.classList.add("is-in");
      var go = modal.querySelector(".nwpres-offer__go");
      if (go) go.focus();
    });
  }

  /* ===================== PRESENTER COACHMARK (clone .nwtour -> .nwpres) ===================== */
  var pres = null; // active presentation state

  function start() {
    if (pres) teardown();
    if (tourBusy()) return; // never run alongside the tutorial tour
    var lastFocus = document.activeElement;

    var overlay = el("div", "nwpres");
    var spot = el("div", "nwpres__spot", { "aria-hidden": "true" });
    var card = el("div", "nwpres__card", {
      role: "dialog", "aria-modal": "true", "aria-labelledby": "nwpresTitle", "aria-describedby": "nwpresSay"
    });
    card.innerHTML =
      '<p class="nwpres__count" id="nwpresCount"></p>' +
      '<h3 class="nwpres__title" id="nwpresTitle"></h3>' +
      '<p class="nwpres__say" id="nwpresSay"></p>' +
      '<p class="nwpres__do" id="nwpresDo"></p>' +
      '<div class="nwpres__controls">' +
      '<button class="probe nwpres__exit" type="button">Exit</button>' +
      '<span class="nwpres__nav">' +
      '<button class="probe nwpres__fire" type="button">Run probe</button>' +
      '<button class="probe nwpres__back" type="button">Back</button>' +
      '<button class="probe probe--solid nwpres__next" type="button">Next</button>' +
      '</span></div>';
    overlay.appendChild(spot);
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    pres = { overlay: overlay, spot: spot, card: card, i: 0, lastFocus: lastFocus, target: null };

    card.querySelector(".nwpres__exit").addEventListener("click", teardown);
    card.querySelector(".nwpres__back").addEventListener("click", function () { go(pres.i - 1); });
    card.querySelector(".nwpres__next").addEventListener("click", function () {
      if (pres.i >= STEPS.length - 1) teardown(); else go(pres.i + 1);
    });
    card.querySelector(".nwpres__fire").addEventListener("click", runProbe);
    document.addEventListener("keydown", onKey, true);
    window.addEventListener("resize", reposition, true);
    window.addEventListener("scroll", reposition, true);

    go(0);
  }

  function runProbe() {
    if (!pres) return;
    var step = STEPS[pres.i];
    if (!step || !step.fire) return;
    var ctl = document.querySelector(step.fire);
    if (ctl) ctl.click(); // reuses the real app.js demo handler; #demoOut updates live
    // keep focus management sane: return focus to the card's Next button
    var nextBtn = pres.card.querySelector(".nwpres__next");
    if (nextBtn && nextBtn.focus) nextBtn.focus();
  }

  function onKey(e) {
    if (!pres) return;
    if (e.key === "Escape") { e.preventDefault(); teardown(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); if (pres.i < STEPS.length - 1) go(pres.i + 1); else teardown(); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(pres.i - 1); }
    else if (e.key === "Tab") {
      var f = focusables(pres.card);
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function resolveTarget(startIdx, dir) {
    var i = startIdx;
    while (i >= 0 && i < STEPS.length) {
      var t = document.querySelector(STEPS[i].target);
      if (t) return { i: i, node: t };
      i += dir;
    }
    return null;
  }

  function go(idx) {
    if (!pres) return;
    var dir = idx >= pres.i ? 1 : -1;
    var clamped = Math.max(0, Math.min(STEPS.length - 1, idx));
    var found = resolveTarget(clamped, dir) || resolveTarget(clamped, -dir);
    if (!found) { teardown(); return; }

    pres.i = found.i;
    pres.target = found.node;
    pres.hl = found.node;
    var step = STEPS[found.i];

    pres.card.querySelector("#nwpresCount").textContent = "Step " + (found.i + 1) + " of " + STEPS.length;
    pres.card.querySelector("#nwpresTitle").textContent = step.title;
    pres.card.querySelector("#nwpresSay").textContent = step.say;
    pres.card.querySelector("#nwpresDo").textContent = step.doit;

    var backBtn = pres.card.querySelector(".nwpres__back");
    var nextBtn = pres.card.querySelector(".nwpres__next");
    var fireBtn = pres.card.querySelector(".nwpres__fire");
    backBtn.disabled = found.i === 0;
    nextBtn.textContent = found.i === STEPS.length - 1 ? "Finish" : "Next";
    // Run probe only shows when this step targets a real, fireable control
    if (step.fire) { fireBtn.hidden = false; fireBtn.disabled = false; }
    else { fireBtn.hidden = true; fireBtn.disabled = true; }

    try { pres.hl.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }); }
    catch (e) { pres.hl.scrollIntoView(); }
    setTimeout(reposition, reduce ? 0 : 320);
    reposition();

    if (nextBtn && nextBtn.focus) nextBtn.focus();
  }

  function reposition() {
    if (!pres || !pres.hl) return;
    var r = pres.hl.getBoundingClientRect();
    var pad = 8;
    var top = Math.max(pad, r.top - pad);
    var left = Math.max(pad, r.left - pad);
    var width = Math.min(window.innerWidth - left - pad, r.width + pad * 2);
    var height = r.height + pad * 2;
    var s = pres.spot.style;
    s.top = top + "px";
    s.left = left + "px";
    s.width = width + "px";
    s.height = height + "px";

    var card = pres.card;
    var ch = card.offsetHeight || 200;
    var cw = Math.min(card.offsetWidth || 360, window.innerWidth - 24);
    var belowSpace = window.innerHeight - (top + height);
    var cardTop, cardLeft;
    if (belowSpace > ch + 24) cardTop = top + height + 12;
    else if (top > ch + 24) cardTop = top - ch - 12;
    else cardTop = window.innerHeight - ch - 16;
    cardLeft = Math.min(Math.max(12, left), window.innerWidth - cw - 12);
    card.style.top = Math.max(12, cardTop) + "px";
    card.style.left = cardLeft + "px";
  }

  function teardown() {
    if (!pres) return;
    document.removeEventListener("keydown", onKey, true);
    window.removeEventListener("resize", reposition, true);
    window.removeEventListener("scroll", reposition, true);
    pres.overlay.remove();
    var lf = pres.lastFocus;
    pres = null;
    if (lf && lf.focus) { try { lf.focus(); } catch (e) {} }
  }

  /* ===================== WIRING ===================== */
  function init() {
    // persistent manual launch button in the #demo section head
    var btn = document.getElementById("startPresBtn");
    if (btn) btn.addEventListener("click", function () { if (!pres && !tourBusy()) start(); });

    // first-entry offer when #demo scrolls into view (once per session, never over a tour)
    var demo = document.getElementById("demo");
    var dismissed = false;
    try { dismissed = sessionStorage.getItem(OFFER_KEY) === "1"; } catch (e) {}
    if (demo && !dismissed && "IntersectionObserver" in window) {
      // #demo is taller than most viewports, so its intersection ratio tops out well
      // below 1.0; a 0.45 threshold can sit right at that ceiling and never fire. Use a
      // lower, reliably reachable threshold so "demo is substantially in view" still triggers.
      var SHOW_AT = 0.3;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && en.intersectionRatio >= SHOW_AT) {
            io.disconnect();
            if (!pres && !offerOpen && !tourBusy()) openOffer();
          }
        });
      }, { threshold: [SHOW_AT, 0.5] });
      io.observe(demo);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // expose a tiny hook for manual launch / testing
  window.NWPresent = { start: start, openOffer: openOffer };
})();
