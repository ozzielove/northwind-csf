#!/usr/bin/env python3
"""
NIST CSF 2.0 Maturity Scorer + GRC KPI Dashboard
================================================
Reads a CSV of assessed CSF subcategory scores and reports per-Function and
overall program maturity with a text dashboard. When the sibling POA&M and
evidence artifacts are present, it also emits a one-page GRC metrics summary
(findings by severity, POA&M past-due, remediation status, evidence freshness)
of the kind a GRC analyst reports to leadership.

Usage:
    python3 csf_maturity_score.py ../02_controls/csf_scores.csv

CSV format (header required):
    function,subcategory,score
    GV,GV.OC-01,2
    ...

Score scale (NIST CSF 2.0 Tiers):
    0 Not implemented | 1 Partial | 2 Risk Informed | 3 Repeatable | 4 Adaptive
"""
import csv
import os
import sys
from collections import Counter, defaultdict
from datetime import date, datetime

FUNCTIONS = {
    "GV": "Govern",
    "ID": "Identify",
    "PR": "Protect",
    "DE": "Detect",
    "RS": "Respond",
    "RC": "Recover",
}

TIERS = {
    0: "Not Implemented",
    1: "Tier 1 - Partial",
    2: "Tier 2 - Risk Informed",
    3: "Tier 3 - Repeatable",
    4: "Tier 4 - Adaptive",
}

CLOSED_STATUSES = {"completed", "closed", "done", "remediated"}


def tier_label(avg: float) -> str:
    """Map a numeric average to the nearest CSF tier label."""
    return TIERS[round(avg)]


def bar(avg: float, width: int = 20) -> str:
    """Render an ADHD-friendly progress bar out of max score 4."""
    filled = int(round((avg / 4) * width))
    return "█" * filled + "░" * (width - filled)


def load_scores(path: str):
    scores = defaultdict(list)
    with open(path, newline="") as f:
        reader = csv.DictReader(f)
        required = {"function", "subcategory", "score"}
        if not required.issubset(reader.fieldnames or []):
            sys.exit(f"ERROR: CSV must have columns {required}; got {reader.fieldnames}")
        for row in reader:
            try:
                scores[row["function"].strip().upper()].append(int(row["score"]))
            except ValueError:
                sys.exit(f"ERROR: non-integer score for {row.get('subcategory')!r}")
    if not scores:
        sys.exit("ERROR: no data rows found.")
    return scores


def repo_root_from(scores_path: str) -> str:
    """Repo root = parent of the directory holding csf_scores.csv (e.g. 02_controls/)."""
    base = os.path.dirname(os.path.abspath(scores_path))
    return os.path.dirname(base)


def load_poam(repo_root: str):
    """Return list of POA&M rows, or None if the file is absent."""
    path = os.path.join(repo_root, "05_remediation", "poam.csv")
    if not os.path.exists(path):
        return None
    with open(path, newline="") as f:
        return list(csv.DictReader(f))


def count_evidence(repo_root: str):
    """Count evidence items in the markdown evidence log; returns (count, period) or None."""
    path = os.path.join(repo_root, "evidence", "evidence_collection_log.md")
    if not os.path.exists(path):
        return None
    count = 0
    periods = set()
    with open(path) as f:
        for line in f:
            cells = [c.strip() for c in line.split("|")]
            if len(cells) > 1 and cells[1].upper().startswith("EV-"):
                count += 1
                if len(cells) >= 6:
                    periods.add(cells[5])
    period = ", ".join(sorted(periods)) if periods else "n/a"
    return count, period


def _parse_date(value: str):
    for fmt in ("%Y-%m-%d", "%m/%d/%Y"):
        try:
            return datetime.strptime(value.strip(), fmt).date()
        except (ValueError, AttributeError):
            continue
    return None


def print_maturity(scores):
    print("\n" + "=" * 62)
    print("  NIST CSF 2.0 PROGRAM MATURITY ASSESSMENT")
    print("=" * 62)
    print(f"  {'Function':<12}{'Score':<8}{'Maturity':<24}Progress")
    print("-" * 62)

    all_scores = []
    for code, name in FUNCTIONS.items():
        vals = scores.get(code, [])
        if not vals:
            continue
        avg = sum(vals) / len(vals)
        all_scores.extend(vals)
        print(f"  {name:<12}{avg:<8.2f}{tier_label(avg):<24}{bar(avg)}")

    overall = sum(all_scores) / len(all_scores)
    print("-" * 62)
    print(f"  {'OVERALL':<12}{overall:<8.2f}{tier_label(overall):<24}{bar(overall)}")
    print("=" * 62)

    func_avgs = {
        name: sum(scores[code]) / len(scores[code])
        for code, name in FUNCTIONS.items()
        if scores.get(code)
    }
    weakest = sorted(func_avgs.items(), key=lambda kv: kv[1])[:2]
    print("  PRIORITY (lowest-maturity Functions):")
    for name, avg in weakest:
        print(f"    -> {name} ({avg:.2f}) - sequence first in POA&M")
    print(f"\n  Subcategories assessed: {len(all_scores)}")
    print("  Target state: Tier 3 (Repeatable) across all Functions.")
    return overall


def print_kpis(repo_root: str, overall: float):
    """One-page GRC metrics summary, if the supporting artifacts exist."""
    poam = load_poam(repo_root)
    evidence = count_evidence(repo_root)
    if poam is None and evidence is None:
        return

    print("\n" + "=" * 62)
    print("  GRC PROGRAM METRICS (executive summary)")
    print("=" * 62)

    if poam is not None:
        total = len(poam)
        sev = Counter((r.get("severity") or "Unknown").strip() for r in poam)
        status = Counter((r.get("status") or "Unknown").strip() for r in poam)

        today = date.today()
        past_due = 0
        for r in poam:
            st = (r.get("status") or "").strip().lower()
            if st in CLOSED_STATUSES:
                continue
            due = _parse_date(r.get("scheduled_completion", ""))
            if due and due < today:
                past_due += 1

        closed = sum(v for k, v in status.items() if k.lower() in CLOSED_STATUSES)
        pct_closed = (closed / total * 100) if total else 0.0

        print(f"  Remediation items (POA&M):   {total}")
        order = ["Critical", "High", "Moderate", "Low"]
        sev_line = "  ".join(
            f"{k}: {sev[k]}" for k in order if sev.get(k)
        )
        extra = "  ".join(
            f"{k}: {v}" for k, v in sev.items() if k not in order
        )
        print(f"  Open findings by severity:   {sev_line}" + (f"  {extra}" if extra else ""))
        status_line = "  ".join(f"{k}: {v}" for k, v in status.items())
        print(f"  Remediation status:          {status_line}")
        print(f"  Closed / verified:           {closed} of {total} ({pct_closed:.0f}%)")
        flag = "  <-- ATTENTION" if past_due else "  (on track)"
        print(f"  Past-due items (as of {today}): {past_due}{flag}")

    if evidence is not None:
        count, period = evidence
        print(f"  Evidence items on file:      {count}  (collected: {period})")

    print("-" * 62)
    readiness = (
        "Tier 3 target NOT yet met - remediation in progress"
        if overall < 3
        else "At/above Tier 3 target"
    )
    print(f"  Program readiness:           {readiness}")
    print("  Reporting cadence:           quarterly to leadership; POA&M reviewed monthly.")
    print("=" * 62 + "\n")


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    scores_path = sys.argv[1]
    scores = load_scores(scores_path)
    overall = print_maturity(scores)
    print_kpis(repo_root_from(scores_path), overall)


if __name__ == "__main__":
    main()
