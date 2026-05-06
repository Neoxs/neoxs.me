#!/usr/bin/env bash
# CI workflow summary helpers for .github/workflows/ci.yml (publish-summary job).
# Usage:
#   ci-publish-summary.sh write-images
#   ci-publish-summary.sh append-trivy <report.json> <app-label>
set -euo pipefail

write_images() {
  : "${GITHUB_STEP_SUMMARY:?}"
  : "${SHA:?}"
  : "${REF_NAME:?}"
  : "${REPO:?}"

  local short_sha="${SHA:0:7}"

  {
    echo "## CI summary — container images"
    echo ""
    echo "Commit [\`${short_sha}\`](https://github.com/${REPO}/commit/${SHA}) on \`${REF_NAME}\`"
    echo ""
    echo "### Images pushed to GHCR"
    echo ""
    echo "| App | Build | Tags | Immutable reference |"
    echo "|-----|-------|------|---------------------|"
  } >>"$GITHUB_STEP_SUMMARY"

  print_row() {
    local app="$1" st="$2" tags="$3" pin="$4"
    case "$st" in
      success)
        local tg="${tags:-—}"
        local pi="${pin:-—}"
        echo "| \`${app}\` | pushed | \`${tg}\` | \`${pi}\` |" >>"$GITHUB_STEP_SUMMARY"
        ;;
      skipped)
        echo "| \`${app}\` | skipped (unchanged paths) | — | — |" >>"$GITHUB_STEP_SUMMARY"
        ;;
      *)
        echo "| \`${app}\` | ${st} | — | — |" >>"$GITHUB_STEP_SUMMARY"
        ;;
    esac
  }

  print_row shell "${RS:-}" "${TS:-}" "${PS:-}"
  print_row mfe-blog "${RB:-}" "${TB:-}" "${PB:-}"
  print_row mfe-lab "${RL:-}" "${TL:-}" "${PL:-}"
  print_row mfe-infra "${RI:-}" "${TI:-}" "${PI:-}"

  echo "" >>"$GITHUB_STEP_SUMMARY"
}

append_trivy() {
  local report="$1"
  local app="$2"
  : "${GITHUB_STEP_SUMMARY:?}"

  if [[ ! -f "$report" ]]; then
    {
      echo "### Trivy — \`${app}\`"
      echo ""
      echo "_Scan did not produce \`${report}\` (see Trivy step log)._"
      echo ""
    } >>"$GITHUB_STEP_SUMMARY"
    return 0
  fi

  local total crit high
  total=$(jq '[.Results[]?.Vulnerabilities[]?] | length' "$report")
  crit=$(jq '[.Results[]?.Vulnerabilities[]? | select(.Severity=="CRITICAL")] | length' "$report")
  high=$(jq '[.Results[]?.Vulnerabilities[]? | select(.Severity=="HIGH")] | length' "$report")

  {
    echo "### Trivy — \`${app}\`"
    echo ""
    echo "**Summary:** ${total} findings (CRITICAL: ${crit}, HIGH: ${high})"
    echo ""
    echo "_Informational only; does not fail CI (same filters as before: CRITICAL/HIGH, ignore-unfixed)._"
    echo ""
    if [[ "${total}" -eq 0 ]]; then
      echo "_No matching findings._"
      echo ""
    else
      echo "<details><summary>Findings</summary>"
      echo ""
      echo "| ID | Severity | Package | Installed |"
      echo "|----|----------|---------|-----------|"
      jq -r '.Results[]? | .Vulnerabilities[]? | "| \(.VulnerabilityID // .Title // "—") | \(.Severity) | \(.PkgName) | \(.InstalledVersion) |"' "$report"
      echo ""
      echo "</details>"
      echo ""
    fi
  } >>"$GITHUB_STEP_SUMMARY"
}

usage() {
  echo "Usage: $0 write-images | append-trivy <report.json> <app-label>" >&2
  exit 1
}

main() {
  local cmd="${1:-}"
  [[ -n "$cmd" ]] || usage
  shift || true

  case "$cmd" in
    write-images)
      write_images
      ;;
    append-trivy)
      [[ "$#" -eq 2 ]] || usage
      append_trivy "$1" "$2"
      ;;
    *)
      usage
      ;;
  esac
}

main "$@"
