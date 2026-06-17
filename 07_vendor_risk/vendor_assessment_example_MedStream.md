# Vendor Risk Assessment — Worked Example (End-to-End)

**Vendor:** MedStream Analytics, Inc. *(fictional)*
**Service:** Cloud claims-analytics platform; ingests de-identified + identifiable claims data
**Assessed by:** Ozirus B. Morency, GRC Analyst — Q2 2026
**Process reference:** CSF GV.SC-01 · 800-53 SR-3 · ISO 27001 A.5.19/A.5.21 · SOC 2 CC9.2 · HIPAA §164.308(b)

> This document walks a single fictional vendor through the **full TPRM lifecycle** — intake → tiering → questionnaire → SOC 2 report review → gap identification → remediation → decision — to demonstrate the workflow end to end. It complements the blank intake form in `vendor_risk_questionnaire.md`.

---

## Step 1 — Intake & data classification

| Field | Value |
|-------|-------|
| Business sponsor | VP, Operations |
| Service description | SaaS analytics over claims data |
| Data accessed | **ePHI** (member name, DOB, claim detail) |
| Access method | API + SSO into vendor portal |
| Subprocessors | AWS (hosting), Snowflake (warehouse) |

**Data classification:** ePHI → **BAA required** before any data flows.

## Step 2 — Inherent-risk tiering (by data sensitivity)

Tier is set on **inherent risk** — what could go wrong before considering the vendor's controls.

| Tier | Definition | Example |
|------|-----------|---------|
| **Tier 1 — Critical** | Production access to ePHI/PII or to Northwind production systems | **← MedStream lands here** |
| Tier 2 — High | Confidential (non-PHI) data or limited production access | Payroll SaaS |
| Tier 3 — Moderate | Internal-only data, no production access | Marketing analytics |
| Tier 4 — Low | Public data, no integration | Stock-image service |

**MedStream = Tier 1 (Critical)** → full assessment, SOC 2 report review, BAA, and annual reassessment required. (Tier 3–4 vendors get a lightweight attestation only — risk-based effort.)

## Step 3 — Questionnaire (SIG-aligned) — key responses

Issued the Section A–D questionnaire (`vendor_risk_questionnaire.md`), structured along **SIG Lite** domains.

| SIG domain | Question | MedStream response | Assessor note |
|------------|----------|--------------------|----------------|
| Compliance | SOC 2 Type II held? | Yes — report dated 2025-11 | Obtain & review (Step 4) |
| Compliance | ISO 27001 certified? | No | Acceptable given SOC 2 |
| Compliance | Sign BAA? | Yes | Route to Legal |
| Access control | MFA on admin access? | Yes | Confirmed in SOC 2 |
| Data protection | Encryption at rest + transit? | Yes (AES-256 / TLS 1.2+) | Confirmed |
| Resilience | Tested IR plan? | Yes — annual tabletop | Confirmed in SOC 2 |
| Resilience | Breach-notification SLA? | **72 hours** | **Gap — Northwind requires ≤48h for ePHI** |
| Subprocessors | Flow-down to subprocessors? | Yes | Snowflake/AWS both SOC 2 |

## Step 4 — SOC 2 Type II report review

Reviewed MedStream's SOC 2 Type II (period 2024-11 → 2025-10):

| Review item | Finding |
|-------------|---------|
| Scope | Security + Availability + Confidentiality TSC — **adequate** |
| Auditor / opinion | Independent CPA firm; **unqualified** opinion |
| Report period | 12 months, current (within 12 mo) — **acceptable** |
| Exceptions noted | **1 exception** — CC6.2: 2 terminated users not deprovisioned within SLA |
| Complementary User Entity Controls (CUECs) | 4 CUECs — Northwind must enforce SSO, manage its own API keys, review access quarterly, report incidents within 24h |
| Bridge letter | Requested to cover gap from 2025-10 to onboarding date |

## Step 5 — Gap register & remediation

| # | Gap | Source | Risk | Remediation | Owner | Status |
|---|-----|--------|------|-------------|-------|--------|
| V-1 | Breach-notification SLA 72h vs required 48h | Questionnaire | HIPAA timeline pressure | Negotiate 48h ePHI clause into BAA | Legal | Open |
| V-2 | SOC 2 CC6.2 deprovisioning exception | SOC 2 review | Lingering access | Obtain remediation evidence + monitor next report | GRC | Open |
| V-3 | CUECs not yet implemented at Northwind | SOC 2 review | Shared-responsibility gap | Implement 4 CUECs before go-live | IT Lead | Open |
| V-4 | BAA not yet executed | Intake | No HIPAA contract | Execute BAA prior to data flow | Legal | Open |

## Step 6 — Risk decision

**Determination: ☑ Approve with conditions.**
Tier-1 vendor with a credible, unqualified SOC 2 Type II; residual risk is acceptable **conditioned on** (1) executed BAA with a 48-hour ePHI breach clause, (2) the four CUECs implemented and evidenced, and (3) the CC6.2 exception remediation confirmed. **No ePHI flows until V-1 and V-4 close.** Reassessment: annual, or on a new SOC 2 report / material breach.

> **Close-the-loop:** this vendor's gaps feed Northwind's own program — V-3 (CUECs) maps back to internal controls PR.AA-01/PR.AA-05, and the vendor-program stand-up itself is Finding 6 / POAM-006.
