# Audit Evidence Collection Log

**Purpose:** Track evidence gathered to support control assessments — the day-to-day "collect, organize, and prepare audit evidence" task named in GRC/compliance job descriptions. Each evidence item is reusable across SOC 2, ISO 27001, and HIPAA via the crosswalk.

| Evidence ID | Control(s) | Evidence description | Type | Collected | Reusable for |
|-------------|-----------|----------------------|------|-----------|--------------|
| EV-001 | PR.AA-01 / IA-2 | AWS IAM users + MFA status export | Screenshot/JSON | Q2 2026 | SOC 2 CC6.1, ISO A.5.17, HIPAA §164.312(d) |
| EV-002 | PR.AA-05 / AC-6 | IAM policy documents showing permissions | Config export | Q2 2026 | SOC 2 CC6.3, ISO A.8.2, HIPAA §164.312(a) |
| EV-003 | PR.DS-01 / SC-28 | RDS & S3 encryption settings | Console screenshot | Q2 2026 | SOC 2 CC6.1, ISO A.8.24, HIPAA §164.312(a)(2)(iv) |
| EV-004 | DE.CM-01 / AU-6 | CloudTrail enabled config + log sample | Config + log | Q2 2026 | SOC 2 CC7.2, ISO A.8.16, HIPAA §164.312(b) |
| EV-005 | PR.AT-01 / AT-2 | Onboarding training records | Spreadsheet | Q2 2026 | SOC 2 CC1.4, ISO A.6.3, HIPAA §164.308(a)(5) |
| EV-006 | RS.MA-01 / IR-8 | Incident response plan document | Policy doc | Q2 2026 | SOC 2 CC7.4, ISO A.5.24, HIPAA §164.308(a)(6) |
| EV-007 | GV.PO-01 / PL-1 | Information security policy (this repo) | Policy doc | Q2 2026 | SOC 2 CC5.3, ISO A.5.1, HIPAA §164.316(a) |
| EV-008 | GV.SC-01 / SR-3 | Vendor list + BAA status | Spreadsheet | Q2 2026 | SOC 2 CC9.2, ISO A.5.19, HIPAA §164.308(b) |
| EV-009 | RC.RP-01 / CP-10 | Backup configuration + last restore date | Config | Q2 2026 | SOC 2 A1.2, ISO A.5.29, HIPAA §164.308(a)(7) |

**Evidence handling:** Evidence is dated, attributed, and stored read-only. Sensitive values are redacted in the portfolio version.
