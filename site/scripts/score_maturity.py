#!/usr/bin/env python3
"""
score_maturity.py - Northwind CSF 2.0 maturity scorer.

Reads the assessed CSF subcategory scores from data/csf_scores.csv, computes
per-Function maturity and the subcategory-WEIGHTED overall maturity, identifies
the priority (lowest) Functions, writes a machine-readable KPI summary to
outputs/kpi_summary.json, and prints a console summary suitable for a live demo.

Scoring rule: overall = sum(all subcategory scores) / count(subcategories).
For the shipped data this is 36 / 23 = 1.565 -> 1.57. This is intentionally NOT
the simple mean of the six Function means (which is 1.53).

Usage:
    python3 scripts/score_maturity.py
    python3 scripts/score_maturity.py --csv data/csf_scores.csv --out outputs/kpi_summary.json

Simulated portfolio engagement. Northwind Health Systems is fictional.
"""

import argparse
import csv
import json
import os
import sys

PROJECT = "Northwind CSF 2.0 GRC Assessment"
DISCLAIMER = ("Simulated portfolio engagement. Northwind Health Systems is fictional. "
              "Readiness assessment - not a SOC 2 audit, HIPAA attestation, or real client work.")

FN_NAMES = {"GV": "Govern", "ID": "Identify", "PR": "Protect",
            "DE": "Detect", "RS": "Respond", "RC": "Recover"}
FN_ORDER = ["GV", "ID", "PR", "DE", "RS", "RC"]


def tier_for(score):
    if score is None:
        return "Unscored"
    if score < 1.5:
        return "Tier 1 · Partial"
    if score < 2.5:
        return "Tier 2 · Risk Informed"
    if score < 3.5:
        return "Tier 3 · Repeatable"
    return "Tier 4 · Adaptive"


def repo_root():
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_scores(csv_path):
    """Return list of (function, subcategory, score). Raises on fatal problems."""
    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"CSF score file not found: {csv_path}")

    rows = []
    with open(csv_path, newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        required = {"function", "subcategory", "score"}
        if reader.fieldnames is None or not required.issubset({c.strip() for c in reader.fieldnames}):
            raise ValueError(f"CSV must have columns {sorted(required)}; got {reader.fieldnames}")
        for ln, raw in enumerate(reader, start=2):
            fn = (raw.get("function") or "").strip()
            sub = (raw.get("subcategory") or "").strip()
            val = (raw.get("score") or "").strip()
            if not fn and not sub and not val:
                continue  # skip blank line
            if fn not in FN_NAMES:
                print(f"  ! line {ln}: unknown Function '{fn}' - skipped", file=sys.stderr)
                continue
            try:
                score = float(val)
            except ValueError:
                print(f"  ! line {ln} ({sub}): non-numeric score '{val}' - skipped", file=sys.stderr)
                continue
            if not (1 <= score <= 4):
                print(f"  ! line {ln} ({sub}): score {score} out of range 1-4 - skipped", file=sys.stderr)
                continue
            rows.append((fn, sub, score))

    if not rows:
        raise ValueError("No valid score rows parsed.")
    return rows


def compute(rows):
    buckets = {}
    total = 0.0
    for fn, sub, score in rows:
        buckets.setdefault(fn, []).append(score)
        total += score
    count = len(rows)

    functions = []
    for fn in FN_ORDER:
        if fn not in buckets:
            continue
        arr = buckets[fn]
        avg = round(sum(arr) / len(arr), 2)
        functions.append({
            "key": fn, "name": FN_NAMES[fn], "score": avg,
            "assessed": len(arr), "tier": tier_for(avg), "priority": False,
        })

    overall = round(total / count, 2)
    floor = min(f["score"] for f in functions)
    for f in functions:
        f["priority"] = abs(f["score"] - floor) < 1e-9
    priority = [f["name"] for f in functions if f["priority"]]
    simple_mean = round(sum(f["score"] for f in functions) / len(functions), 2)

    return {
        "project": PROJECT,
        "mode": "simulated-portfolio",
        "disclaimer": DISCLAIMER,
        "functions": functions,
        "overallMaturity": overall,
        "overallTier": tier_for(overall),
        "assessedSubcategories": count,
        "functionsScored": len(functions),
        "priorityFunctions": priority,
        "method": "subcategory-weighted (sum of subcategory scores ÷ assessed count)",
        "kpi": {"totalPoints": round(total, 2), "subcategoryCount": count,
                "simpleMeanOfFunctions": simple_mean},
    }


def bar(score, width=20):
    filled = int(round((score / 4) * width))
    return "█" * filled + "·" * (width - filled)


def print_summary(result):
    line = "─" * 60
    print(line)
    print(f"  {result['project']}")
    print(f"  {result['disclaimer']}")
    print(line)
    print(f"  Per-Function maturity (1 Partial → 4 Adaptive):\n")
    for f in result["functions"]:
        flag = "  ◀ PRIORITY" if f["priority"] else ""
        print(f"    {f['key']}  {f['name']:<9} {f['score']:.2f}  [{bar(f['score'])}]  "
              f"{f['tier']}{flag}")
    print()
    print(f"  Overall maturity .......... {result['overallMaturity']:.2f} / 4.00  "
          f"({result['overallTier']})")
    print(f"  Method .................... {result['method']}")
    print(f"  Assessed subcategories .... {result['assessedSubcategories']}")
    print(f"  Functions scored .......... {result['functionsScored']}")
    print(f"  Priority remediation ...... {', '.join(result['priorityFunctions'])}")
    print(f"  (Simple mean of Functions . {result['kpi']['simpleMeanOfFunctions']:.2f} - "
          f"shown only to contrast; not the reported number)")
    print(line)


def main(argv=None):
    root = repo_root()
    parser = argparse.ArgumentParser(description="Northwind CSF 2.0 maturity scorer")
    parser.add_argument("--csv", default=os.path.join(root, "data", "csf_scores.csv"))
    parser.add_argument("--out", default=os.path.join(root, "outputs", "kpi_summary.json"))
    args = parser.parse_args(argv)

    try:
        rows = load_scores(args.csv)
        result = compute(rows)
    except (FileNotFoundError, ValueError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as fh:
        json.dump(result, fh, indent=2, ensure_ascii=False)

    print_summary(result)
    print(f"  KPI summary written → {os.path.relpath(args.out, root)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
