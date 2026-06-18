#!/usr/bin/env python3
"""
build_bundle.py - regenerate FRONTEND_REVIEW_BUNDLE.md

Single-file concat of the full-stack portfolio for external (ChatGPT) drag-and-drop review.
Robust fencing: each file is wrapped in a backtick fence one longer than the longest
backtick run inside it (min 3), so embedded ``` blocks in the .md files never break it.

Run from the site/ directory:  python3 scripts/build_bundle.py
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Section order matches the published bundle. (file, language-tag)
FILES = [
    ("index.html", "html"),
    ("styles.css", "css"),
    ("app.js", "javascript"),
    ("data.js", "javascript"),
    ("scoring.js", "javascript"),
    ("apiutil.js", "javascript"),
    ("api/health.js", "javascript"),
    ("api/assessment.js", "javascript"),
    ("api/risks.js", "javascript"),
    ("api/crosswalk.js", "javascript"),
    ("api/score.js", "javascript"),
    ("api/vendor-tier.js", "javascript"),
    ("api/evidence.js", "javascript"),
    ("scripts/score_maturity.py", "python"),
    ("scripts/validate_crosswalk.py", "python"),
    ("scripts/run_demo.sh", "bash"),
    ("tests/assessment.test.js", "javascript"),
    ("tests/api.test.js", "javascript"),
    ("package.json", "json"),
    ("vercel.json", "json"),
    ("data/csf_scores.csv", "csv"),
    ("data/risk_register.csv", "csv"),
    ("data/poam.csv", "csv"),
    ("data/control_tests.csv", "csv"),
    ("data/evidence_log.csv", "csv"),
    ("data/crosswalk.csv", "csv"),
    ("README.md", "markdown"),
    ("DEMO_SCRIPT.md", "markdown"),
    ("CLAIM_MATRIX.md", "markdown"),
    ("DEPLOY.md", "markdown"),
]

HEADER = """# Northwind CSF 2.0 - Full Source Review Bundle

Single-file concat of the **full-stack** portfolio (frontend + serverless API + Python +
tests + data + docs) for external review. Generated for ChatGPT audit drag-and-drop.

**Integrity:** Northwind is fictional; assessment is simulated; readiness only - not audit/
compliance/attestation/client/production. Crosswalk = 4 row-level frameworks (800-53, ISO
27001:2022, SOC 2, HIPAA); no HITRUST row-level mapping is claimed. Overall maturity =
sum(23 subscores=36)/23 = 1.57 (subcategory-weighted, not the 1.53 simple mean).
"""


def safe_fence(text):
    runs = re.findall(r"`+", text)
    longest = max((len(r) for r in runs), default=0)
    return "`" * max(3, longest + 1)


def main():
    present = [(p, lang) for (p, lang) in FILES if os.path.isfile(os.path.join(ROOT, p))]
    missing = [p for (p, _) in FILES if not os.path.isfile(os.path.join(ROOT, p))]

    out = [HEADER, "\n## File inventory\n```"]
    for p in sorted(p for (p, _) in present):
        out.append(p)
    out.append("```\n")

    for p, lang in present:
        with open(os.path.join(ROOT, p), encoding="utf-8") as fh:
            body = fh.read().rstrip("\n")
        fence = safe_fence(body)
        out.append("\n---\n")
        out.append(f"## `{p}`\n")
        out.append(f"{fence}{lang}")
        out.append(body)
        out.append(fence)

    bundle = "\n".join(out) + "\n"
    dest = os.path.join(ROOT, "FRONTEND_REVIEW_BUNDLE.md")
    with open(dest, "w", encoding="utf-8") as fh:
        fh.write(bundle)

    print(f"Wrote {dest}")
    print(f"  {len(present)} files bundled, {len(bundle.splitlines())} lines")
    if missing:
        print("  WARNING missing (skipped): " + ", ".join(missing))


if __name__ == "__main__":
    main()
