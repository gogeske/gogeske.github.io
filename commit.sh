#!/bin/bash
# Simple commit script with optional testing
# Usage: 
#   ./commit.sh "message"           # Quick commit (syntax check only)
#   ./commit.sh "message" --test    # Full testing before commit

if [ -z "$1" ]; then
    echo "Usage: ./commit.sh \"commit message\" [--test]"
    exit 1
fi

FULL_TEST=false
if [ "$2" = "--test" ]; then
    FULL_TEST=true
fi

# Always do basic checks
echo "🔍 Basic checks..."

# Syntax check with Node.js
if command -v node >/dev/null 2>&1; then
    if ! node -c app.js 2>/dev/null; then
        echo "❌ JavaScript syntax error in app.js"
        exit 1
    fi
    echo "✅ JavaScript syntax OK"
else
    echo "⚠️  Node.js not available, skipping syntax check"
fi

# Structure checks
if ! grep -q "languageExplorer" app.js; then
    echo "❌ Missing languageExplorer object"
    exit 1
fi

if ! grep -q "<!DOCTYPE html>" index.html; then
    echo "❌ Missing DOCTYPE in index.html"
    exit 1
fi

if ! grep -q "styles.css" index.html; then
    echo "❌ CSS not linked in index.html"
    exit 1
fi

echo "✅ Structure checks passed"

# Full testing if requested
if [ "$FULL_TEST" = true ]; then
    echo "🧪 Full testing mode..."
    echo "🌐 Opening browser for verification..."
    open index.html
    echo ""
    read -p "✅ Does everything look good? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Commit cancelled."
        exit 1
    fi
fi

echo "🚀 Committing..."
git add .
git commit -m "$1"

read -p "🌐 Push to GitHub? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git push
    echo "✅ Done!"
else
    echo "📝 Committed locally."
fi