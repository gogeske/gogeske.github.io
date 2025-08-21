#!/bin/bash
# Fast commit script for confident changes
# Usage: ./fast-commit.sh "commit message"

if [ -z "$1" ]; then
    echo "❌ Please provide a commit message"
    echo "Usage: ./fast-commit.sh \"your commit message\""
    exit 1
fi

echo "⚡ Fast commit mode - running essential tests only..."

# Run only the fastest critical tests
echo "🔍 Syntax check..."
if ! node -c app.js 2>/dev/null; then
    echo "❌ JavaScript syntax error in app.js"
    exit 1
fi

echo "🔍 Basic structure check..."
if ! grep -q "languageExplorer" app.js; then
    echo "❌ Missing languageExplorer object"
    exit 1
fi

echo "✅ Essential tests passed!"
echo "🚀 Committing and pushing..."

git add .
git commit -m "$1"
git push

echo "🎉 Fast commit complete! Changes are live."
echo "💡 Use ./safe-commit.sh for thorough testing when making major changes"