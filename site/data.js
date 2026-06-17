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
