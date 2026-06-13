#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# push-to-github.sh  —  Upload portfolio to a new GitHub repo
# ═══════════════════════════════════════════════════════════════
# Usage:
#   1. Create a blank repo on github.com (no README, no .gitignore)
#   2. Copy the SSH or HTTPS remote URL shown by GitHub
#   3. Run:  bash push-to-github.sh <remote-url>
#
# Example:
#   bash push-to-github.sh https://github.com/yourname/portfolio.git
#   bash push-to-github.sh git@github.com:yourname/portfolio.git
# ═══════════════════════════════════════════════════════════════

set -euo pipefail

REMOTE="${1:-}"

if [[ -z "$REMOTE" ]]; then
  echo ""
  echo "  ✗  Please provide your GitHub remote URL as the first argument."
  echo ""
  echo "  Usage:"
  echo "    bash push-to-github.sh https://github.com/yourname/portfolio.git"
  echo ""
  exit 1
fi

echo ""
echo "  → Renaming branch to 'main'…"
git branch -m master main 2>/dev/null || true

echo "  → Adding remote origin…"
git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE"

echo "  → Pushing to GitHub…"
git push -u origin main

echo ""
echo "  ✓  Done! Your portfolio is live on GitHub."
echo ""
echo "  Next steps:"
echo "    • Go to Settings → Pages → Deploy from 'main' branch root"
echo "      to get a free GitHub Pages URL like:"
echo "      https://yourname.github.io/portfolio/"
echo ""
