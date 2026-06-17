# Assessment Scope Statement

**Engagement:** NIST CSF 2.0 Security & Compliance Assessment
**Organization (fictional):** Northwind Health Systems, Inc.
**Assessor:** Ozirus B. Morency, GRC Analyst (portfolio engagement)
**Assessment period:** Q2 2026
**Document status:** Final v1.0

---

## 1. Organization profile

Northwind Health Systems is a 140-employee healthcare **Software-as-a-Service (SaaS)** company providing a cloud-based patient-intake and scheduling platform to small medical practices. The platform stores and processes **electronic Protected Health Information (ePHI)**, runs on AWS, and integrates with third-party payment and EHR vendors.

Because Northwind handles ePHI for covered entities and sells to enterprise customers, it is subject to — or contractually required to demonstrate — the following:

| Driver | Why it applies |
|--------|----------------|
| **HIPAA Security Rule** | Stores/processes ePHI as a Business Associate |
| **SOC 2 Type II** | Enterprise customers require it before purchase |
| **ISO/IEC 27001:2022** | Targeted for EU market expansion |
| **NIST CSF 2.0** | Selected as the organizing framework for the security program |

## 2. Purpose

Establish a baseline of Northwind's cybersecurity posture against **NIST CSF 2.0**, identify control gaps, quantify risk, and produce a prioritized remediation roadmap that simultaneously advances HIPAA, SOC 2, and ISO 27001 readiness.

## 3. In scope

- The Northwind production SaaS environment (AWS: EC2, RDS, S3, IAM).
- Corporate IT (identity, endpoints, email, VPN).
- Governance artifacts: policies, risk management process, vendor management.
- All six **NIST CSF 2.0 Functions**: Govern (GV), Identify (ID), Protect (PR), Detect (DE), Respond (RS), Recover (RC).

## 4. Out of scope

- Penetration testing / active exploitation (assessment is control- and evidence-based).
- Physical security of AWS data centers (inherited from AWS; covered by AWS SOC 2 report).
- Source-code review of the application.

## 5. Methodology

1. **Information gathering** — policy review, interviews, configuration review, evidence collection.
2. **Control assessment** — score each in-scope CSF 2.0 subcategory on a 0–4 implementation scale.
3. **Crosswalk** — map assessed controls to 800-53 Rev 5, ISO 27001 Annex A, SOC 2 TSC, and HIPAA citations.
4. **Risk assessment** — identify risks from control gaps; score likelihood × impact.
5. **Findings & reporting** — document findings; build POA&M.

## 6. Assessment scale

| Score | NIST CSF Tier | Meaning |
|-------|---------------|---------|
| 0 | — | Not implemented |
| 1 | Tier 1 – Partial | Ad hoc, undocumented |
| 2 | Tier 2 – Risk Informed | Approved but inconsistently applied |
| 3 | Tier 3 – Repeatable | Documented, consistently applied |
| 4 | Tier 4 – Adaptive | Continuously improved, metrics-driven |

## 7. Deliverables

Control checklist · multi-framework crosswalk · risk register · audit findings report · POA&M · security policy · vendor risk questionnaire · evidence log · maturity score.

## 8. Assumptions & limitations

This is a **simulated portfolio engagement** using fictional data. Evidence artifacts are representative samples created to demonstrate methodology, not real organizational records.
