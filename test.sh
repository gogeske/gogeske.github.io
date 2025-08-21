#!/bin/bash
# Simple test script for Language Explorer

echo "🧪 Running basic tests..."

# Check if required files exist
echo "📁 Checking files..."
if [ ! -f "index.html" ]; then echo "❌ index.html missing"; exit 1; fi
if [ ! -f "app.js" ]; then echo "❌ app.js missing"; exit 1; fi
if [ ! -f "styles.css" ]; then echo "❌ styles.css missing"; exit 1; fi
if [ ! -f "sw.js" ]; then echo "❌ sw.js missing"; exit 1; fi
echo "✅ All files present"

# Check for basic syntax issues
echo "🔍 Checking JavaScript syntax..."
node -c app.js && echo "✅ JavaScript syntax OK" || echo "❌ JavaScript syntax error"

# Check HTML structure
echo "🔍 Checking HTML structure..."
if grep -q "<!DOCTYPE html>" index.html; then
    echo "✅ HTML doctype OK"
else
    echo "❌ HTML doctype missing"
fi

# Check CSS file is linked
echo "🔍 Checking CSS link..."
if grep -q "styles.css" index.html; then
    echo "✅ CSS linked correctly"
else
    echo "❌ CSS link missing"
fi

# Open in browser for manual testing
echo "🌐 Opening in browser for manual testing..."
open index.html

echo "✅ Basic tests complete! Check browser for functionality."