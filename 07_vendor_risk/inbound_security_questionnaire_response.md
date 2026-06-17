# Inbound Security Questionnaire — Response (CAIQ / SIG-Lite)

**Responding entity:** Northwind Health Systems (fictional)
**Requested by:** Prospective customer (enterprise payer) security/procurement team
**Prepared by:** Ozirus B. Morency, GRC Analyst — Q2 2026
**Format:** CAIQ-style (CSA Consensus Assessments Initiative Questionnaire) Yes/No/N-A + compensating-control notes, cross-referenced to SIG Lite domains.

> The *outbound* questionnaire (`vendor_risk_questionnaire.md`) is what Northwind sends to **its** vendors. This document is the mirror task — **responding** to a customer's due-diligence questionnaire about Northwind. Answering inbound SIG/CAIQ requests is an explicitly named GRC daily duty. Responses below are written **honestly against this assessment's actual posture**, including open gaps — a real questionnaire response that hid known findings would be a misrepresentation.

---

## Section 1 — Governance, Risk & Compliance (SIG: Risk Mgmt, Compliance)

| ID | Question | Response | Notes / compensating control |
|----|----------|:--------:|------------------------------|
| GRC-01 | Do you maintain a documented information security policy reviewed at least annually? | **Yes** | Policy in `06_policies/`; annual review cycle defined |
| GRC-02 | Do you perform a formal risk assessment at least annually? | **Yes** | Risk register + methodology; likelihood × impact scoring |
| GRC-03 | Do you have a documented risk-appetite statement? | **No** | *Gap* — POAM-010 open; ratification scheduled |
| GRC-04 | Do you align to a recognized framework (NIST CSF, ISO 27001, SOC 2)? | **Yes** | NIST CSF 2.0 spine; multi-framework crosswalk maintained |
| GRC-05 | Do you hold a current SOC 2 Type II or ISO 27001 certification? | **No** | *In progress* — Type II readiness self-assessment complete; remediation in flight (POA&M) |

## Section 2 — Access Control & Authentication (SIG: Access Control)

| ID | Question | Response | Notes / compensating control |
|----|----------|:--------:|------------------------------|
| AC-01 | Is MFA enforced on all administrative/privileged access? | **No** | *Gap* — Finding 1 / POAM-001; remediation due 2026-07 |
| AC-02 | Is access granted on least-privilege with periodic reviews? | **No** | *Gap* — Finding 2 / POAM-002; RBAC + quarterly reviews planned |
| AC-03 | Are unique user IDs assigned (no shared accounts)? | **Partial** | Shared root in remediation (POAM-001); app users are unique |
| AC-04 | Is SSO supported for customer integrations? | **Yes** | SAML/OIDC available |

## Section 3 — Data Protection (SIG: Data Security)

| ID | Question | Response | Notes / compensating control |
|----|----------|:--------:|------------------------------|
| DP-01 | Is data encrypted at rest? | **Yes** | AES-256 (RDS/S3); EV-003 |
| DP-02 | Is data encrypted in transit? | **Yes** | TLS 1.2+ enforced |
| DP-03 | Is customer/tenant data logically segregated? | **Yes** | Per-tenant isolation |
| DP-04 | Do you sign a BAA for ePHI? | **Yes** | Standard for all ePHI engagements |

## Section 4 — Detection & Response (SIG: Threat Mgmt, Incident Mgmt)

| ID | Question | Response | Notes / compensating control |
|----|----------|:--------:|------------------------------|
| IR-01 | Do you have centralized logging and monitoring (SIEM)? | **No** | *Gap* — Finding 3 / POAM-003; CloudTrail enabled, SIEM deployment in flight |
| IR-02 | Do you have a documented incident response plan? | **Yes** | IR plan exists (EV-006) |
| IR-03 | Is the IR plan tested at least annually? | **No** | *Gap* — Finding 4 / POAM-004; first tabletop scheduled |
| IR-04 | What is your breach-notification commitment? | **Yes** | Per HIPAA §164.408 (≤60 days); contractual SLAs negotiable |
| IR-05 | Do you deploy endpoint detection (EDR)? | **No** | *Gap* — R-005 / POAM-008 |

## Section 5 — Resilience & Third-Party (SIG: BC/DR, Supplier)

| ID | Question | Response | Notes / compensating control |
|----|----------|:--------:|------------------------------|
| BC-01 | Are backups performed and encrypted? | **Yes** | Automated daily backups |
| BC-02 | Is backup restoration tested? | **No** | *Gap* — R-008 / POAM-007; restore test scheduled |
| TP-01 | Do you assess your own subprocessors/vendors? | **Partial** | Program stand-up in progress (Finding 6 / POAM-006) |
| TP-02 | Do you provide security awareness training to staff? | **No** | *Gap* — Finding 5 / POAM-005 |

---

## Summary for the requesting customer

Northwind is an **early-stage program** operating at NIST CSF **Tier 2 (Risk Informed)** overall, with strong data-encryption controls and documented policy/risk processes, but **open gaps in access control, detection, and response** that are tracked in a formal POA&M with assigned owners and dates. We are transparent about these items rather than overstating posture. A current POA&M extract and (when available) a SOC 2 bridge letter can be provided under NDA on request.

> **GRC competency shown:** answering inbound due-diligence honestly, mapping every "No" to a tracked remediation item, and distinguishing *gap* from *compensating control* — the core of vendor-facing GRC work.
