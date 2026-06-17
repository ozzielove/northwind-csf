# Gap Analysis — Current State vs. Target State

**Organization:** Northwind Health Systems (fictional)
**Framework:** NIST CSF 2.0 (Tiers 0–4)
**Target state:** **Tier 3 — Repeatable** across all six Functions
**Derived from:** `02_controls/csf_scores.csv` (23 subcategories assessed)

> Scoring scale: 0 Not Implemented · 1 Partial · 2 Risk Informed · 3 Repeatable · 4 Adaptive.
> "Gap" = Target (3) − Current. A current-state-vs-target gap analysis is the standard front-end of any GRC roadmap and the deliverable most cited after the crosswalk itself.

---

## 1. Function-level gap summary

| CSF Function | Current avg | Current tier | Target tier | Gap | Priority |
|--------------|:-----------:|--------------|:-----------:|:---:|----------|
| Govern (GV) | 1.40 | Tier 1 — Partial | Tier 3 | **1.60** | High |
| Identify (ID) | 1.60 | Tier 2 — Risk Informed | Tier 3 | 1.40 | Medium |
| Protect (PR) | 2.00 | Tier 2 — Risk Informed | Tier 3 | 1.00 | Medium |
| **Detect (DE)** | **1.33** | Tier 1 — Partial | Tier 3 | **1.67** | **Critical** |
| **Respond (RS)** | **1.33** | Tier 1 — Partial | Tier 3 | **1.67** | **Critical** |
| Recover (RC) | 1.50 | Tier 2 — Risk Informed | Tier 3 | 1.50 | High |
| **Overall program** | **1.57** | **Tier 2 — Risk Informed** | **Tier 3** | **1.43** | — |

**Read:** Detect and Respond are the widest gaps and the lowest absolute maturity — consistent with the audit findings (no SIEM/log review, untested IR plan) and with the risk register's two highest-scored risks. The roadmap sequences DE and RS first.

---

## 2. Subcategory-level gaps (largest first)

| Subcategory | Objective | Current | Target | Gap | Linked finding / risk |
|-------------|-----------|:-------:|:------:|:---:|------------------------|
| GV.RM-01 | Risk management strategy | 1 | 3 | 2 | R-010 (no risk appetite) |
| GV.PO-01 | Security policy lifecycle | 1 | 3 | 2 | — (policy drafted, not operationalized) |
| GV.SC-01 | Supply-chain / vendor risk | 1 | 3 | 2 | F6 / R-007 |
| ID.AM-02 | Software inventory | 1 | 3 | 2 | R-009 |
| ID.RA-05 | Risk prioritization | 1 | 3 | 2 | — |
| PR.AA-05 | Least privilege | 1 | 3 | 2 | F2 / R-002 |
| PR.AT-01 | Security awareness training | 1 | 3 | 2 | F5 / R-006 |
| DE.CM-09 | Endpoint detection (EDR) | 1 | 3 | 2 | R-005 |
| DE.AE-02 | Event analysis / log review | 1 | 3 | 2 | F3 / R-003 |
| RS.MA-01 | Incident response execution | 1 | 3 | 2 | F4 / R-004 |
| RS.AN-03 | Incident analysis | 1 | 3 | 2 | — |
| RC.CO-03 | Recovery communication | 1 | 3 | 2 | — |
| GV.OC-01 | Organizational context | 2 | 3 | 1 | — |
| GV.RR-02 | Roles & responsibilities | 2 | 3 | 1 | — |
| ID.AM-01 | Hardware inventory | 2 | 3 | 1 | — |
| ID.AM-05 | Asset prioritization | 2 | 3 | 1 | — |
| ID.RA-01 | Vulnerability identification | 2 | 3 | 1 | — |
| PR.AA-01 | Identity & credential mgmt | 2 | 3 | 1 | F1 / R-001 |
| DE.CM-01 | Network/system monitoring | 2 | 3 | 1 | F3 / R-003 |
| RS.CO-02 | Incident reporting | 2 | 3 | 1 | — |
| RC.RP-01 | Recovery plan | 2 | 3 | 1 | R-008 |
| PR.DS-01 | Data-at-rest encryption | 3 | 3 | **0** | ✅ at target |
| PR.DS-02 | Data-in-transit encryption | 3 | 3 | **0** | ✅ at target |

**Already at target (2 subcategories):** encryption at rest and in transit (PR.DS-01/02) are the only controls assessed at Tier 3 — the organization's lone bright spot and a useful "anchor" example of what Repeatable looks like.

---

## 3. Prioritized remediation roadmap

| Wave | Focus | Subcategories | Rationale | POA&M items |
|------|-------|---------------|-----------|-------------|
| **Wave 1 (0–90 days)** | Stop the bleeding — access + detection | PR.AA-01, PR.AA-05, DE.AE-02 | Highest-risk, Critical findings; close insider/credential exposure and gain visibility | POAM-001, -002, -003 |
| **Wave 2 (90–180 days)** | Response & resilience | RS.MA-01, RC.RP-01, DE.CM-09 | Make detection actionable; prove recovery works | POAM-004, -007, -008 |
| **Wave 3 (180–270 days)** | Program & people | GV.SC-01, PR.AT-01, ID.AM-02 | Vendor program, training, asset baseline | POAM-005, -006, -009 |
| **Wave 4 (270–365 days)** | Governance maturity | GV.RM-01 | Ratify risk appetite; move governance from Partial to Repeatable | POAM-010 |

**Definition of "done" (target state):** each Function reaches an average of **Tier 3 (Repeatable)** — controls are documented, consistently performed, and produce evidence on a recurring basis (not point-in-time). Reaching Tier 3 across all six Functions is the precondition for a credible SOC 2 Type II and HITRUST validated-assessment attempt.
