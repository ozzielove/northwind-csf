# Third-Party / Vendor Security Risk Questionnaire

**Purpose:** Assess the security posture of vendors before onboarding, per CSF **GV.SC-01**, 800-53 **SR-3**, ISO 27001 **A.5.19/A.5.21**, SOC 2 **CC9.2**, and HIPAA **§164.308(b)**.

> **Format:** Sections A–D are aligned to **SIG Lite** domains (Compliance, Access Control, Data Security, Operations/Resilience, Supplier) and map cleanly to **CAIQ** control families, so responses can be exported to either industry standard. For a fully worked example of this questionnaire run end-to-end against a vendor, see `vendor_assessment_example_MedStream.md`.

**Vendor:** ______________________  **Date:** ____________  **Reviewer (GRC):** ____________
**Data accessed:** ☐ None ☐ Confidential ☐ **ePHI (BAA required)**
**Inherent-risk tier (set at intake, before controls):** ☐ T1 Critical ☐ T2 High ☐ T3 Moderate ☐ T4 Low

---

## Section A — Company & compliance *(SIG: Compliance)*

| # | Question | Response | Evidence |
|---|----------|----------|----------|
| A1 | Do you hold a current SOC 2 Type II report? | | Report date: ____ |
| A2 | Are you ISO/IEC 27001 certified? | | Cert # ____ |
| A3 | If handling ePHI, will you sign a Business Associate Agreement (BAA)? | | |
| A4 | Have you had a reportable breach in the last 24 months? | | |

## Section B — Access control & data protection *(SIG: Access Control, Data Security)*

| # | Question | Response | Risk weight |
|---|----------|----------|:-----------:|
| B1 | Is MFA enforced for all administrative access? | | High |
| B2 | Is customer data encrypted at rest and in transit? | | High |
| B3 | Is access granted on a least-privilege basis with periodic reviews? | | Medium |
| B4 | How is data segregated between customers? | | Medium |

## Section C — Operations & resilience *(SIG: Threat Mgmt, Incident Mgmt, BC/DR)*

| # | Question | Response | Risk weight |
|---|----------|----------|:-----------:|
| C1 | Do you maintain a tested incident response plan? | | High |
| C2 | What are your breach-notification timelines to customers? | | High |
| C3 | Are backups performed and restoration tested? | | Medium |
| C4 | Do you perform regular vulnerability scanning / pen testing? | | Medium |

## Section D — Subprocessors *(SIG: Supplier / Fourth-Party)*

| # | Question | Response |
|---|----------|----------|
| D1 | Do you use subprocessors that will touch our data? List them. | |
| D2 | Do you flow down equivalent security requirements to them? | |

---

## Section E — SOC 2 / attestation report review *(required for T1–T2 vendors)*

Do **not** rely on a "Yes, we have a SOC 2" checkbox — review the report itself.

| # | Review item | Finding |
|---|-------------|---------|
| E1 | Report type (SOC 2 **Type II** preferred over Type I) | |
| E2 | TSC scope (Security required; Availability/Confidentiality as applicable) | |
| E3 | Report period current (within last 12 months)? Bridge letter for any gap? | |
| E4 | Auditor opinion (unqualified / qualified) | |
| E5 | **Exceptions / deviations** noted by the auditor | |
| E6 | **Complementary User Entity Controls (CUECs)** we must implement on our side | |

> If no SOC 2 exists, escalate review depth: request ISO 27001 SoA, pen-test summary, or a completed SIG Full.

---

## Vendor risk scoring (inherent-risk tiering by data sensitivity)

Tier is set on **inherent risk at intake** — what could go wrong *before* crediting the vendor's controls — which drives how much assessment effort the vendor warrants (risk-based, not one-size-fits-all).

| Tier | Criteria | Assessment depth | Default decision path |
|------|----------|------------------|------------------------|
| **T1 — Critical** | Production access to ePHI/PII or to our production systems | Full questionnaire + SOC 2 review + BAA + annual reassessment | Escalate; no data flow until BAA + critical gaps close |
| **T2 — High** | Confidential (non-PHI) data or limited production access | Full questionnaire + SOC 2 review | Approve with conditions / remediation plan |
| **T3 — Moderate** | Internal-only data, no production access | Lightweight questionnaire (Sections A–B) | Approve with attestation |
| **T4 — Low** | Public data, no integration | Attestation only | Approve |

**Reviewer determination:** ☐ Approve ☐ Approve with conditions ☐ Reject
**Notes / required remediations:** ___________________________________________
