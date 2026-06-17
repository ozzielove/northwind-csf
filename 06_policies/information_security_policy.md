# Information Security Policy

**Organization:** Northwind Health Systems (fictional)
**Policy owner:** Chief Technology Officer
**Version:** 1.0 · **Effective:** Q2 2026 · **Review cycle:** Annual
**Frameworks:** NIST CSF 2.0 (GV.PO-01) · ISO 27001 A.5.1 · SOC 2 CC5.3 · HIPAA §164.316(a)

---

## 1. Purpose

Establish management direction and requirements for protecting the confidentiality, integrity, and availability (CIA) of Northwind information assets, including electronic Protected Health Information (ePHI).

## 2. Scope

Applies to all employees, contractors, and third parties accessing Northwind systems, data, or facilities.

## 3. Policy statements

### 3.1 Governance
Security roles and responsibilities shall be defined and assigned. The CTO is accountable for the security program. Risk decisions shall align to the documented risk appetite.

### 3.2 Access control
Access shall follow **least privilege** and **role-based access control**. Unique credentials are required for every user. **Multi-factor authentication is mandatory** for all privileged and remote access. Access shall be reviewed quarterly and revoked upon termination within 24 hours.

### 3.3 Data protection
ePHI shall be **encrypted at rest and in transit** using industry-standard algorithms (AES-256, TLS 1.2+). Data shall be classified and handled per its sensitivity.

### 3.4 Risk management
A documented risk assessment shall be performed at least annually and upon significant change, using the methodology in `03_risk/`. Risks shall be tracked to closure in the risk register.

### 3.5 Logging & monitoring
Security-relevant events shall be logged, centrally aggregated, and reviewed. Alerts shall be triaged per the incident response process.

### 3.6 Incident response
An incident response plan shall be maintained and **tested at least twice annually**. HIPAA breach-notification obligations shall be met within required timelines.

### 3.7 Security awareness
All workforce members shall complete security awareness training at onboarding and **annually**, with periodic phishing simulations.

### 3.8 Third-party risk
Vendors with access to Northwind data shall undergo security review before onboarding. Business Associate Agreements (BAAs) are required for any vendor handling ePHI.

### 3.9 Business continuity
Backups shall be performed and **restoration tested at least annually**. Recovery objectives (RTO/RPO) shall be documented.

## 4. Enforcement

Violations may result in disciplinary action up to termination and, where applicable, legal action.

## 5. Exceptions

Exceptions require documented risk acceptance approved by the CTO with a defined expiration date.

## 6. Revision history

| Version | Date | Author | Change |
|---------|------|--------|--------|
| 1.0 | Q2 2026 | O. Morency (GRC Analyst) | Initial issue |
