# Multi-Framework Control Crosswalk

**Purpose:** Map each assessed NIST CSF 2.0 subcategory to the equivalent control in **NIST SP 800-53 Rev 5**, **ISO/IEC 27001:2022 Annex A**, **SOC 2 Trust Services Criteria (TSC)**, **HITRUST CSF v11**, and the **HIPAA Security Rule**.

> *Control mapping / crosswalking is the single most frequently cited daily task in GRC Analyst job descriptions.* One assessment, mapped once, demonstrates evidence for five frameworks at once — the core efficiency argument of a unified GRC program. This is an **authored control library**, not a one-to-one lookup: each row is a deliberate equivalence decision, and the breakdowns are documented below.

| CSF 2.0 | Control objective | NIST 800-53 r5 | ISO 27001:2022 Annex A | SOC 2 TSC | HITRUST CSF v11 | HIPAA Security Rule |
|---------|-------------------|----------------|------------------------|-----------|-----------------|---------------------|
| GV.RM-01 | Risk management strategy | PM-9, RA-1 | A.5.1, A.5.2 | CC3.1, CC3.2 | 03.a, 03.b | §164.308(a)(1)(ii)(A) Risk Mgmt |
| GV.PO-01 | Security policy | PL-1, PM-1 | A.5.1 | CC1.1, CC5.3 | 04.a | §164.316(a) Policies & Procedures |
| GV.SC-01 | Supply chain risk mgmt | SR-1, SR-3 | A.5.19, A.5.21 | CC9.2 | 05.i, 05.k | §164.308(b) Business Associate |
| ID.AM-01 | Hardware inventory | CM-8 | A.5.9 | CC6.1 | 07.a | §164.310(d)(1) Device & Media |
| ID.AM-02 | Software inventory | CM-8, CM-10 | A.5.9, A.8.8 | CC6.1 | 07.a | §164.308(a)(1) |
| ID.RA-01 | Vulnerability identification | RA-5 | A.8.8 | CC7.1 | 10.m | §164.308(a)(1)(ii)(A) |
| ID.RA-05 | Risk prioritization | RA-3, RA-7 | A.5.7, A.8.2 | CC3.2 | 03.b, 03.c | §164.308(a)(1)(ii)(B) |
| PR.AA-01 | Identity & credential mgmt | IA-2, IA-5 | A.5.16, A.5.17 | CC6.1, CC6.2 | 01.b, 01.q | §164.312(a)(2)(i) Unique ID |
| PR.AA-05 | Least privilege | AC-6 | A.8.2, A.8.3 | CC6.3 | 01.c, 01.v | §164.312(a)(1) Access Control |
| PR.DS-01 | Data at rest encryption | SC-28 | A.8.24 | CC6.1 | 06.d, 10.f | §164.312(a)(2)(iv) Encryption |
| PR.DS-02 | Data in transit encryption | SC-8 | A.8.24 | CC6.7 | 09.y, 10.f | §164.312(e)(1) Transmission |
| PR.AT-01 | Security awareness training | AT-2 | A.6.3 | CC1.4 | 02.e | §164.308(a)(5) Awareness Training |
| DE.CM-01 | Network/system monitoring | SI-4, AU-6 | A.8.16 | CC7.2 | 09.ab | §164.312(b) Audit Controls |
| DE.CM-09 | Endpoint monitoring | SI-4, SI-3 | A.8.7 | CC7.2 | 09.j | §164.308(a)(1)(ii)(D) |
| DE.AE-02 | Event analysis | AU-6, IR-4 | A.8.15, A.8.16 | CC7.3 | 09.aa, 11.a | §164.308(a)(1)(ii)(D) Review |
| RS.MA-01 | Incident response execution | IR-4, IR-8 | A.5.24, A.5.26 | CC7.4 | 11.c | §164.308(a)(6) Incident Procedures |
| RS.CO-02 | Incident reporting | IR-6 | A.5.25, A.6.8 | CC7.4 | 11.a | §164.408 Breach Notification |
| RC.RP-01 | Recovery plan | CP-10, IR-4 | A.5.29, A.5.30 | A1.2, CC7.5 | 09.l, 12.c | §164.308(a)(7) Contingency Plan |
| RC.CO-03 | Recovery communication | CP-2, IR-7 | A.5.26 | CC7.5 | 12.c | §164.308(a)(7)(ii)(C) |

---

## Control library summary

This crosswalk is a **sized, authored control library**, not an exhaustive framework dump. The 19 assessed CSF 2.0 subcategories were selected because they carry the highest residual risk for a healthcare-SaaS custodian of ePHI; they map onto:

| Target framework | Distinct controls mapped | Notes |
|------------------|--------------------------|-------|
| NIST CSF 2.0 (spine) | **19 subcategories** | Across all 6 Functions (GV, ID, PR, DE, RS, RC) |
| NIST SP 800-53 Rev 5 | **26 controls** | AC, AT, AU, CM, CP, IA, IR, PL, PM, RA, SC, SI, SR families |
| ISO/IEC 27001:2022 Annex A | **22 controls** | 2022 numbering (not 2013); clauses 5–8 |
| SOC 2 Trust Services Criteria | **16 criteria** | 15 Common Criteria + Availability A1.2 |
| HITRUST CSF v11 | **23 control references** | Across 11 control categories (01–12) |
| HIPAA Security Rule | **~16 citations** | Administrative, Physical, Technical safeguards |

