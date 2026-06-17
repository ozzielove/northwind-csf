# Audit Findings Report

**Organization:** Northwind Health Systems (fictional)
**Assessment:** NIST CSF 2.0 / HIPAA / SOC 2 / ISO 27001
**Date:** Q2 2026
**Prepared by:** Ozirus B. Morency, GRC Analyst

Each finding follows the standard audit format: **Condition · Criteria · Cause · Effect · Recommendation**, with a cross-framework reference and linked risk ID.

---

## Finding 1 — Shared AWS administrator account without MFA *(Critical)*

- **Condition:** The AWS root/administrator account is shared among three engineers and is not protected by multi-factor authentication (MFA).
- **Criteria:** NIST CSF **PR.AA-01**; 800-53 **IA-2(1)**; ISO 27001 **A.5.17**; SOC 2 **CC6.1**; HIPAA **§164.312(a)(2)(i)** (unique user identification) and **(d)** (authentication).
- **Cause:** Account created at company founding for convenience; no IAM governance established as the team grew.
- **Effect:** A single phished credential grants unrestricted access to all production ePHI; no individual accountability in audit logs; HIPAA-reportable breach exposure.
- **Recommendation:** Eliminate shared use; provision individual IAM users with least privilege; enforce MFA on all privileged accounts; lock away root credentials with break-glass procedure. *(Risk R-001)*

---

## Finding 2 — Access permissions do not follow least privilege *(Critical)*

- **Condition:** IAM policies grant broad `*` permissions; most engineers can read the production ePHI database.
- **Criteria:** CSF **PR.AA-05**; 800-53 **AC-6**; ISO 27001 **A.8.2**; SOC 2 **CC6.3**; HIPAA **§164.312(a)(1)**.
- **Cause:** No role-based access control (RBAC) model defined; permissions granted ad hoc.
- **Effect:** Expanded insider-threat and lateral-movement exposure; violates minimum-necessary standard for ePHI.
- **Recommendation:** Define RBAC roles; implement least-privilege IAM policies; conduct quarterly access reviews. *(Risk R-002)*

---

## Finding 3 — No centralized logging review or detection capability *(Critical)*

- **Condition:** AWS CloudTrail is enabled but logs are never reviewed; there is no SIEM and no alerting.
- **Criteria:** CSF **DE.AE-02 / DE.CM-01**; 800-53 **AU-6, SI-4**; ISO 27001 **A.8.15, A.8.16**; SOC 2 **CC7.2**; HIPAA **§164.312(b)** (audit controls).
- **Cause:** No dedicated security staff; monitoring not assigned as a responsibility.
- **Effect:** Security incidents and unauthorized ePHI access can occur undetected for extended periods, increasing breach scope and notification liability.
- **Recommendation:** Deploy a SIEM (e.g., cloud-native or open-source), forward CloudTrail/app logs, define priority alerts, and assign daily triage. *(Risk R-003)*

---

## Finding 4 — Incident response plan untested; breach-notification readiness unproven *(High)*

- **Condition:** An IR plan document exists but has never been exercised; HIPAA breach-notification timelines have not been rehearsed.
- **Criteria:** CSF **RS.MA-01**; 800-53 **IR-3** (incident response testing) **and IR-8** (IR plan); ISO 27001 **A.5.24**; SOC 2 **CC7.4**; HIPAA **§164.308(a)(6), §164.408**.
- **Cause:** Plan created for a customer questionnaire and then shelved.
- **Effect:** During a real incident, undefined roles and untested steps risk missing the HIPAA 60-day breach-notification requirement, compounding regulatory penalties.
- **Recommendation:** Conduct a tabletop exercise twice annually; assign IR roles; document and track lessons learned. *(Risk R-004)*
- **Note on control reference:** This finding cites **IR-3 (Incident Response Testing)** because the deficiency is an *untested* plan; the crosswalk maps the broader RS.MA-01 subcategory to **IR-4 (Incident Handling)**. Both are correct — IR-3 is the precise control for this specific gap, IR-4 the general subcategory mapping.

