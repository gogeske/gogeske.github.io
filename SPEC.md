# gogeske.com

## Homepage: Hello World

A language guessing game for the sofa. Die Sendung mit der Maus opens in
German, then repeats its intro in another language, and the family guesses
which one. The homepage is that moment: a photo of somewhere in the world, a
voice saying hello, everyone guesses out loud.

### Design rule

Super fast and minimal. Photo, voice, one hint bubble. Great on a phone and on
a desktop.

### How it plays

- The page opens on a full-screen photo with a play button. First tap starts
  the voice (browsers require a tap before they speak).
- The guess is made out loud. Nothing is typed or picked.
- Hints are a ladder, on the bubble top left: first tap shows the place
  ("Dubai, United Arab Emirates"), second tap shows the answer: the language,
  the phrase in writing and what it means.
- Tap anywhere on the photo to hear it again. The arrow, a swipe left or the
  right arrow key goes to the next place; swipe right or left arrow goes back.
- Keyboard: Space or Enter listens, Right/Left moves, `.` or H or Down opens
  the next hint, D and S open Daniel's and Stephanie's LinkedIn.
- 34 places. No place repeats until all have been played.
- Voice: Web Speech API. For each language the best installed voice is chosen
  (right region first, enhanced/natural voices preferred, Apple's novelty
  voices avoided). Places the device has no voice for are skipped. If speech is
  unavailable or fails, the phrase is shown in writing instead.
- UI is German when the browser language is German, English otherwise. Country
  and language names come from `Intl.DisplayNames`.

### Architecture

- `index.html`: the whole page, CSS and JS inline. One request, about 15 KB
  raw.
- Photos are hotlinked from `images.unsplash.com`, sized to the screen
  (`w`, `h`, `q=60`, `auto=format`). Each place first paints a 48 px blurred
  placeholder, then the full photo. Only the next photo is preloaded, and only
  once the game has started. The page is usable before any photo arrives.
- `sw.js`: retired service worker. It exists only to remove the old
  image-caching worker from returning visitors' browsers: it deletes the
  homepage's caches, unregisters itself and reloads open homepage tabs. It
  leaves caches starting with `brewdose` or `diplo` alone. Do not delete it.
- The root must never register a service worker again, since its scope would
  sit over every sub-app.

### Adding a place

Add a row to `P` in `index.html`: language tag, voice prefixes (lowercase,
most specific first), city, German city name or 0, country code, Unsplash
photo id, photographer, Unsplash handle, phrase, meaning `[en, de]`.

## Sub-apps

Each lives in its own folder and is self-contained.

- `/language-quiz/`: multiple-choice version of the game with streaks.
  One file, no images.
- `/brew-dose/`: own service worker, scoped to its folder.

## Editing

`index.html` and `language-quiz/index.html` allow their inline `<style>` and
`<script>` by SHA-256 hash in a Content-Security-Policy. After any edit to
either block run `./commit.sh --stamp` (or commit through
`./commit.sh "message"`), otherwise browsers will refuse to run the page.

Updates reach visitors through normal HTTP caching: GitHub Pages serves pages
with a ten-minute max-age, and nothing else caches them.
