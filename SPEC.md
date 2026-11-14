# gogeske.com homepage: Which language?

## What it is

A language guessing game. Die Sendung mit der Maus opens in German, then repeats
its intro in another language, and the family guesses which one. This page is
that moment: press play, hear a hello, pick the language.

## Design rule

Super fast and minimal. One thing to do on screen at any time. Great on a phone
and on a desktop.

## How it plays

- Start screen: one play button.
- Each round speaks a short greeting (Web Speech API) and shows it in writing,
  with four languages to choose from. Tap the phrase to hear it again.
- The answer is revealed straight away ("Das war Türkisch.") and the next round
  starts on its own; tap to skip the wait.
- Streak and best streak are shown under the answers. Best is kept in
  localStorage (`best`); nothing else is stored.
- Difficulty ramps: one wrong answer is always a lookalike from the same group
  (Romance, Germanic, Slavic, ...); every three correct in a row adds another.
- No language repeats until all have been played.
- 34 languages. Only languages the device has a voice for are played. If the
  device has fewer than 8 matching voices, all 34 are played from the writing
  alone.
- UI is German when the browser language is German, English otherwise. Language
  names come from `Intl.DisplayNames`, with English names as fallback.
- Keyboard: Enter or Space starts, 1-4 answers, R repeats. D and S open
  Daniel's and Stephanie's LinkedIn profiles (carried over from the old page).

## Architecture

- `index.html`: the whole page, CSS and JS inline. One request, no images, no
  fonts, no third parties. About 10 KB raw, 5 KB gzipped.
- `sw.js`: retired service worker. It exists only to remove the old
  image-caching worker from returning visitors' browsers: it deletes the
  homepage's caches, unregisters itself and reloads open homepage tabs. It
  leaves caches starting with `brewdose` or `diplo` alone. Do not delete it.
- `commit.sh`: stamps the CSP hashes and commits.
- Sub-apps live in their own folders (`/brew-dose/`, ...) with their own
  service workers scoped to their folder. The root must never register a
  service worker again, since its scope would sit over every sub-app.

## Editing

The Content-Security-Policy in `index.html` allows the inline `<style>` and
`<script>` by SHA-256 hash. After any edit to either block run
`./commit.sh --stamp` (or commit through `./commit.sh "message"`), otherwise
browsers will refuse to run the page.

Updates reach visitors through normal HTTP caching: GitHub Pages serves the
page with a ten-minute max-age, and nothing else caches it.

## Adding a language

Add a row to `L` in `index.html`: language code, English name, lookalike group,
voice prefixes (lowercase BCP 47, most specific first), phrase.
