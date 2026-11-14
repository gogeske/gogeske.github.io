#!/bin/bash
# Stamp, check and commit the homepage.
# Usage: ./commit.sh "message"     (./commit.sh --stamp only refreshes the CSP hashes)
#
# index.html and language-quiz/index.html carry their CSS and JS inline, and their Content-Security-Policy
# allows them by hash. Any edit to the <style> or <script> block changes the
# hash, so the pages must be re-stamped or the browser will refuse to run it.
set -e
cd "$(dirname "$0")"

if [ -z "$1" ]; then
    echo "Usage: ./commit.sh \"commit message\" | --stamp"
    exit 1
fi
command -v node >/dev/null 2>&1 || { echo "Node.js is required to stamp the CSP hashes"; exit 1; }

node - <<'JS'
const fs = require('fs'), crypto = require('crypto');
for (const file of ['index.html', 'language-quiz/index.html']) {
  let html = fs.readFileSync(file, 'utf8');
  const hash = (tag) => {
    const m = html.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
    if (!m) throw new Error(`no inline <${tag}> in ${file}`);
    if (tag === 'script') new Function(m[1]); // syntax check
    return crypto.createHash('sha256').update(m[1]).digest('base64');
  };
  html = html
    .replace(/style-src 'sha256-[^']*'/, `style-src 'sha256-${hash('style')}'`)
    .replace(/script-src 'sha256-[^']*'/, `script-src 'sha256-${hash('script')}'`);
  fs.writeFileSync(file, html);
  console.log(`${file} stamped, ${Buffer.byteLength(html)} bytes`);
}
JS

[ "$1" = "--stamp" ] && exit 0

git add -A
git commit -m "$1"
read -p "Push to GitHub? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then git push; fi
