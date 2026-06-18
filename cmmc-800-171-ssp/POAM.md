# Plan of Action and Milestones (POA&M) -- Aegis Defense Logistics Platform

> SIMULATED / PORTFOLIO -- fictional system, not a real assessment.
> Invented for a job-seeker portfolio to demonstrate compliance-as-code literacy.
> No real CUI, no real DoD contract, no C3PAO assessment, no CMMC certification.
> The author holds no active clearance and no CMMC/CISSP/CISA certification.

## Overview (Simulated)

- References SSP: ./oscal/ssp.json
- System ID: aegis-defense-logistics-platform-SIM-0001
- Framework: NIST SP 800-171 Rev 2 / CMMC Level 2
- OSCAL version: 1.1.2
- Last modified: 2026-06-18

This POA&M tracks the partial and planned controls from the SSP. Each item maps to an
observation and a risk in `oscal/poam.json`.

## POA&M Items (Simulated)

| POA&M ID | Weakness | Related Control(s) | Owner | Milestones | Target Dates | Closure Evidence (Simulated) |
|----------|----------|--------------------|-------|------------|--------------|-------------------------------|
| POAM-0001 | Legacy admin console permits single-factor break-glass login and uses a shared elevated role. | 3.1.5, 3.5.3 | Remediation Owner (Simulated) | (1) Onboard console to IdP and require MFA for all admin logins. (2) Decommission shared role and provision individual least-privilege accounts. | 2026-09-30; 2026-11-30 | IdP policy export requiring MFA for all admin sessions; access-review report confirming role removal. |
| POAM-0002 | Database and batch worker tiers do not forward audit records to centralized logging. | 3.3.1 | Remediation Owner (Simulated) | (1) Configure database audit log shipping. (2) Configure batch worker log forwarding and validate coverage. | 2026-10-31; 2026-12-15 | Logging dashboard showing ingestion from all in-boundary components; retention policy configuration. |
| POAM-0003 | Cryptographic modules protecting simulated CUI are not all FIPS 140-validated. | 3.13.11 | Remediation Owner (Simulated) | (1) Inventory crypto modules and identify non-validated components. (2) Enable FIPS mode and replace non-validated modules. | 2026-08-31; 2027-02-28 | CMVP certificate references; configuration showing FIPS mode at gateway and data-at-rest layers. |
| POAM-0004 | No formal recurring security awareness training cadence or completion tracking. | 3.2.1 | Remediation Owner (Simulated) | (1) Select content and define annual cadence and role-based requirements. (2) Deliver first cycle and track completion. | 2026-09-15; 2026-12-31 | LMS completion report; training policy with annual cadence. |
| POAM-0005 | Vulnerability scanning runs quarterly instead of the targeted monthly cadence. | 3.11.1 | Remediation Owner (Simulated) | (1) Reconfigure scanner for monthly authenticated scans. (2) Validate three consecutive cycles and integrate into risk register. | 2026-08-15; 2026-11-15 | Scan scheduler configuration showing monthly cadence; three consecutive monthly scan reports. |

## Risk Register Cross-Reference (Simulated)

| POA&M ID | Risk (Simulated) | Status |
|----------|------------------|--------|
| POAM-0001 | Unauthorized administrative access via legacy console. | Open |
| POAM-0002 | Incomplete audit trail impedes investigation. | Open |
| POAM-0003 | Non-FIPS crypto weakens CUI confidentiality assurance. | Open |
| POAM-0004 | Untrained workforce increases human-factor risk. | Open |
| POAM-0005 | Stale vulnerability posture. | Open |

## How This Maps to the OSCAL JSON

Each POA&M ID corresponds to a `poam-item` in `oscal/poam.json` under
`plan-of-action-and-milestones.poam-items`, with `related-observations`,
`related-risks`, and `milestones`. Observations live under `observations` and risks
under `risks`.
