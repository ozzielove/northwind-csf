# System Security Plan (Excerpt) -- Aegis Defense Logistics Platform

> SIMULATED / PORTFOLIO -- fictional system, not a real assessment.
> The system, company, data, and assessment are invented for a job-seeker portfolio
> to demonstrate compliance-as-code literacy. No real CUI is handled. There is no real
> DoD contract, no C3PAO assessment, and no CMMC certification. The author holds no
> active clearance and no CMMC/CISSP/CISA certification.

## System Overview (Simulated)

- System name: Aegis Defense Logistics Platform (FICTIONAL)
- Operator: Ironwood Defense Systems LLC (FICTIONAL defense subcontractor)
- Framework: NIST SP 800-171 Rev 2 / CMMC Level 2
- OSCAL version: 1.1.2
- Last modified: 2026-06-18
- Sensitivity: Moderate (C: Moderate, I: Moderate, A: Low)
- Status: Under development (portfolio construct, not operational)

The Aegis Defense Logistics Platform is a fictional multi-tenant SaaS that notionally
supports defense supply-chain logistics tracking. CUI handling is hypothetical and
simulated; no Controlled Unclassified Information is actually stored, processed, or
transmitted.

## Authorization Boundary (Simulated)

The notional boundary includes the web application tier, the application/API tier, a
managed PostgreSQL database, a centralized logging service, an identity provider for
single sign-on, a vulnerability scanning service, and administrator access paths. All
infrastructure is hypothetically hosted in a FedRAMP-aligned region. This description
exists only to model OSCAL structure.

## Control Implementation Summary (12 Representative Requirements)

| Control ID | Family | Status | Implementation Narrative (Simulated) |
|------------|--------|--------|---------------------------------------|
| 3.1.1 | AC - Access Control | Implemented | Centralized account provisioning via the identity provider; only named, approved users/processes/devices granted access through a documented approval and deprovisioning workflow. |
| 3.1.2 | AC - Access Control | Implemented | Access limited to authorized transactions/functions via role-based access control mapped to least privilege; standard users cannot reach admin functions. |
| 3.1.5 | AC - Access Control | Partial | Least privilege enforced in the primary app; a legacy admin console retains a shared elevated role pending migration. Tracked by POAM-0001. |
| 3.3.1 | AU - Audit and Accountability | Partial | App and identity tiers emit audit records; database and batch worker tiers not yet centralized, leaving an audit gap. Tracked by POAM-0002. |
| 3.5.1 | IA - Identification and Authentication | Implemented | Every user and device uniquely identified through the identity provider before access; shared accounts prohibited in the primary app. |
| 3.5.3 | IA - Identification and Authentication | Partial | MFA enforced for standard and admin access to the primary app; legacy admin console still permits single-factor break-glass login. Tracked by POAM-0001. |
| 3.13.1 | SC - System and Communications Protection | Implemented | External and key internal boundaries monitored/controlled/protected; TLS terminates at a managed gateway; internal traffic segmented by security group. |
| 3.13.11 | SC - System and Communications Protection | Planned | Industry-standard TLS in use, but not all cryptographic modules are FIPS-validated; rollout to FIPS 140-validated modules planned. Tracked by POAM-0003. |
| 3.14.1 | SI - System and Information Integrity | Implemented | Flaws identified, reported, and corrected; OS and dependency patches on a monthly cadence with emergency patching for critical advisories. |
| 3.4.1 | CM - Configuration Management | Implemented | Baseline configurations and inventories maintained as infrastructure-as-code in version control with peer-reviewed change management. |
| 3.11.1 | RA - Risk Assessment | Partial | Risk periodically assessed; vulnerability scanning runs quarterly rather than the targeted monthly cadence. Tracked by POAM-0005. |
| 3.2.1 | AT - Awareness and Training | Planned | Awareness exists ad hoc; a formal recurring annual training cadence with completion tracking is planned. Tracked by POAM-0004. |

## Status Roll-Up (Simulated)

- Implemented: 7 (3.1.1, 3.1.2, 3.5.1, 3.13.1, 3.14.1, 3.4.1, plus one)
- Partial: 4 (3.1.5, 3.3.1, 3.5.3, 3.11.1)
- Planned: 2 (3.13.11, 3.2.1)

Note: counts reflect the 12 representative requirements above. Partial and planned items
are each mapped to a POA&M item for tracking.

## How This Maps to the OSCAL JSON

Each row above corresponds to an `implemented-requirement` in `oscal/ssp.json` under
`system-security-plan.control-implementation.implemented-requirements`, with an
`implementation-status` prop and a `by-components` narrative.
