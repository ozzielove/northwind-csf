#!/usr/bin/env python3
"""
validate_crosswalk.py - sanity-check control identifiers in the framework crosswalk.

Reads data/crosswalk.csv and validates every control identifier in the four
ROW-LEVEL frameworks with regular expressions:

    NIST SP 800-53 Rev 5 : two-letter family + number + optional enhancement   e.g. IA-2, SC-28, AC-6
    ISO/IEC 27001:2022   : A.<clause>[.<sub>]                                   e.g. A.5.1, A.8.24
    SOC 2 TSC            : Common Criteria CCx.y or Availability A1.z           e.g. CC6.1, A1.2
    HIPAA Security Rule  : §164.<section> with optional (a)(2)(i)-style suffix  e.g. §164.312(a)(2)(i)

HITRUST is intentionally NOT validated here because this repo exposes no
HITRUST row-level mapping data.

Exit code 0 if all IDs parse, 1 if any malformed ID is found.
Usage: python3 scripts/validate_crosswalk.py [--csv data/crosswalk.csv]
"""

import argparse
import csv
import os
import re
import sys

PATTERNS = {
    "nist_800_53": re.compile(r"^[A-Z]{2}-\d+(?:\(\d+\))?$"),
    "iso_27001":   re.compile(r"^A\.\d+(?:\.\d+)?$"),
    "soc2":        re.compile(r"^(?:CC\d+\.\d+|A\d+\.\d+|PI\d+\.\d+|C\d+\.\d+|P\d+\.\d+)$"),
    "hipaa":       re.compile(r"^§164\.\d+(?:\([A-Za-z0-9]+\))*$"),
}
LABELS = {
    "nist_800_53": "NIST 800-53", "iso_27001": "ISO 27001:2022",
    "soc2": "SOC 2", "hipaa": "HIPAA",
}


def repo_root():
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def split_ids(cell):
    # IDs are comma-separated within a cell, e.g. "PM-9, RA-1"
    return [tok.strip() for tok in (cell or "").split(",") if tok.strip()]


def main(argv=None):
    root = repo_root()
    parser = argparse.ArgumentParser(description="Validate crosswalk control IDs")
    parser.add_argument("--csv", default=os.path.join(root, "data", "crosswalk.csv"))
    args = parser.parse_args(argv)

    if not os.path.exists(args.csv):
        print(f"ERROR: crosswalk file not found: {args.csv}", file=sys.stderr)
        return 1

    totals = {k: 0 for k in PATTERNS}
    problems = []
    rows_seen = 0

    with open(args.csv, newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        for ln, row in enumerate(reader, start=2):
            rows_seen += 1
            sub = (row.get("sub") or "").strip()
            for col, pat in PATTERNS.items():
                for ident in split_ids(row.get(col)):
                    totals[col] += 1
                    if not pat.match(ident):
                        problems.append((ln, sub, LABELS[col], ident))

    print("─" * 58)
    print("  Crosswalk control-ID validation - Northwind CSF 2.0")
    print("  (simulated portfolio; 4 row-level frameworks)")
    print("─" * 58)
    print(f"  Rows checked .............. {rows_seen}")
    for col in PATTERNS:
        print(f"  {LABELS[col]:<16} IDs ...... {totals[col]:>3}")
    print(f"  Total IDs validated ....... {sum(totals.values())}")
    print("─" * 58)

    if problems:
        print(f"  {len(problems)} malformed identifier(s):")
        for ln, sub, fw, ident in problems:
            print(f"    line {ln}  {sub}  [{fw}]  -> '{ident}'")
        return 1

    print("  All control identifiers well-formed. ✓")
    return 0


if __name__ == "__main__":
    sys.exit(main())
