# Claim Matrix — résumé claim → evidence

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
| 7 | Control crosswalk / gap analysis | Posture blurbs; deliverable #12 | — | Portfolio | "Current vs target, phased to Tier 3" | Simulated |
| 8 | Risk assessment methodology | Risk matrix; `risk_register.csv` | `GET /api/risks` | Portfolio + Backend | "Likelihood × impact, owned + treated" | Simulated risks |
| 9 | Risk register | 10 risks | `GET /api/risks?minScore=12` | Portfolio + Backend | "Top-right quadrant = highest loss" | Simulated |
| 10 | Control testing (design vs operating) | 5 tests; `control_tests.csv` | — | Portfolio | "IR plan passes design, fails operation" | Readiness testing |
| 11 | Audit findings / readiness / evidence | Findings report (#06); evidence log (#09) | `GET /api/evidence` | Portfolio + Backend | "9 evidence items mapped to controls" | Simulated artifacts |
| 12 | POA&M remediation tracking | Gantt; `poam.csv` | — | Portfolio | "10 items, owners, dates, sequencing" | Simulated plan |
| 13 | TPRM / tiered vendor / SIG / CAIQ / SOC 2 review | Vendors section | `POST /api/vendor-tier` | Portfolio + Backend | "simulated ePHI + production-like access → Tier 1, BAA review required" | Simulated TPRM demo |
| 14 | NIST IR lifecycle | TEST-04 (IR-8); POAM-004 tabletop | — | Portfolio (light) | "IR plan → test → lessons learned" | Simulated; not a real incident |
| 15 | Python, file parsing, regex, JSON, CSV | `score_maturity.py`, `validate_crosswalk.py` | `npm test` (27) | Script | "CSV → KPI JSON; regex ID validation" | Portfolio tooling |
| 16 | Bash | `scripts/run_demo.sh` | — | Script | "One-shot offline demo" | Light script |
| 17 | Git version control | repo history | — | Documentation | "Versioned, branchable" | — |
| 18 | Technical & executive report writing, policy, SOPs | README, CLAIM_MATRIX, DEMO_SCRIPT, deliverables #06/#08 | — | Documentation | "The deliverable form of expository writing" | Portfolio docs |
| 19 | Google Cybersecurity Cert (June 2026) | Transferable section | — | Coursework | "Foundational SIEM/log/triage" | Beginner-level; not production SOC |
| 20 | Splunk / Chronicle / Suricata; SIEM, log review, triage | Transferable section; Detect findings | — | Coursework exposure | "What a SIEM would catch for DE.AE-02" | Coursework, **not** production tooling |
| 21 | 4+ yrs federally-audited ops; OSHA/EPA support; 50+ RCA | Transferable section | — | Prior operations | "RCA → finding → root cause → corrective action → POA&M" | Not cybersecurity employment |
| 22 | SAP S/4HANA | (not in this repo) | — | Prior operations | "ERP/tool exposure from prior ops" | Prior ops only; not used here |
| 23 | Army National Guard veteran | Transferable section | — | Military | "Mission discipline, documentation rigor" | Context, not a technical claim |
| 24 | PCI DSS | — | — | **Not yet evidenced** | Name only; would add a cardholder-data scope artifact | No artifact in repo |
| 25 | OWASP Top 10 | — | — | **Not yet evidenced** | Name only; would add an app-sec finding set | No artifact in repo |
| 26 | NIST RMF | — | — | **Not yet evidenced** (adjacent to the CSF work) | Would add a categorize→authorize artifact | No standalone RMF artifact |
| 27 | SQL filters and joins | — | — | **Not yet evidenced** | Would add a `.sql` query over the register | No SQL artifact (CSV/JSON only) |

## Not-yet-evidenced summary (be upfront in interviews)
PCI DSS, OWASP Top 10, NIST RMF (standalone), and SQL are listed on the résumé as skills but have
**no artifact in this repo**. Present them as coursework/skill exposure, or add a small artifact
before claiming them as demonstrated. ISO / SOC 2 / HIPAA appear only as a **readiness
crosswalk** — never as a compliance attestation. HITRUST is not evidenced in this repo as a row-level mapping.
