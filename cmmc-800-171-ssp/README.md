# CMMC Level 2 / NIST SP 800-171 Rev 2 OSCAL Portfolio (SSP + POA&M)

> SIMULATED / PORTFOLIO -- fictional system, not a real assessment.
>
> This repository is a job-seeker portfolio artifact. The system under assessment
> (Aegis Defense Logistics Platform), the operating company (Ironwood Defense Systems
> LLC), the data, and the assessment are all FICTIONAL and invented to demonstrate
> compliance-as-code literacy. No real Controlled Unclassified Information (CUI) is
> handled. There is no real DoD contract, no real C3PAO assessment, and no CMMC
> certification. The author holds no active security clearance and no CMMC, CISSP, or
> CISA certification, and has no production ISSO authority.

## What This Is

A small, machine-readable compliance artifact set rendered in OSCAL JSON, with
recruiter-readable Markdown mirrors:

```
cmmc-800-171-ssp/
  oscal/
    ssp.json        OSCAL system-security-plan (12 representative 800-171 Rev 2 requirements)
    poam.json       OSCAL plan-of-action-and-milestones (5 items tied to the SSP gaps)
  SSP_EXCERPT.md    Human-readable mirror of the SSP
  POAM.md           Human-readable mirror of the POA&M
  README.md         This file
```

## What OSCAL Is and Why This Matters

OSCAL (Open Security Controls Assessment Language) is a NIST-maintained set of
machine-readable formats (JSON, XML, YAML) for representing security control catalogs,
profiles/baselines, System Security Plans (SSPs), assessment plans and results, and
Plans of Action and Milestones (POA&Ms).

Traditionally an SSP and POA&M are static documents (Word/PDF) that humans write and
re-key. Expressing them as OSCAL JSON makes compliance "compliance-as-code":

- Machine-validatable: the structure can be checked by tools and CI pipelines.
- Traceable: every control implementation links to components and statements; every
  POA&M item links back to observations, risks, and the SSP it remediates.
- Automatable: status roll-ups, gap reports, and cross-framework crosswalks can be
  generated instead of hand-maintained.

This artifact demonstrates the author can model an SSP and POA&M in OSCAL, keep
control-to-evidence traceability, and mirror it for non-technical reviewers.

## Framework Coverage (Simulated)

12 representative NIST SP 800-171 Rev 2 requirements across 8 families:

- AC (Access Control): 3.1.1, 3.1.2, 3.1.5
- AU (Audit and Accountability): 3.3.1
- IA (Identification and Authentication): 3.5.1, 3.5.3
- SC (System and Communications Protection): 3.13.1, 3.13.11
- SI (System and Information Integrity): 3.14.1
- CM (Configuration Management): 3.4.1
- RA (Risk Assessment): 3.11.1
- AT (Awareness and Training): 3.2.1

Statuses are mixed (implemented / partial / planned). Each partial or planned control
is tracked by a POA&M item (POAM-0001 through POAM-0005).

## How To Verify

Both JSON files must parse and contain no non-ASCII characters.

```bash
# Parse-check (no output, exit 0 = valid JSON)
python3 -m json.tool oscal/ssp.json  > /dev/null && echo SSP_OK
python3 -m json.tool oscal/poam.json > /dev/null && echo POAM_OK

# ASCII-only check (should print nothing)
LC_ALL=C grep -nP '[^\x00-\x7F]' oscal/ssp.json
LC_ALL=C grep -nP '[^\x00-\x7F]' oscal/poam.json README.md SSP_EXCERPT.md POAM.md

# Spot-check control-id format (native 800-171 numbering like 3.1.1)
python3 -c "import json;d=json.load(open('oscal/ssp.json'));print([r['control-id'] for r in d['system-security-plan']['control-implementation']['implemented-requirements']])"
```

Control ids use native NIST SP 800-171 numbering (for example, `3.1.1`) consistently.

## About the Author / Why This Artifact

Ozirus B. Morency is an engineer-analyst pursuing a transition into cybersecurity, with
a focus on critical-infrastructure and operational-technology security. Real, verifiable
background:

- U.S. Army National Guard: 7 years, Petroleum Supply Specialist (E-4); U.S. citizen
  (U.S.-person status for ITAR/EAR purposes). Holds no active security clearance.
- Air Liquide: Production Technician / Shift Lead -- led 50+ root-cause analyses, trained
  20 technicians, supported 4 annual federal OSHA/EPA audits; SAP S/4HANA, P&IDs, LOTO.
- Microsoft: current Critical Environment Technician -- building management system (BMS)
  monitoring and 24x7 critical-infrastructure operations.
- Education: BS in Cybersecurity in progress (expected 2027); Google Cybersecurity
  Certificate (beginner level).
- Engineering portfolio: author of the "Pal" Python job-application pipeline and the live
  Northwind NIST CSF 2.0 GRC portfolio.

This OSCAL SSP/POA&M set extends that GRC portfolio toward defense-sector
compliance-as-code (NIST SP 800-171 / CMMC). It is a learning and demonstration artifact
only; it does not represent real compliance work, real authority, or any certification
the author does not hold.

Northwind NIST CSF 2.0 GRC portfolio: https://northwind-csf.vercel.app
(source: github.com/ozzielove/northwind-csf)

## Publishing

This directory is self-contained and can be published as its own public GitHub repository
to showcase OSCAL / compliance-as-code skills. Keep the SIMULATED / PORTFOLIO banner
intact in every file.
