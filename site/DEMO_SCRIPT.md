# 5-Minute Interview Demo Script - Northwind CSF 2.0

Say it out loud. Times are approximate. Keep the honesty framing in every section.

---

### 0:00 - Open & frame (30s)
> "This is a **simulated** GRC assessment I built for a **fictional** healthcare-SaaS company,
> Northwind Health Systems. It's a readiness assessment and portfolio piece - not real client work,
> not a SOC 2 audit. Everything you see traces to an artifact in the repo, and there's a live API
> behind it you can poke."

Open **https://northwind-csf.vercel.app**. Point to the nav badge: *"API online."*

### 0:30 - CSF maturity scoring (45s)
Scroll to **Posture**. 
> "Six NIST CSF 2.0 Functions, scored on the 1-4 tier scale. Overall is **1.57 - Tier 2**. That
> number is **weighted by how many subcategories each Function carries**, not a flat average - a flat
> average would be 1.53. Detect and Respond are the floor, so they sequence first."

### 1:15 - Risk register (40s)
Scroll to **Risk**. Click the top-right dot (**R-001**).
> "Ten risks scored likelihood × impact. The critical cluster is shared admin access without MFA,
> over-permissioned IAM, and no detection coverage."

### 1:55 - Control testing (30s)
Scroll to **Controls**. Point to **TEST-04**.
> "Design vs. operating effectiveness. The IR plan is *designed* - it passes on paper - but it was
> never exercised, so it **fails in operation**. Testing both is the whole point."

### 2:25 - POA&M (25s)
Scroll to **Plan of Action & Milestones**.
> "Ten remediation items with owners and dates. Critical access and detection close first; governance
> polish lands last."

### 2:50 - Crosswalk (35s)
Scroll to **Crosswalk**. Filter to **Protect**.
> "One assessed control maps to **four** frameworks at once - 800-53, ISO 27001:2022, SOC 2, and
> HIPAA. That's the efficiency argument for a unified program. I do not claim HITRUST row-level
> mapping here because the repo only exposes four row-level framework mappings."

### 3:25 - TPRM (25s)
Scroll to **Third-Party Risk**.
> "A four-tier vendor model. A simulated vendor touching ePHI-class data with production-like access
> is Tier 1 - BAA review before data flows, SOC 2 review, SIG/CAIQ questionnaire."

### 3:50 - Live backend (45s)
Scroll to **Interview Demo Mode**.
- Click **API health check** → *"Live serverless endpoint."*
- Click **Recalculate maturity → 1.57** → *"The backend recomputes from the same data and returns 1.57."*
- In the **vendor tiering** form, leave simulated ePHI + production-like access checked, click **Run vendor tiering** →
  *"Tier 1, Critical, BAA required - computed server-side."*

> "And if the API is ever down, the page falls back to the bundled data and tells you so."

Optionally, in a terminal:
```bash
python3 scripts/score_maturity.py
```
> "Same scoring, offline, in Python - prints per-Function scores and overall 1.57."

### 4:35 - Resume claim proof map (25s)
Scroll to **Resume Claim Proof Map**.
> "Every résumé claim is tied to the artifact, endpoint, or script that backs it, with the proof type
> and the honest boundary - what's portfolio work, what's coursework, what's prior operations."

### 5:00 - Close (honesty)
> "To be precise about boundaries: the assessment is simulated on a fictional org. My SIEM and tooling
> exposure - Splunk, Chronicle, Suricata - is **coursework**, not production. The audit discipline -
> OSHA/EPA support, 50-plus root-cause investigations - is **prior operations**, not cybersecurity
> employment. This portfolio is how I translate that discipline into GRC artifacts: findings, root
> cause, corrective action, evidence, ownership, remediation."
