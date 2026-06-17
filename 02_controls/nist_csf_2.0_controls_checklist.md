# NIST CSF 2.0 Control Assessment Checklist

**Organization:** Northwind Health Systems (fictional)
**Framework:** NIST Cybersecurity Framework 2.0 (2024)
**Scale:** 0 = Not implemented · 1 = Partial · 2 = Risk Informed · 3 = Repeatable · 4 = Adaptive

> NIST CSF 2.0 introduced the **Govern (GV)** Function. This assessment covers all six Functions. Scores feed `scripts/csf_maturity_score.py` via `csf_scores.csv`.

---

## GV — Govern

| ID | Subcategory (abbreviated) | Score | Notes |
|----|---------------------------|:-----:|-------|
| GV.OC-01 | Organizational mission and cyber role understood | 2 | Mission clear; cyber role informally defined |
| GV.RM-01 | Risk management objectives established | 1 | No formal risk appetite statement |
| GV.RR-02 | Security roles & responsibilities assigned | 2 | One IT lead wears multiple hats; no RACI |
| GV.PO-01 | Cybersecurity policy established | 1 | Policies outdated, not version-controlled |
| GV.SC-01 | Supply chain risk management program | 1 | Vendors onboarded with no security review |

## ID — Identify

| ID | Subcategory | Score | Notes |
|----|-------------|:-----:|-------|
| ID.AM-01 | Hardware inventory maintained | 2 | Spreadsheet, not reconciled |
| ID.AM-02 | Software inventory maintained | 1 | No SBOM / software inventory |
| ID.AM-05 | Assets prioritized by criticality | 2 | ePHI systems known but not formally classified |
| ID.RA-01 | Vulnerabilities identified & documented | 2 | Quarterly scans; no formal tracking |
| ID.RA-05 | Risk responses prioritized | 1 | No risk register before this assessment |

## PR — Protect

| ID | Subcategory | Score | Notes |
|----|-------------|:-----:|-------|
| PR.AA-01 | Identities & credentials managed | 2 | MFA on email; not enforced on AWS root |
| PR.AA-05 | Access permissions follow least privilege | 1 | Broad IAM permissions; shared admin acct |
| PR.DS-01 | Data-at-rest protected | 3 | RDS/S3 encryption enabled |
| PR.DS-02 | Data-in-transit protected | 3 | TLS 1.2+ enforced |
| PR.AT-01 | Security awareness training delivered | 1 | Onboarding only; no annual refresh |

## DE — Detect

| ID | Subcategory | Score | Notes |
|----|-------------|:-----:|-------|
| DE.CM-01 | Networks & systems monitored | 2 | CloudTrail on; logs not reviewed |
| DE.CM-09 | Computing hardware/software monitored | 1 | No EDR on endpoints |
| DE.AE-02 | Detected events analyzed | 1 | No SIEM / alert triage process |

## RS — Respond

| ID | Subcategory | Score | Notes |
|----|-------------|:-----:|-------|
| RS.MA-01 | Incident response plan executed | 1 | IR plan drafted, never tested |
| RS.CO-02 | Incidents reported per criteria | 2 | Ad hoc; HIPAA breach-notification untested |
| RS.AN-03 | Incident analysis performed | 1 | No forensics capability |

## RC — Recover

| ID | Subcategory | Score | Notes |
|----|-------------|:-----:|-------|
| RC.RP-01 | Recovery plan executed | 2 | Backups exist; restore never tested |
| RC.CO-03 | Recovery activities communicated | 1 | No defined stakeholder comms plan |

---

## Function summary

| Function | Avg score | Tier |
|----------|:---------:|------|
| Govern (GV) | 1.4 | Tier 1–2 |
| Identify (ID) | 1.6 | Tier 1–2 |
| Protect (PR) | 2.0 | Tier 2 |
| Detect (DE) | 1.3 | Tier 1 |
| Respond (RS) | 1.3 | Tier 1 |
| Recover (RC) | 1.5 | Tier 1–2 |
| **Overall** | **1.5** | **Tier 1–2 (Risk Informed, inconsistent)** |

**Lowest-maturity Functions (priority): Detect and Respond.**
