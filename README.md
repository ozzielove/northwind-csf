# GRC Portfolio — NIST CSF 2.0 Security Assessment

**Author:** Ozirus B. Morency
**Type:** Governance, Risk & Compliance (GRC) portfolio project — *simulated assessment of a fictional organization for demonstration purposes (no real client data).*
**Frameworks:** NIST CSF 2.0 · NIST SP 800-53 Rev 5 · NIST RMF · ISO/IEC 27001:2022 Annex A · SOC 2 (Trust Services Criteria) · HIPAA Security Rule

---

## What this project demonstrates

A complete, end-to-end **governance, risk, and compliance assessment** of a fictional healthcare-SaaS company — *Northwind Health Systems* — performed the way an entry-level **GRC Analyst / Compliance Analyst / Risk & Controls Analyst** does the work day to day:

1. **Scoped** the assessment and defined the regulatory drivers (HIPAA, SOC 2, ISO 27001).
2. **Assessed controls** against the **NIST Cybersecurity Framework (CSF) 2.0** — all six Functions: **Govern, Identify, Protect, Detect, Respond, Recover**.
3. **Mapped controls across frameworks** (CSF → 800-53 → ISO 27001 Annex A → SOC 2 TSC → HIPAA) — a control crosswalk, the single most common GRC daily task.
4. **Conducted a risk assessment** scoring each risk by **likelihood × impact** in a **risk register**.
5. **Documented audit findings** in formal finding format (Condition / Criteria / Cause / Effect / Recommendation).
6. **Built a remediation plan** as a **Plan of Action & Milestones (POA&M)**.
7. **Drafted a security policy** and a **third-party/vendor risk questionnaire**.
8. **Collected audit evidence** and logged it for auditor review.
9. **Automated CSF maturity scoring** with a Python script.

> In a production environment these deliverables would be tracked in a GRC platform such as **RSA Archer**, **ServiceNow GRC**, **AuditBoard**, **Vanta**, or **Drata**. This portfolio reproduces the same artifacts in open formats (Markdown / CSV / Python) so the methodology is fully auditable.

---

## Repository structure

| Path | Deliverable | GRC competency shown |
|------|-------------|----------------------|
| `01_scope/assessment_scope_statement.md` | Scope statement | Scoping, regulatory analysis |
| `02_controls/nist_csf_2.0_controls_checklist.md` | CSF 2.0 control checklist | Control assessment |
| `02_controls/crosswalk_csf_to_800-53_iso27001_soc2.md` | Multi-framework control library (CSF→800-53→ISO 27001→SOC 2 TSC→HITRUST→HIPAA) + ITGC tagging | **Control mapping** |
| `02_controls/control_test_plan.csv` | Control test plan (design vs. operating effectiveness) | **Control testing** |
| `02_controls/gap_analysis.md` | Current-state-vs-target gap analysis + roadmap | **Gap analysis** |
| `03_risk/risk_assessment_methodology.md` | Risk methodology | Risk methodology |
| `03_risk/risk_register.csv` | Risk register (scored) | **Risk assessment** |
| `04_findings/audit_findings_report.md` | 6 audit findings + audit-readiness close-the-loop matrix | Findings documentation |
| `05_remediation/poam.csv` | Plan of Action & Milestones | Remediation tracking |
| `06_policies/information_security_policy.md` | Security policy | Policy authoring |
| `07_vendor_risk/vendor_risk_questionnaire.md` | Vendor risk questionnaire (SIG/CAIQ-aligned, 4-tier) | Third-party risk |
| `07_vendor_risk/vendor_assessment_example_MedStream.md` | Worked vendor assessment (intake→tier→SOC 2 review→decision) | **TPRM workflow** |
| `07_vendor_risk/inbound_security_questionnaire_response.md` | Inbound CAIQ/SIG-Lite response | **Security questionnaire response** |
| `evidence/evidence_collection_log.md` | Evidence log | Audit evidence collection |
| `scripts/csf_maturity_score.py` | CSF maturity scorer + GRC KPI dashboard | Automation (Python) |

---

## How to run the maturity scorer

```bash
cd Projects/grc-nist-csf-assessment
python3 scripts/csf_maturity_score.py 02_controls/csf_scores.csv
```

Outputs per-Function maturity (NIST CSF Tier 1–4), an overall program maturity score with a text dashboard, **and** — when the POA&M and evidence artifacts are present — a one-page **GRC KPI summary** (open findings by severity, POA&M past-due count, remediation status, evidence freshness) of the kind reported to leadership.

---

## GRC platform fluency (manual process → tooling equivalents)

This portfolio implements the GRC workflow in open formats (Markdown / CSV / Python) so the methodology is fully transparent and auditable. The same artifacts are what enterprise **GRC platforms** automate — the mapping below shows the equivalence, i.e. that the *process* is understood independent of any one tool:

| This repo (manual GRC process) | Platform equivalent | Platform category |
|--------------------------------|---------------------|-------------------|
| `risk_register.csv` | Risk module / risk register | ServiceNow IRM, RSA Archer, LogicGate |
| `crosswalk_*.md` (control library) | Authority Documents / control mappings | AuditBoard, Hyperproof, OneTrust |
| `control_test_plan.csv` | Control testing & test workpapers | AuditBoard, Workiva |
| `poam.csv` | Findings / remediation workflow | ServiceNow IRM, Archer |
| `evidence_collection_log.md` | Continuous evidence collection | Vanta, Drata, Secureframe |
| `vendor_risk_questionnaire.md` + worked example | Third-party risk module | OneTrust, ProcessUnity, BitSight |
| `csf_maturity_score.py` (KPI dashboard) | Compliance dashboards / reporting | All of the above |

> **Honest framing:** this demonstrates understanding of *how GRC tooling structures the work*, built as a manual GRC process. It is **not** a claim of administering any of these platforms in production.

---

## Skills demonstrated (resume keywords)

`Governance, Risk & Compliance (GRC)` · `Risk Assessment` · `Risk Register` · `Gap Analysis` · `NIST Cybersecurity Framework (CSF) 2.0` · `NIST SP 800-53 Rev 5` · `NIST RMF` · `ISO/IEC 27001:2022` · `SOC 2 (Trust Services Criteria)` · `HITRUST CSF` · `HIPAA Security Rule` · `Control Mapping / Framework Crosswalk` · `Control Library` · `Control Testing (design vs. operating effectiveness)` · `Audit Evidence Collection` · `Audit Readiness` · `Plan of Action & Milestones (POA&M)` · `Remediation Tracking` · `Third-Party / Vendor Risk Management (TPRM)` · `SIG / CAIQ` · `Security Questionnaire Response` · `Security Policy Development` · `ITGC` · `Regulatory Compliance` · `Python Automation`

---

## About the author

Career-changer into GRC with **directly transferable, verified audit and risk experience**:
- Supported **4 annual federal audits (OSHA, EPA)** with 100% compliance at Air Liquide Advanced Materials.
- Led **50+ root cause analysis (RCA) investigations** — the same investigate-document-remediate loop GRC findings require.
- **Developed SOPs** and trained 20 technicians — policy authoring and control-procedure development.
- Google Cybersecurity Professional Certificate (2026); B.S. Cybersecurity in progress (SNHU); U.S. Army veteran.
