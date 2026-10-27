# Kodigo

Learn by Coding, Improve by Building

Kodigo is a responsive, accessible Python and Java learning app built with plain HTML, CSS, and vanilla JavaScript. It has no build step or npm dependencies.

## Run Kodigo

Double-click `index.html` to run Kodigo directly from the file system in Chrome. The app uses ordered classic scripts and the global `window.Kodigo` namespace, so it does not need a server, build tools, or local-file fetches. VS Code Live Server also works. Python code quizzes use Pyodide and need an internet connection the first time they run.

## Navigation

- Choose Python or Java in the header; each language opens its History page first. The sidebar pins History above topics grouped by Beginner, Intermediate, and Advanced.
- A topic route is `#/python/<topic-id>` or `#/java/<topic-id>`. Visiting `#/python` or `#/java` redirects to `#/python/history` or `#/java/history`. The last-opened topic is available as a small continue button on History.
- The Quiz button opens `#/quiz`; choose a language to start a 20-question mixed quiz.
- Error Decoder is at `#/error-decoder`; pinned snippets are at `#/kodigo-ko`.
- Language, last-opened topics, progress, pins, and theme are stored locally, with in-memory fallbacks when browser storage is unavailable.

## Add a Topic or Lesson

Add a topic object to the appropriate language's `topics` array in `data/curriculum.js`. Give it a continuous `n`, a lowercase kebab-case `id`, an exact title, a level, and a one-sentence Taglish summary. The app warns in the console when a curriculum topic has no registered lesson.

For a full lesson, add `data/lessons/<language>/<topic-id>.js`, register it as `K.lessons["<language>/<topic-id>"]`, and include one classic script tag in the lesson registry block in `index.html`, before the utility and app scripts. Lesson objects include `id`, `title`, `language`, `n`, `summary`, and code-first `sections`, plus optional practice-feature fields. Every topic also gets a difficulty-based coding challenge with hints and saved points, a step-through memory view based on its `trace` snapshots, and a test-case playground. Set `editable.starter` and `editable.expectedOutput` to provide a useful default for the playground.

Python runs in the browser with Pyodide. Java execution and its test cases send the submitted source and stdin to the Piston endpoint configured in `js/features/runner.js`. Java execution stays disabled until an authorized or self-hosted endpoint is configured; do not embed API keys in this static frontend. The public Piston API now requires authorization.

## Add Quiz Questions

Quiz banks are `data/quiz/python.js` and `data/quiz/java.js`, registered in `index.html`. The quiz engine accepts per-type arrays and a unified array with a `type` field. It mixes question types, balances levels when available, and shuffles MC options. Python code questions compare output using the existing Web Worker Pyodide runner. Java code questions use all supplied regex `patterns` while the Java runner is disabled.

## Script Order

`index.html` loads curriculum, shared data, quiz banks, lessons, storage and routing utilities, lesson features, lesson lookup, sidebar and drawer UI, and finally `js/main.js`. Scripts are classic deferred scripts; do not use ES modules or local `fetch()`.

All explanations and feedback should stay short and Taglish; code, keywords, and error text stay in English. Use `python` or `java` directory names and lowercase kebab-case topic IDs.