---

## Finding 5 — No security awareness training program *(High)*

- **Condition:** Employees receive a brief security mention at onboarding only; no recurring training or phishing simulations.
- **Criteria:** CSF **PR.AT-01**; 800-53 **AT-2**; ISO 27001 **A.6.3**; SOC 2 **CC1.4**; HIPAA **§164.308(a)(5)**.
- **Cause:** No owner assigned for the training program.
- **Effect:** Workforce is the primary attack surface; elevated phishing/social-engineering risk against an ePHI custodian.
- **Recommendation:** Implement annual training plus quarterly phishing simulations; track completion as audit evidence. *(Risk R-006)*

---

## Finding 6 — Third-party vendors onboarded without security review *(High)*

- **Condition:** Vendors (including subprocessors touching ePHI) are engaged with no security assessment or Business Associate Agreement (BAA) verification.
- **Criteria:** CSF **GV.SC-01**; 800-53 **SR-3**; ISO 27001 **A.5.19, A.5.21**; SOC 2 **CC9.2**; HIPAA **§164.308(b)** (business associate contracts).
- **Cause:** No vendor risk management process or intake questionnaire.
- **Effect:** Supply-chain breaches and missing BAAs create direct HIPAA liability for Northwind.
- **Recommendation:** Stand up a vendor risk program with the intake questionnaire in `07_vendor_risk/`; require BAAs before data sharing; risk-tier vendors. *(Risk R-007)*

---

## Summary

| Finding | Severity | Primary risk |
|---------|----------|--------------|
| 1 — Shared admin / no MFA | Critical | R-001 |
| 2 — No least privilege | Critical | R-002 |
| 3 — No detection/logging review | Critical | R-003 |
| 4 — IR plan untested | High | R-004 |
| 5 — No awareness training | High | R-006 |
| 6 — Unvetted vendors | High | R-007 |

**3 Critical, 3 High.** All map to remediation items in `05_remediation/poam.csv`.

---

## Audit-readiness close-the-loop matrix

The hallmark of an audit-ready package is **traceability**: every finding ties to a control, to the evidence that demonstrates it, to a test result, and to a tracked remediation item — so an auditor can follow any thread end to end without asking for context.

| Finding | CSF / 800-53 control | Evidence (`evidence/`) | Control test (`control_test_plan.csv`) | Risk (`risk_register.csv`) | POA&M item | Status |
|---------|----------------------|------------------------|-----------------------------------------|----------------------------|------------|--------|
| F1 — Shared admin / no MFA | PR.AA-01 / IA-2 | EV-001 | TEST-01 (Deficient) | R-001 (Critical, 20) | POAM-001 | In Progress |
| F2 — No least privilege | PR.AA-05 / AC-6 | EV-002 | TEST-02 (Deficient) | R-002 (Critical, 16) | POAM-002 | Open |
| F3 — No detection / log review | DE.AE-02 / AU-6 | EV-004 | TEST-03 (Deficient) | R-003 (Critical, 16) | POAM-003 | Open |
| F4 — IR plan untested | RS.MA-01 / IR-3, IR-8 | EV-006 | TEST-04 (Deficient) | R-004 (High, 15) | POAM-004 | Open |
| F5 — No awareness training | PR.AT-01 / AT-2 | EV-005 | TEST-05 (Deficient) | R-006 (High, 12) | POAM-005 | Open |
| F6 — Unvetted vendors | GV.SC-01 / SR-3 | EV-008 | TEST-06 (Deficient) | R-007 (High, 12) | POAM-006 | Open |

> **How to use this in an audit:** pick any finding, and the row gives you the control criterion it violates, the evidence already on file, the test that confirmed the deficiency (design vs. operating), the quantified risk, and the remediation owner/date. Effective controls (TEST-08 data-at-rest encryption, TEST-09 policy) carry no finding — they passed. This closed loop (finding → control → evidence → test → risk → remediation) is what separates an "audit-ready" portfolio from a pile of documents.

