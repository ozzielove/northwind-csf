# Risk Assessment Methodology

**Aligned to:** NIST SP 800-30 Rev 1 (Guide for Conducting Risk Assessments) and NIST RMF (SP 800-37).

---

## 1. Approach

Each risk is derived from a control gap identified in the CSF 2.0 assessment and scored as:

```
Risk Score = Likelihood × Impact
```

Both factors are rated on a 1–5 scale, producing a 1–25 risk score binned into qualitative levels.

## 2. Likelihood scale

| Rating | Level | Definition |
|:------:|-------|------------|
| 1 | Rare | Unlikely in a 3-year horizon |
| 2 | Unlikely | Possible but not expected |
| 3 | Possible | Could occur; some precedent |
| 4 | Likely | Expected within 12 months |
| 5 | Almost certain | Actively occurring or imminent |

## 3. Impact scale

| Rating | Level | Definition (healthcare-SaaS context) |
|:------:|-------|--------------------------------------|
| 1 | Negligible | No ePHI exposure; minor internal disruption |
| 2 | Minor | Limited internal data; <1 hr downtime |
| 3 | Moderate | Single-customer impact; recoverable |
| 4 | Major | ePHI exposure; HIPAA reportable; customer churn |
| 5 | Severe | Mass ePHI breach; regulatory fines; business-threatening |

## 4. Risk rating matrix

| L \ I | 1 | 2 | 3 | 4 | 5 |
|:----:|:-:|:-:|:-:|:-:|:-:|
| **5** | 5 | 10 | 15 | 20 | 25 |
| **4** | 4 | 8 | 12 | 16 | 20 |
| **3** | 3 | 6 | 9 | 12 | 15 |
| **2** | 2 | 4 | 6 | 8 | 10 |
| **1** | 1 | 2 | 3 | 4 | 5 |

| Score | Level | Response SLA |
|-------|-------|--------------|
| 1–4 | Low | Accept / monitor; review annually |
| 5–9 | Moderate | Remediate within 90 days |
| 10–15 | High | Remediate within 30 days |
| 16–25 | Critical | Remediate within 7 days; executive escalation |

## 5. Risk treatment options

Per ISO 27001 / NIST RMF, each risk receives one of: **Mitigate**, **Transfer**, **Avoid**, or **Accept** (with documented risk-acceptance owner and expiry).

## 6. Roles

- **Risk owner** — accountable business/system owner.
- **Control owner** — implements the remediation.
- **GRC Analyst** — assesses, scores, tracks, and reports; escalates overdue items.
