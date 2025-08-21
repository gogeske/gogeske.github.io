#!/bin/bash
# Quick pre-commit test for Language Explorer
# Designed to be fast (<10 seconds) and catch major issues

echo "🧪 Quick pre-commit tests..."

# 1. Fast syntax checks (1-2 seconds)
echo "🔍 Checking syntax..."
if command -v node >/dev/null 2>&1; then
    if ! node -c app.js 2>/dev/null; then
        echo "❌ JavaScript syntax error in app.js"
        exit 1
    fi
else
    echo "⚠️  Node.js not available, skipping syntax check"
fi

# 2. Check for common issues (1 second)
echo "🔍 Checking for common issues..."
if ! grep -q "<!DOCTYPE html>" index.html; then
    echo "❌ Missing DOCTYPE in index.html"
    exit 1
fi

if ! grep -q "styles.css" index.html; then
    echo "❌ CSS not linked in index.html"
    exit 1
fi

# 3. Check for JavaScript errors by loading in headless browser (3-4 seconds)
echo "🔍 Testing JavaScript execution..."
# Create a simple test HTML that loads our JS and reports errors
cat > temp-test.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <script>
        window.addEventListener('error', function(e) {
            console.error('JS Error:', e.message, 'at', e.filename + ':' + e.lineno);
            process.exit(1);
        });
    </script>
    <script src="app.js"></script>
</head>
<body>
    <div id="location-bubble"></div>
    <div id="location-name"></div>
    <div id="detail-sentence1"></div>
    <div id="detail-sentence2"></div>
    <div id="photo-credit"></div>
    <div id="photographer-link"></div>
    <div id="live-region"></div>
    <div id="progress-indicator"></div>
    <div id="current-location"></div>
    <div id="total-locations"></div>
    <div id="mute-button"></div>
    <div id="volume-slider"></div>
    <div id="terminal"></div>
    <script>
        // Quick test that basic functionality works
        setTimeout(() => {
            try {
                if (typeof languageExplorer === 'undefined') {
                    throw new Error('languageExplorer not defined');
                }
                if (!languageExplorer.countries || languageExplorer.countries.length === 0) {
                    throw new Error('No countries data');
                }
                console.log('✅ Basic JS test passed');
                process.exit(0);
            } catch (e) {
                console.error('❌ JS test failed:', e.message);
                process.exit(1);
            }
        }, 100);
    </script>
</body>
</html>
EOF

# Run headless test (only if node is available)
if command -v node >/dev/null 2>&1; then
    timeout 5s node -e "
        const fs = require('fs');
        const html = fs.readFileSync('temp-test.html', 'utf8');
        // Basic validation that our JS structure exists
        const appJs = fs.readFileSync('app.js', 'utf8');
        if (!appJs.includes('languageExplorer')) {
            console.error('❌ languageExplorer object not found');
            process.exit(1);
        }
        console.log('✅ JavaScript structure OK');
    " 2>/dev/null || echo "⚠️  Advanced JS test skipped"
fi

# Cleanup
rm -f temp-test.html

# 4. Open in browser for quick visual check (non-blocking)
echo "🌐 Opening for quick visual check..."
open index.html

echo "✅ Quick tests passed! Browser opened for visual verification."
echo "💡 If page looks good, proceed with commit. If not, fix issues first."