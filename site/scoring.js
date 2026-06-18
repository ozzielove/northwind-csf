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
