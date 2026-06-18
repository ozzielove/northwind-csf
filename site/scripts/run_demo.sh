#!/usr/bin/env bash
# run_demo.sh - one-shot interview demo of the offline scoring + validation tools.
# Runs the Python maturity scorer and the crosswalk validator end to end.
# Usage:  bash scripts/run_demo.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "=============================================================="
echo "  Northwind CSF 2.0 - offline demo (simulated portfolio data)"
echo "=============================================================="

echo
echo ">> 1/3  Maturity scoring"
python3 scripts/score_maturity.py

echo
echo ">> 2/3  Crosswalk ID validation"
python3 scripts/validate_crosswalk.py

echo
echo ">> 3/3  KPI summary (machine-readable)"
if command -v python3 >/dev/null 2>&1; then
  python3 -c "import json; d=json.load(open('outputs/kpi_summary.json')); print('   overall:', d['overallMaturity'], '| priority:', ', '.join(d['priorityFunctions']))"
fi

echo
echo "Done. JSON at outputs/kpi_summary.json"