**Duplicate controls retired.** Mapping once and reusing collapses redundant work: a single 800-53 control such as **SI-4** satisfies both *DE.CM-01* and *DE.CM-09*; **IR-4** recurs across *DE.AE-02*, *RS.MA-01*, and *RC.RP-01*; **A.8.24** covers both encryption-at-rest and -in-transit; **10.f** (HITRUST cryptographic controls) and **07.a** (asset inventory) each serve two subcategories. Counting raw cells would overstate the library by ~20%; the distinct-control counts above are the de-duplicated figures, so one piece of evidence (e.g., the IAM/MFA export) closes the same control across CSF, 800-53, ISO, SOC 2, HITRUST, and HIPAA simultaneously.

### Where the mapping breaks down (honest limitations)

A crosswalk is a *practitioner's equivalence judgment*, not a certified one-to-one identity. Documented caveats:

- **Not bijective.** CSF subcategories are outcome-oriented; 800-53/ISO controls are prescriptive. One CSF subcategory often spans several controls (e.g., *PR.AA-01* → IA-2 *and* IA-5), and some controls (SI-4) serve multiple subcategories. The mapping is many-to-many.
- **SOC 2 TSC is points-of-focus, not controls.** TSC criteria (CC6.1, etc.) are *criteria*; the actual SOC 2 controls are the auditee's own. The crosswalk maps to the criterion the control would satisfy, not to a named SOC 2 control.
- **HITRUST references are category/control IDs, not implementation requirement levels.** HITRUST scopes requirement levels by organizational factors; this library cites the control reference only and does not assert a certification level.
- **HIPAA addressable vs. required.** Several cited specifications (e.g., encryption §164.312(a)(2)(iv)) are *addressable*, meaning HIPAA permits a documented equivalent. The crosswalk flags the citation; the risk register carries the risk-based justification.
- **Scope boundary.** Application-layer SDLC and formal change-management controls were **not** assessed (see ITGC tagging below) and are therefore absent from the library — a known coverage gap, not an omission error.

### SOC 2 Trust Services Criteria — readiness note

Beyond the column above, the assessed controls cluster against the SOC 2 TSC as follows, giving a directional **Type II readiness** read for the Security (Common Criteria) category plus Availability:

| TSC area | Criteria touched | Readiness signal from this assessment |
|----------|------------------|----------------------------------------|
| CC1 Control Environment | CC1.1, CC1.4 | Policy exists; awareness training is a documented gap (Finding 5) |
| CC3 Risk Assessment | CC3.1, CC3.2 | Risk register + methodology in place; risk-appetite statement missing (R-010) |
| CC5 Control Activities | CC5.3 | Policy-to-procedure linkage present |
| CC6 Logical & Physical Access | CC6.1, CC6.2, CC6.3, CC6.7 | **Weakest area** — shared admin/no MFA, no least privilege (Findings 1–2) |
| CC7 System Operations | CC7.1–CC7.5 | No SIEM/detection, untested IR (Findings 3–4) — primary Type II blocker |
| CC9 Risk Mitigation | CC9.2 | Vendor program stand-up required (Finding 6) |
| A1 Availability | A1.2 | Backups exist; restore untested (R-008) |

**Bottom line:** this organization is **not Type II ready** today — the CC6/CC7 access and operations gaps would generate qualified opinions. The POA&M sequences exactly those criteria first. (This is a *readiness self-assessment*, not a SOC 2 audit or attestation.)

---

## ITGC domain tagging

Tagging the assessed controls against the five classic **IT General Controls (ITGC)** domains — the lens SOX/ITGC and IT-audit screens use — shows where the assessment is strong and where it deliberately did not reach:

| ITGC domain | Mapped CSF subcategories | Coverage |
|-------------|--------------------------|----------|
| **Logical access** | PR.AA-01 (identity/credential, MFA), PR.DS-01/02 (data protection) | Strong |
| **Privileged access management** | PR.AA-05 (least privilege, RBAC, root/break-glass) | Strong |
| **Logging & monitoring** | DE.CM-01, DE.CM-09, DE.AE-02 | Strong |
| **Change management** | ID.AM-02 (software inventory/SBOM) | **Partial** — change-approval and segregation-of-duties were not tested |
| **SDLC** | — | **Out of scope** — no application development environment was assessed |

> The Change-Management and SDLC gaps are intentional scope boundaries for a small ePHI-SaaS infrastructure review, not assessment errors. They are the natural next domains to add as the program matures.

---

## How to read this crosswalk

- **One control gap = multi-framework impact.** Example: weak access control (PR.AA-05) is simultaneously a 800-53 **AC-6** gap, an ISO 27001 **A.8.2** nonconformity, a SOC 2 **CC6.3** exception, a HITRUST **01.c** gap, and a HIPAA **§164.312(a)(1)** finding. Remediating it once advances all five programs.
- **Audit reuse.** Evidence collected for the SOC 2 audit (e.g., IAM policy export) can be reused as ISO 27001, HITRUST, and HIPAA evidence because the crosswalk establishes equivalence.
- **Prioritization.** Controls touching the most frameworks and the highest-risk subcategories (Detect/Respond) are sequenced first in the POA&M.
