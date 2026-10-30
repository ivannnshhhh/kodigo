// Main application rendering, navigation, and interaction handlers.
(function (K) {
const curriculum = K.curriculum;
const allLessons = K.allLessons;
const copy = K.copy;
const { readRoute, navigate, startRouter } = K.router;
const { getProgress, saveProgress, getPins, savePins, togglePin, markComplete, getTheme, saveTheme, getNav, saveNav } = K.store;
const loadLesson = K.lessonData.loadLesson;
const escapeHtml = K.features.escapeHtml;
const renderCode = K.features.annotatedCode.renderCode;
const { runCode, runPython } = K.features.runner;
const { renderPredictions } = K.features.predictOutput;
const { normalizeCode, renderDebug } = K.features.debugMode;
const { renderReorder } = K.features.reorderLines;
const { renderFillBlanks } = K.features.fillBlanks;
const { renderMiniProject } = K.features.miniProject;
const { renderChallenge, renderMemory, renderPlayground } = K.features.practice;
const { replayAnimation } = K.features.animations;
const { renderKodigoCard } = K.features.kodigoCard;

const main = document.querySelector("#main");
const toast = document.querySelector("#toast");
let activeLesson;
let renderToken = 0;
let toastTimer;
let searchTimer;
let resizeTimer;
let quizState = null;
let memoryStep = 0;
let touchCodeDrag = null;

function resolveNavState(route) {
  const stored = getNav();
  return saveNav({ ...stored, lang: route.language && curriculum[route.language] ? route.language : stored.lang });
}

function renderNav(route, state) {
  if (!["home", "quiz", "quiz-language"].includes(route.page)) K.ui.nav.renderSidebar(route, state, getProgress());
  document.querySelectorAll("[data-nav-lang]").forEach(button => {
    const selected = ["lesson", "history"].includes(route.page) && button.dataset.navLang === state.lang;
    button.setAttribute("aria-checked", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
}

function footer() {
  return `<footer class="site-footer"><span>${K.i18n.t("footerCredit")}</span></footer>`;
}

function renderChallenges(challenges = []) {
  if (!challenges.length) return "";
  const english = K.i18n.language === "en";
  const text = (value, fallback) => K.i18n.lessonText(value, fallback);
  return `<section class="content-section panel" id="code-challenges"><div><span class="eyebrow">${K.i18n.t("handsOn")}</span><h2>${english ? "Code drills" : "Code drills"}</h2><p class="muted">${english ? "Try each task without copying, then run your code and check the output." : "Subukan muna nang walang kopya, saka i-run at i-check ang output."}</p></div><ol class="code-challenge-list">${challenges.slice(0, 2).map(challenge => `<li><strong>${escapeHtml(text(challenge.title, "Practice task"))}</strong><p>${escapeHtml(text(challenge.task, "Apply the lesson concept in your own code."))}</p><p class="muted"><strong>${english ? "Check:" : "Check:"}</strong> ${escapeHtml(text(challenge.check, "Run the code and compare its output with the expected result."))}</p></li>`).join("")}</ol></section>`;
}

function commonMistakesFor(lesson) {
  const library = {
    "python:variables-and-data-types": ["Pinagdudugtong ang text at number", "Gamitin ang str(number) bago idugtong sa text."],
    "python:input-and-output": ["Hindi kino-convert ang input", "input() ay text; gumamit ng int() o float() kapag number ang kailangan."],
    "python:operators": ["Maling operator sa comparison", "Gamitin ang == para mag-compare; = ay para mag-assign."],
    "python:conditional-statements": ["Walang colon o mali ang indentation", "Tapusin ang if/elif/else sa : at i-indent ang body."],
    "python:loops": ["Off-by-one sa range", "Tandaan: hindi kasama ang stop value ng range()."],
    "python:strings": ["Maling quote o string index", "I-pares ang quotes at tandaan na nagsisimula sa 0 ang index."],
    "python:list-methods": ["Ina-assume na may item sa list", "I-check muna bago mag-remove() o gumamit ng valid index."],
    "python:lists-tuples-sets-and-dictionaries": ["Maling collection para sa task", "List para sa order, set para unique values, dictionary para key-value pairs."],
    "python:functions": ["Nakalimutan ang return", "Gamitin ang return kapag kailangang gamitin sa ibang line ang result."],
    "python:error-handling": ["Sinasalo ang lahat gamit ang bare except", "Hulihin ang specific exception para hindi maitago ang ibang bug."],
    "python:file-handling": ["Hindi sinasara ang file", "Gumamit ng with open(...) para automatic itong maisara."],
    "python:modules-and-packages": ["Maling import path", "I-check ang module name, folder structure, at __init__.py kung package ito."],
    "python:oop": ["Nakalimutan ang self", "Unang parameter ng instance method ay self."],
    "python:recursion": ["Walang base case", "Maglagay ng condition na magpapahinto sa recursive calls."],
    "python:searching-and-sorting": ["Hindi sorted ang binary-search input", "I-sort muna ang data bago gumamit ng binary search."],
    "python:basic-dsa": ["Maling structure ang pinili", "Piliin ang list, stack, queue, o dictionary ayon sa access na kailangan."],
    "python:sql-and-database-programming": ["SQL string concatenation", "Gumamit ng parameterized query para iwas SQL injection."],
    "python:git-and-github": ["Nagco-commit ng secret files", "Ilagay ang .env at credentials sa .gitignore."],
    "python:advanced-oop": ["Inheritance na hindi kailangan", "Gamitin ang composition kapag has-a relationship ang mas tama."],
    "python:advanced-dsa": ["Hindi iniisip ang complexity", "I-compare ang time at memory cost bago pumili ng algorithm."],
    "python:gui-or-web-development": ["Blocking work sa UI thread", "Ilagay ang mabigat na task sa background para hindi mag-freeze ang interface."],
    "python:testing-and-debugging": ["Happy path lang ang tine-test", "Magdagdag ng empty, invalid, at boundary test cases."],
    "python:apis-and-automation": ["Walang timeout o status check", "Mag-set ng timeout at i-check ang HTTP status bago gamitin ang response."],
    "python:ai-computer-vision-or-data-analysis": ["Train at test data leakage", "Ihiwalay ang test set bago mag-train o mag-transform ng data."],
    "java:java-fundamentals": ["Maling declared type o String case", "I-match ang type sa value at gamitin ang capital S sa String."],
    "java:operators": ["Gumamit ng == sa String", "Gamitin ang .equals() para ihambing ang String content."],
    "java:conditional-statements": ["Assignment ang nailagay sa condition", "Gumamit ng == para comparison at i-test ang parehong branches."],
    "java:loops": ["Maling loop boundary", "I-check kung < o <= ang kailangan para hindi lumampas ang index."],
    "java:strings": ["Ina-assume na mutable ang String", "Gumawa ng bagong String o gumamit ng StringBuilder para sa maraming edits."],
    "java:arrays": ["Lumampas sa array length", "Valid lang ang index mula 0 hanggang length - 1."],
    "java:methods": ["Hindi tugma ang return type", "Ibalik ang value na tugma sa declared method type."],
    "java:oop": ["Direct access sa fields", "Gawing private ang fields at gumamit ng methods kapag kailangan."],
    "java:exception-handling": ["Empty catch block", "I-handle, i-log, o i-rethrow ang error; huwag itong itago."],
    "java:collections-framework": ["Primitive sa generics", "Gamitin ang wrapper tulad ng Integer, hindi int, sa List."],
    "java:file-handling": ["Hindi kino-close ang reader/writer", "Gumamit ng try-with-resources para automatic cleanup."],
    "java:generics": ["Raw type ang gamit", "Ilagay ang type parameter, gaya ng List<String>."],
    "java:data-structures-and-algorithms": ["Maling Big-O assumption", "Sukatin ang operations at piliin ang structure ayon sa lookup/insert need."],
    "java:sql-at-jdbc": ["Hindi sinasarang JDBC resources", "Isara ang Connection, Statement, at ResultSet gamit ang try-with-resources."],
    "java:git-and-github": ["Nagpo-push nang hindi nagpu-pull", "Kumuha muna ng latest changes at ayusin ang conflicts bago mag-push."],
    "java:multithreading": ["Shared data na walang synchronization", "Protektahan ang shared state o gumamit ng concurrent utilities."],
    "java:modern-java-features": ["May side effects sa stream", "Iwasan ang pag-mutate ng external state sa stream pipeline."],
    "java:unit-testing": ["Tests na magkaka-depend", "Bawat test ay dapat independent at may sariling setup."],
    "java:gui-programming": ["UI update mula sa wrong thread", "I-update ang UI sa tamang event-dispatch thread."],
    "java:spring-boot": ["Business logic sa controller", "Ihiwalay ang controller, service, at repository responsibilities."],
    "java:software-design-patterns": ["Pattern para lang gumamit ng pattern", "Piliin lang ang pattern kapag nilulutas nito ang actual na design problem."],
    "java:jvm-and-memory-management": ["Memory leak dahil sa retained references", "Alisin ang hindi na kailangan na references at i-profile ang app kung tumataas ang memory."]
  };
  const topic = library[`${lesson.language}:${lesson.id}`] || ["Hindi binabasa ang error message", "Tingnan ang unang line number at ayusin muna ang unang error."];
  const id = lesson.id;
  const family = ["conditional-statements", "loops", "recursion"].includes(id) ? "control"
    : ["variables-and-data-types", "operators", "strings", "list-methods", "lists-tuples-sets-and-dictionaries", "arrays", "collections-framework", "generics", "basic-dsa", "advanced-dsa", "data-structures-and-algorithms"].includes(id) ? "data"
    : ["input-and-output", "file-handling", "sql-and-database-programming", "sql-at-jdbc", "apis-and-automation"].includes(id) ? "io"
    : ["functions", "methods", "oop", "advanced-oop", "software-design-patterns", "jvm-and-memory-management", "multithreading"].includes(id) ? "design"
    : "workflow";
  const support = lesson.language === "python" ? {
    control: [["Hindi tine-test ang edge case", "Subukan ang boundary values gaya ng 0, empty input, at huling item."], ["Nagbabago ang condition nang hindi sinasadya", "I-print o i-trace ang values kada step bago mag-refactor."]],
    data: [["Maling type ang inaasahan", "Gamitin ang type() o i-print ang value habang nagde-debug."], ["Binabago ang data nang hindi sinasadya", "Gumawa ng copy kung kailangan ang original collection o value."]],
    io: [["Hindi vina-validate ang external input", "I-check ang input, file path, response, o query result bago gamitin."], ["Walang error path", "Mag-handle ng missing file, bad input, connection error, o empty response."]],
    design: [["Sobrang daming ginagawa ng isang function/class", "Hatiin ang code sa maliit at malinaw na responsibility."], ["Hindi malinaw ang pangalan", "Gumamit ng descriptive names para sa values, parameters, at methods."]],
    workflow: [["Malaking pagbabago agad ang ginagawa", "Magbago ng isang maliit na part at i-test bago magpatuloy."], ["Walang reproducible check", "Maghanda ng maliit na example o test na nagpapakita ng expected result."]]
  } : {
    control: [["Hindi tine-test ang edge case", "Subukan ang boundary values gaya ng 0, empty input, at huling item."], ["Maling scope ng braces", "I-indent at i-pares ang braces para malinaw kung anong block ang tatakbo."]],
    data: [["Null o empty data ang hindi chine-check", "I-validate ang object, collection, at array length bago gamitin."], ["Maling equality check", "Para sa objects gaya ng String, gamitin ang .equals() kung content ang ikinukumpara."]],
    io: [["Hindi vina-validate ang external input", "I-check ang input, file path, query result, o response bago gamitin."], ["Hindi nalilinis ang resources", "Gumamit ng try-with-resources para sa files, streams, at database objects."]],
    design: [["Sobrang daming ginagawa ng isang class", "Hatiin ang responsibilities sa malinaw na classes o methods."], ["Leaking mutable state", "Iwasang mag-expose ng mutable fields; gumamit ng controlled methods o copies."]],
    workflow: [["Malaking pagbabago agad ang ginagawa", "Magbago ng isang maliit na part at i-test bago magpatuloy."], ["Walang reproducible check", "Maghanda ng maliit na example o unit test na may expected result."]]
  };
  return [{ mistake: topic[0], fix: topic[1] }, ...support[family].map(([mistake, fix]) => ({ mistake, fix }))];
}

function renderCommonMistakes(lesson) {
  const mistakes = commonMistakesFor(lesson);
  return `<section class="content-section panel" id="common-mistakes"><div><span class="eyebrow">Common Mistakes Library</span><h2>Mga karaniwang mali sa ${escapeHtml(lesson.title)}</h2><p class="muted">Gamitin ito bilang mabilis na checklist kapag may error o hindi tugma ang output.</p></div><div class="mistakes-library">${mistakes.map(item => `<article class="mistake-card"><strong>${escapeHtml(item.mistake)}</strong><p><span class="mistake-fix">Ayos:</span> ${escapeHtml(item.fix)}</p></article>`).join("")}</div></section>`;
}

function explainLine(line, language, annotations, lineNumber) {
  const note = annotations?.find(item => item.line === lineNumber);
  if (note?.text) return K.i18n.lessonText(note.text, "This note explains the highlighted part of the code.");
  const english = K.i18n.language === "en";
  const trimmed = line.trim();
  if (!trimmed) return english ? "This blank line separates related parts of the code and makes it easier to read." : "Blank line ito para paghiwalayin ang magkakaugnay na bahagi ng code at gawing mas madaling basahin.";
  if (trimmed.startsWith("#") || trimmed.startsWith("//")) return english ? "This is a comment for the reader; the program does not run it." : "Comment ito para sa reader ng code; hindi ito ine-execute ng program.";
  if (/^(if|elif|else|for|while|switch|case)\b/.test(trimmed)) return english ? "This control-flow line sets a condition or repetition rule for the program." : "Control-flow line ito: nagse-set ito ng condition o pag-uulit na susundin ng program.";
  if (/^(def|class|public|private|static)\b/.test(trimmed)) return english ? "This definition creates a reusable function, method, class, or behavior for another part of the program to use." : "Definition line ito: dito ginagawa ang reusable function, method, class, o behavior na tatawagin sa ibang part ng program.";
  if (/^(print|System\.out\.println)\b/.test(trimmed)) return english ? "This output line displays a value or message in the console." : "Output line ito: ipinapakita nito sa console ang value o message para makita ng user ang result.";
  if (/\b(return|yield)\b/.test(trimmed)) return english ? "This line sends a result from the function or method back to the code that called it." : "Ibinabalik ng line na ito ang result mula sa function/method papunta sa code na tumawag dito.";
  if (trimmed.includes("=")) return english
    ? language === "python" ? "This assignment or update computes the value on the right and stores it in the variable on the left." : "This line declares or assigns a value. In Java, the type tells you what kind of value the variable can store."
    : language === "python" ? "Assignment o update ito: ang nasa kanan ang kino-compute, tapos sine-save sa variable na nasa kaliwa—parang nilalagyan o pinapalitan ang laman ng labeled box." : "May value na dine-declare o ina-assign dito. Sa Java, ang type ay nagsasabi kung anong klaseng value ang puwedeng itago ng variable.";
  if (/\w+\(/.test(trimmed)) return english ? "This calls an existing function or method with the values inside the parentheses." : "Method/function call ito: may existing na instruction na pinapatakbo gamit ang values na nasa parentheses.";
  return english ? "Read this line with the surrounding code to see how it continues the program's flow." : "Bahagi ito ng current block. Basahin ito kasama ng lines sa paligid para makita kung paano nito tinutuloy ang flow ng program.";
}

function renderLineByLine(code, language, annotations = []) {
  const title = K.i18n.language === "en" ? "Line-by-line explanation" : "Paliwanag sa bawat line";
  return `<details class="line-by-line" open><summary>${title}</summary><ol>${String(code).split("\n").map((line, index) => `<li><code>${escapeHtml(line || "(blank line)")}</code><span>${escapeHtml(explainLine(line, language, annotations, index + 1))}</span></li>`).join("")}</ol></details>`;
}

function homePage() {
  const comingSoon = ["HTML", "CSS", "JavaScript"].map(language => `<button class="course-preview" type="button" data-action="unavailable-course" data-course="${language}"><strong>${language}</strong><span>Lesson coming soon</span></button>`).join("");
  return `<article class="landing-page"><section class="home-hero"><p class="eyebrow">${copy.tagline}</p><h1 class="wordmark hero-wordmark" aria-label="Kodigo">kodigo<span aria-hidden="true">_</span></h1><h2>Learn code one clear step at a time.</h2><p class="hero-copy">Explore lessons with real code, clear explanations, guided practice, and small projects. Choose Python or Java from the navigation bar to begin.</p></section><section class="landing-features" aria-label="${K.i18n.t("whyKodigo")}"><article class="panel"><span class="eyebrow">01 · Read</span><h2>See how code works</h2><p class="muted">Each lesson connects syntax to its purpose, so every line has a reason for being there.</p></article><article class="panel"><span class="eyebrow">02 · Understand</span><h2>Build solid foundations</h2><p class="muted">Topics cover concepts, syntax rules, common mistakes, and how each skill is used in applications.</p></article><article class="panel"><span class="eyebrow">03 · Practice</span><h2>Write your own code</h2><p class="muted">Use the empty editor, solve practice prompts, and apply each idea through a guided mini project.</p></article></section><section class="landing-path panel"><span class="eyebrow">Learning path</span><h2>From first variable to real applications.</h2><ol><li><strong>Beginner:</strong> syntax, variables, data types, decisions, loops, collections, and functions.</li><li><strong>Intermediate:</strong> files, OOP, algorithms, databases, Git, and code organization.</li><li><strong>Advanced:</strong> testing, APIs, concurrency, web or GUI applications, performance, and software design.</li></ol><p class="muted">Take one topic at a time: read the example, write your own variation, then move forward once you can explain what the code does.</p></section><section class="landing-guide"><div><span class="eyebrow">Getting started</span><h2>A simple way to study</h2><p class="muted">Choose a language from the navigation bar, select a lesson from its sidebar, review the example, and then write a solution in the practice editor. Errors are part of programming; reading the message and testing one small change at a time are useful debugging habits.</p><p class="muted">Kodigo is developed by <strong>Nielagang Itlog</strong>.</p></div><div class="panel"><h3>A useful reminder</h3><p class="muted">Programming is not memorizing commands. It is learning how to break a problem into small steps and test each step.</p></div></section><section class="content-section"><span class="eyebrow">More courses</span><h2>More languages are on the way</h2><p class="muted">These course pages are not available yet.</p><div class="course-preview-grid">${comingSoon}</div></section>${footer()}</article>`;
}

function quizHomePage() {
  return `<article class="quiz-page"><section class="quiz-hero"><span class="eyebrow">Practice zone</span><h1>Quiz</h1><p class="hero-copy">Test what you understand through a focused 20-question practice round. Choose a language to start.</p><div class="quiz-language-grid">${Object.entries(curriculum).map(([id, language]) => `<a class="quiz-language-card" href="#/quiz/${id}"><strong>${language.name}</strong><span>20 mixed questions · Start quiz →</span></a>`).join("")}</div></section><section class="quiz-info-grid"><article class="panel"><h2>What to expect</h2><p class="muted">Multiple choice, true or false, identification, and small code questions.</p></article><article class="panel"><h2>Learn from attempts</h2><p class="muted">Every checked answer gives feedback, so a wrong answer can still teach you something useful.</p></article><article class="panel"><h2>Take your time</h2><p class="muted">There is no timer. Read the question, reason through the code, then answer when ready.</p></article></section>${footer()}</article>`;
}

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
  }
  return shuffled;
}

function quizBank(language) {
  const bank = K.quiz[language];
  const typeMap = { mc: "multipleChoice", tf: "trueFalse", id: "identification", code: "code" };
  if (Array.isArray(bank)) {
    return bank.map((question, index) => ({
      ...question,
      type: typeMap[question.type] || question.type,
      level: question.level || (index % 10 < 4 ? "beginner" : index % 10 < 8 ? "intermediate" : "advanced")
    }));
  }
  const groups = [
    ["multipleChoice", bank.multipleChoice || []],
    ["trueFalse", bank.trueFalse || []],
    ["identification", bank.identification || []],
    ["code", bank.code || []]
  ];
  return groups.flatMap(([type, questions]) => questions.map((question, index) => ({
    ...question,
    type,
    level: question.level || (index < 4 ? "beginner" : index < 8 ? "intermediate" : "advanced")
  })));
}

function chooseQuizQuestions(language, excludedKeys = []) {
  const targets = { beginner: 8, intermediate: 7, advanced: 5 };
  let pool = quizBank(language);
  const excluded = new Set(excludedKeys);
  const freshPool = pool.filter(question => !excluded.has(`${question.type}:${question.q}`));
  if (freshPool.length >= 20) pool = freshPool;
  const selected = [];
  const selectedKeys = new Set();
  const levelCounts = { beginner: 0, intermediate: 0, advanced: 0 };
  const addQuestion = question => {
    selected.push(question);
    selectedKeys.add(`${question.type}:${question.q}`);
    levelCounts[question.level] = (levelCounts[question.level] || 0) + 1;
  };
  const take = (questions, count) => {
    const candidates = shuffle(questions).filter(question => !selectedKeys.has(`${question.type}:${question.q}`));
    for (let index = 0; index < count; index += 1) {
      const targetLevel = Object.keys(targets).sort((a, b) => (targets[b] - levelCounts[b]) - (targets[a] - levelCounts[a]))
        .find(level => levelCounts[level] < targets[level]);
      const selectedIndex = candidates.findIndex(question => question.level === targetLevel);
      const question = candidates.splice(selectedIndex >= 0 ? selectedIndex : 0, 1)[0];
      if (!question) break;
      addQuestion(question);
    }
  };
  ["multipleChoice", "trueFalse", "identification", "code"].forEach(type => {
    take(pool.filter(question => question.type === type), 4);
  });
  Object.keys(targets).forEach(level => {
    take(pool.filter(question => question.level === level), Math.max(0, targets[level] - levelCounts[level]));
  });
  if (selected.length < 20) take(pool, 20 - selected.length);
  return shuffle(selected.slice(0, 20)).map(question => {
    if (question.type !== "multipleChoice") return { ...question };
    const options = shuffle(question.options.map((label, index) => ({ label, correct: index === question.answer })));
    return { ...question, options: options.map(item => item.label), answer: options.findIndex(item => item.correct) };
  });
}

function beginQuiz(language, excludedKeys = []) {
  const questions = chooseQuizQuestions(language, excludedKeys);
  quizState = { language, type: questions[0]?.type, questions, index: 0, score: 0, wrongAttempts: 0, checked: false, pendingAnswer: null, awarded: false, correctByType: { multipleChoice: 0, trueFalse: 0, identification: 0, code: 0 } };
}

function quizQuestionMarkup(route) {
  const state = quizState;
  const typeNames = { multipleChoice: "Multiple Choice", trueFalse: "True or False", identification: "Identification", code: "Code" };
  const question = state.questions[state.index];
  if (!question) {
    const breakdown = Object.entries(typeNames).map(([type, label]) => {
      const total = state.questions.filter(item => item.type === type).length;
      return `<li>${label}: ${state.correctByType[type]} / ${total}</li>`;
    }).join("");
    return `<section class="content-section"><div class="eyebrow">${curriculum[route.language].name} Quiz</div><h1>Quiz complete!</h1><p class="hero-copy">${state.score} / 20</p><p class="muted">${state.score >= 16 ? "Angas! Solid ang halo-halong skills mo." : "Good effort! May bagong learnings ka na—ulit tayo?"}</p><section class="panel content-section"><h2>Breakdown by type</h2><ul>${breakdown}</ul></section><div class="button-row"><button class="button primary" data-action="quiz-retry">Ulit</button><a class="button" href="#/quiz">Ibang language</a><a class="button" href="#/${route.language}/history">Balik sa lessons</a></div>${footer()}</section>`;
  }
  const checked = state.checked;
  const progress = `<div class="quiz-progress"><strong>Question ${state.index + 1} / 20</strong><div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="20" aria-valuenow="${state.index + 1}"><span style="width:${(state.index + 1) * 5}%"></span></div></div>`;
  const feedback = checked ? `<div class="feedback quiz-feedback ${state.wasCorrect ? "success" : "error"}" role="status" aria-live="polite"><strong>${state.wasCorrect ? copy.correct : copy.wrong}</strong><p>${escapeHtml(state.explanation)}</p>${!state.wasCorrect ? `<p><strong>Tamang sagot:</strong> ${escapeHtml(state.answerText)}</p>` : ""}${state.codeFailure ? `<div class="quiz-output-columns"><div><strong>Expected output</strong><pre class="output-box">${escapeHtml(state.expectedOutput)}</pre></div><div><strong>Actual output</strong><pre class="output-box">${escapeHtml(state.actualOutput)}</pre></div></div>` : ""}${state.showingAnswer ? `<pre class="output-box">${escapeHtml(state.solution || state.answerText)}</pre>` : ""}</div>` : "";
  let answerInput = "";
  if (state.type === "multipleChoice") answerInput = `<fieldset class="quiz-options"><legend>${escapeHtml(question.q)}</legend>${question.options.map((option, index) => `<label class="choice"><input type="radio" name="quiz-answer" value="${index}" ${checked ? "disabled" : ""}><span>${escapeHtml(option)}</span></label>`).join("")}</fieldset>`;
  if (state.type === "trueFalse") answerInput = `<div class="quiz-answer"><p>${escapeHtml(question.q)}</p><div class="button-row" role="group" aria-label="True or False"><button class="button ${state.pendingAnswer === true ? "primary" : ""}" type="button" aria-pressed="${state.pendingAnswer === true}" data-action="quiz-boolean" data-value="true" ${checked ? "disabled" : ""}>True</button><button class="button ${state.pendingAnswer === false ? "primary" : ""}" type="button" aria-pressed="${state.pendingAnswer === false}" data-action="quiz-boolean" data-value="false" ${checked ? "disabled" : ""}>False</button></div></div>`;
  if (state.type === "identification") answerInput = `<label class="quiz-answer"><span>${escapeHtml(question.q)}</span><input class="form-control" id="quiz-text-answer" type="text" autocomplete="off" ${checked ? "disabled" : ""}></label>`;
  if (state.type === "code") answerInput = `<div class="quiz-answer"><p>${escapeHtml(question.q)}</p><label for="quiz-code-editor">Code editor</label><textarea id="quiz-code-editor" class="editor" spellcheck="false" ${checked ? "disabled" : ""}>${escapeHtml(question.starter)}</textarea>${question.hint ? `<details><summary>Hint</summary><p>${escapeHtml(question.hint)}</p></details>` : ""}${route.language === "java" && !K.features.runner.RUNNER_CONFIG.java.enabled ? `<p class="muted">Pattern check lang ito dahil hindi pa nare-run ang Java dito.</p>` : ""}</div>`;
  const showAnswer = checked && !state.wasCorrect && state.wrongAttempts >= 2 && !state.showingAnswer ? `<button class="button" data-action="quiz-show-answer">Show answer</button>` : "";
  const checkedActions = state.wasCorrect || state.showingAnswer
    ? `<button class="button primary" data-action="quiz-next">Next</button>`
    : `<button class="button primary" data-action="quiz-try-again">Try again</button>`;
  return `<article class="quiz-page"><section class="content-section quiz-session"><div class="eyebrow">${curriculum[route.language].name} Quiz</div><h1>Question ${state.index + 1}</h1><p class="muted">Isang tanong kada round. Kaya mo yan!</p><div class="quiz-progress"><span class="badge">${typeNames[question.type]}</span></div><section class="content-section panel" id="quiz-panel">${progress}${answerInput}${feedback}<div class="button-row">${checked ? checkedActions : `<button class="button primary" data-action="quiz-check">Check</button>`}${showAnswer}</div></section><div aria-live="polite" class="sr-only" id="quiz-live"></div><a class="button" href="#/quiz">Ibang language</a></section>${footer()}</article>`;
}

function pinsPage() {
  const pins = getPins();
  return `<section class="content-section"><span class="eyebrow">Personal cheat sheet</span><h1>Kodigo ko</h1><p class="muted">Mga syntax snippet na na-pin mo mula sa lessons.</p>${pins.length ? `<div class="pin-list">${pins.map((pin, index) => `<article class="panel snippet-row"><div><span class="eyebrow">${escapeHtml(pin.lessonTitle)} - ${escapeHtml(pin.language)}</span><p>${escapeHtml(pin.label)}</p><code>${escapeHtml(pin.snippet)}</code></div><div class="button-row"><button class="icon-button" data-action="copy-pin" data-index="${index}" aria-label="Kopyahin ang snippet">Copy</button><button class="icon-button" data-action="remove-pin" data-index="${index}" aria-label="Alisin ang snippet">Remove</button></div></article>`).join("")}</div>` : `<div class="empty-state">${copy.empty}</div>`}${pins.length >= 5 ? `<span class="badge">${copy.badges[3]}</span>` : ""}${footer()}</section>`;
}

function notFoundPage() {
  return `<section class="content-section"><span class="eyebrow">404</span><h1>${copy.notFound}</h1><a class="button primary" href="#/">Balik sa umpisa</a></section>${footer()}`;
}

function updateTitle(route, lesson) {
  let title = "Kodigo | Learn by Coding, Improve by Building";
  if (lesson) title = `${K.i18n.topic(lesson.language, lesson.id, lesson.title)} · ${curriculum[lesson.language].name} | Kodigo`;
  else if (route.page === "history") title = `${K.i18n.history(route.language, K.history[route.language]).title} | Kodigo`;
  else if (route.page === "roadmap") title = `${K.i18n.t("roadmap")} | Kodigo`;
  else if (route.page === "pins") title = "Kodigo ko | Kodigo";
  else if (route.page === "quiz" || route.page === "quiz-language") title = "Quiz | Kodigo";
  document.title = title;
}

function lessonMarkup(lesson) {
  memoryStep = 0;
  document.body.dataset.lesson = `${lesson.language}:${lesson.id}`;
  const topics = curriculum[lesson.language].topics;
  const current = topics.findIndex(item => item.id === lesson.id);
  const topic = topics[current];
  const previous = topics[current - 1];
  const next = topics[current + 1];
  const done = getProgress().completed.includes(`${lesson.language}:${lesson.id}`);
  const hasSections = Array.isArray(lesson.sections) && lesson.sections.length > 0;
  const lessonText = K.i18n.lessonText;
  const english = K.i18n.language === "en";
  const baseCode = lesson.code || lesson.sections?.[0]?.code || "";
  const codeMarkup = renderCode(baseCode, lesson.annotations);
  const concepts = hasSections
    ? lesson.sections.slice(0, lesson.showAllSections ? undefined : 2).map((section, index) => {
      const isNewExample = index === 0 || section.code !== baseCode;
      const codeBlock = isNewExample ? `<div class="code-frame"><div class="code-scroll"><pre class="code-lines">${renderCode(section.code, section.annotations)}</pre></div></div>${renderLineByLine(section.code, lesson.language, section.annotations)}` : "";
      const explanation = (section.explanation || []).map(line => english
        ? lessonText(line, "Study this example step by step to see how the concept works and what result it produces.")
        : line);
      const whereUsed = english ? lessonText(section.whereUsed, "Use this concept when building features that need this kind of data, logic, or behavior.") : section.whereUsed;
      const tip = english ? lessonText(section.tip, "Change one value, run the code, and observe how the output changes.") : section.tip;
      const heading = english ? lessonText(section.heading, "Lesson concept") : section.heading;
      return `<section class="content-section lesson-step" id="concept-${index + 1}"><div><span class="eyebrow">${english ? "Step" : "Hakbang"} ${index + 1}</span><h2>${escapeHtml(heading)}</h2></div>${codeBlock}<div class="concept-explanation">${explanation.map(line => `<p>${escapeHtml(line)}</p>`).join("")}</div>${section.whereUsed ? `<p class="annotation-note"><strong>${english ? "Where is it used?" : "Saan ginagamit?"}</strong> ${escapeHtml(whereUsed)}</p>` : ""}${section.tip ? `<p class="muted"><strong>${english ? "Remember:" : "Tandaan:"}</strong> ${escapeHtml(tip)}</p>` : ""}</section>`;
    }).join("")
    : `<section class="content-section" id="annotated-code"><div class="section-head"><div><span class="eyebrow">${english ? "Code walkthrough" : "Code muna"}</span><h2>${english ? "Read the code" : "Basahin ang code"}</h2></div><span class="language-tag">${lesson.language}</span></div><div class="code-frame"><div class="code-scroll"><pre class="code-lines" id="lesson-code">${codeMarkup}</pre></div></div><div class="annotation-note" id="annotation-output" aria-live="polite">${english ? "Select or focus an underlined part of the code to see its explanation." : "Pindutin o i-focus ang may dotted underline para sa paliwanag."}</div></section>`;
  const toc = hasSections
    ? lesson.sections.slice(0, lesson.showAllSections ? undefined : 2).map((section, index) => `<a href="#concept-${index + 1}">${escapeHtml(english ? lessonText(section.heading, "Lesson concept") : section.heading)}</a>`).join("")
    : '<a href="#annotated-code">Code</a>';
  const previousLink = previous
    ? `<a class="button" href="#/${lesson.language}/${previous.id}">Previous: ${escapeHtml(previous.title)}</a>`
    : `<a class="button" href="#/${lesson.language}/history">Previous: History</a>`;
  const displayedTitle = K.i18n.topic(lesson.language, lesson.id, lesson.title);
  const summary = K.i18n.topicSummary(lesson.language, lesson.id, lesson.summary);
  return `<div class="lesson-layout"><article class="lesson-content"><header class="lesson-heading"><div class="eyebrow">${curriculum[lesson.language].name} - ${topic.n} / ${topics.length}</div><h1>${escapeHtml(displayedTitle)}</h1><p class="muted">${escapeHtml(english ? summary : lesson.summary)}</p></header>
    ${lesson.hook ? `<p class="hero-copy">${escapeHtml(lessonText(lesson.hook, "Let’s break down what every line does."))}</p>` : ""}
    <section class="lesson-roadmap panel"><span class="eyebrow">Code-first flow</span><ol>${english ? "<li>Review the pattern and its short meaning.</li><li>Change a value or rule in the sample.</li><li>Test your own solution and fix any errors.</li>" : "<li>Tingnan ang pattern at maikling meaning nito.</li><li>Palitan ang values o rule sa sample.</li><li>I-test ang sariling solution at ayusin kapag may error.</li>"}</ol></section>
    ${concepts}
    ${renderChallenges(lesson.challenges)}
    ${renderChallenge(lesson, topic)}
    ${renderMemory(lesson)}
    ${renderPlayground(lesson)}
    <section class="content-section panel" id="try-code"><div><span class="eyebrow">${K.i18n.t("practiceLab")}</span><h2>${K.i18n.t("writeCode")}</h2><p class="muted">${K.i18n.t("loadSampleHelp")} ${lesson.language === "java" ? copy.javaRunnerNotice : (english ? "The Python runtime starts on the first run; an internet connection is required." : "Maglo-load ang Python runtime sa unang run; kailangan ng internet.")}</p></div><label for="lesson-editor">Code editor</label><textarea id="lesson-editor" class="editor" spellcheck="false" placeholder="${english ? "# Write your code here..." : "# Isulat ang code mo dito..."}"></textarea><div class="button-row"><button class="button" data-action="load-example">${K.i18n.t("loadSample")}</button><button class="button primary" data-action="run-code">${K.i18n.t("runCode")}</button><button class="button" data-action="retry-code" hidden>Retry</button><button class="button" data-action="reset-code">${K.i18n.t("clear")}</button><button class="button" data-action="copy-editor">${K.i18n.t("copy")}</button></div><p class="muted" id="run-note" aria-live="polite"></p><div class="section-head"><h3>${K.i18n.t("output")}</h3><span class="muted" id="run-status" aria-live="polite"></span></div><pre class="output-box" id="run-output" aria-live="polite">${K.i18n.t("readyWhenYouAre")}</pre></section>
    ${renderMiniProject(lesson.miniProject)}
    ${renderPredictions(lesson.predict)}${renderDebug(lesson.debug)}${renderReorder(lesson.reorder, lesson)}${renderFillBlanks(lesson.fillBlanks)}
    ${renderCommonMistakes(lesson)}
    ${lesson.animation ? `<section class="content-section panel"><div><span class="eyebrow">Visual</span><h2>${lesson.animation === "loop" ? "Loop animation" : "Variable animation"}</h2></div><div class="animation-stage" id="animation-stage" aria-live="polite"></div><button class="button" data-action="replay-animation">Play / Replay</button></section>` : ""}
    ${renderKodigoCard(lesson.kodigoCard, getPins())}
    <section class="content-section panel"><div class="section-head"><div><span class="eyebrow">Progress</span><h2>Markahan ang lesson</h2></div>${done ? "<span class=badge>Complete</span>" : ""}</div><button class="button primary" data-action="complete-lesson" ${done ? "disabled" : ""}>${done ? "Completed" : "Mark as complete"}</button></section>
    <nav class="lesson-bottom-nav" aria-label="Lesson navigation">${previousLink}${next ? `<a class="button primary" href="#/${lesson.language}/${next.id}">Next: ${escapeHtml(next.title)}</a>` : `<button class="button" type="button" disabled>Next</button>`}</nav>${footer()}</article>
    <aside class="lesson-toc panel"><h3>On this page</h3><nav>${toc}<a href="#coding-challenge">Coding challenge</a><a href="#memory-visualization">Memory visualization</a><a href="#test-case-playground">Test case playground</a><a href="#try-code">I-try mo</a>${lesson.predict?.length ? '<a href="#predict-output">Hulaan ang output</a>' : ""}${lesson.debug?.length ? '<a href="#debug-mode">Sirang code</a>' : ""}<a href="#reorder-lines">Drag-and-Drop Coding</a><a href="#common-mistakes">Common Mistakes</a><a href="#fill-in-the-blank">Fill in the blank</a><a href="#kodigo-card">Kodigo card</a></nav></aside></div>`;
}

async function render(options = {}) {
  const preservedScroll = options.preserveScroll
    ? { left: window.scrollX, top: window.scrollY }
    : null;
  const token = ++renderToken;
  const route = readRoute();
  document.body.dataset.page = route.page;
  const drawerWasOpen = K.ui.drawer.isOpen();
  activeLesson = null;
  const sidebarState = resolveNavState(route);
  if (route.page === "language") {
    navigate(`${route.language}/history`);
    return;
  }
  let topic = null;
  if (route.page === "lesson") {
    topic = curriculum[route.language]?.topics.find(item => item.id === route.lesson) || null;
    if (!topic) {
      document.body.dataset.lesson = "";
      renderNav({ page: "not-found" }, sidebarState);
      main.innerHTML = notFoundPage();
      updateTitle({ page: "not-found" });
      return;
    }
    const state = getNav();
    saveNav({ ...state, lang: route.language, lastTopic: { ...state.lastTopic, [route.language]: topic.id } });
  }
  renderNav(route, sidebarState);
  if (["lesson", "history", "roadmap", "pins", "not-found"].includes(route.page)) K.ui.drawer.close(false);
  if (route.page === "lesson") {
    const lesson = loadLesson(route.language, route.lesson);
    if (token !== renderToken) return;
    if (lesson) {
      activeLesson = lesson;
      main.innerHTML = lessonMarkup(lesson);
      updateTitle(route, lesson);
      if (!preservedScroll) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } else {
      document.body.dataset.lesson = "";
      main.innerHTML = notFoundPage();
      updateTitle({ page: "not-found" });
    }
  } else {
    document.body.dataset.lesson = "";
    if (route.page === "quiz") quizState = null;
    if (route.page === "quiz-language" && (!quizState || quizState.language !== route.language)) beginQuiz(route.language);
    const page = route.page === "home" ? homePage()
      : route.page === "quiz" ? quizHomePage()
        : route.page === "quiz-language" ? quizQuestionMarkup(route)
          : route.page === "history" ? K.pages.history.renderHistory(route.language, sidebarState.lastTopic[route.language])
            : route.page === "roadmap" ? K.pages.roadmap.renderRoadmap(route.path)
            : route.page === "pins" ? pinsPage() : notFoundPage();
    main.innerHTML = page;
    updateTitle(route);
  }
  document.querySelector("#streak-count").textContent = `${getProgress().streak || 0} ${K.i18n.t("streak")}`;
  K.i18n.localizePage();
  if (route.page !== "home" && ((!drawerWasOpen && route.page !== "lesson") || (drawerWasOpen && route.page === "lesson"))) main.focus({ preventScroll: true });
  if (preservedScroll) window.scrollTo({ left: preservedScroll.left, top: preservedScroll.top, behavior: "auto" });
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2600);
}


function closeTooltip() {
  document.querySelectorAll("[aria-describedby='annotation-tooltip']").forEach(element => element.removeAttribute("aria-describedby"));
  document.querySelector(".tooltip")?.remove();
}

function showTooltip(target) {
  closeTooltip();
  const tip = document.createElement("div");
  tip.className = "tooltip";
  tip.id = "annotation-tooltip";
  tip.setAttribute("role", "tooltip");
  tip.textContent = target.dataset.annotation;
  document.body.append(tip);
  const rect = target.getBoundingClientRect();
  if (window.innerWidth < 640) {
    tip.style.left = "0"; tip.style.right = "0"; tip.style.bottom = "0"; tip.style.top = "auto"; tip.style.width = "100%";
  } else {
    const bounds = tip.getBoundingClientRect();
    const left = Math.max(12, Math.min(rect.left, window.innerWidth - bounds.width - 12));
    const top = rect.bottom + bounds.height + 12 < window.innerHeight ? rect.bottom + 8 : Math.max(12, rect.top - bounds.height - 8);
    tip.style.left = `${left}px`; tip.style.top = `${top}px`;
  }
  target.setAttribute("aria-describedby", tip.id);
}

function applyTheme(theme) {
  const selected = theme === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : theme;
  document.documentElement.dataset.theme = selected;
  document.querySelector('meta[name="theme-color"]').content = selected === "dark" ? "#0F0F11" : "#FAFAF9";
  document.querySelector("#theme-toggle").setAttribute("aria-label", `Theme: ${theme}. Palitan ang theme`);
}

function normalizeAnswer(value) { return value.trim().replace(/\r/g, "").replace(/[ \t]+/g, " "); }

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); }
  catch {
    const field = document.createElement("textarea"); field.value = text; field.style.position = "fixed"; field.style.opacity = "0"; document.body.append(field); field.select(); document.execCommand("copy"); field.remove();
  }
  showToast("Na-copy na.");
}

function focusSearch() {
  const form = document.querySelector("#search-form");
  form.classList.add("expanded");
  document.querySelector("#search-input").focus();
}

function renderSearchResults(query) {
  const box = document.querySelector("#search-results");
  const text = query.trim().toLowerCase();
  if (!text) { box.hidden = true; box.replaceChildren(); return; }
  const matches = allLessons.map(item => ({ ...item, score: `${item.title} ${item.keywords} ${item.level} ${item.language}`.toLowerCase().includes(text) ? 0 : Math.min(...text.split(/\s+/).map(word => `${item.title} ${item.keywords} ${item.language}`.toLowerCase().indexOf(word)).filter(index => index >= 0), 99) })).filter(item => item.score < 99).sort((a, b) => a.score - b.score).slice(0, 8);
  box.innerHTML = matches.length ? matches.map(item => `<a class="search-result" href="#/${item.language}/${item.id}"><strong>${escapeHtml(K.i18n.topic(item.language, item.id, item.title))}</strong><small>${curriculum[item.language].name} · ${K.i18n.t(item.level)}</small></a>`).join("") : `<div class="empty-state">Walang nakita. Subukan ang ibang keyword.</div>`;
  box.hidden = false;
}

function updateMemoryVisualization(step) {
  const trace = activeLesson ? K.features.practice.memoryTrace(activeLesson) : [];
  if (!trace.length) return;
  memoryStep = Math.max(0, Math.min(step, trace.length - 1));
  const snapshot = trace[memoryStep];
  const values = document.querySelector("#memory-values");
  values.replaceChildren();
  const entries = Object.entries(snapshot.vars || {});
  if (!entries.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = K.i18n.t("noVariablesYet");
    values.append(empty);
  } else {
    entries.forEach(([name, value]) => {
      const card = document.createElement("article");
      const key = document.createElement("strong");
      const display = document.createElement("code");
      const type = document.createElement("span");
      card.className = "memory-value";
      key.textContent = name;
      type.className = "memory-type";
      type.textContent = K.features.practice.memoryType(value);
      display.textContent = K.features.practice.displayMemoryValue(value);
      card.append(key, type, display);
      values.append(card);
    });
  }
  const label = document.querySelector("#memory-step-label");
  label.textContent = `Step ${memoryStep + 1} / ${trace.length}${snapshot.line ? ` · line ${snapshot.line}` : ""}`;
  document.querySelector("#memory-note").textContent = snapshot.note
    ? K.i18n.lessonText(snapshot.note, "Follow the code step to see the next change.")
    : (snapshot.output ? `Output: ${snapshot.output}` : K.i18n.t("noOutputThisStep"));
  document.querySelector('[data-action="memory-previous"]').disabled = memoryStep === 0;
  document.querySelector('[data-action="memory-next"]').disabled = memoryStep === trace.length - 1;
}

function updateTestCaseLabels() {
  const cases = [...document.querySelectorAll("[data-test-case]")];
  cases.forEach((testCase, index) => {
    testCase.querySelector("h3").textContent = `Test case ${index + 1} · ${K.i18n.t(index === 0 ? "baseline" : index === 1 ? "ownEdgeCase" : "custom")}`;
    const remove = testCase.querySelector('[data-action="remove-test-case"]');
    remove.disabled = cases.length === 1;
    remove.setAttribute("aria-label", `${K.i18n.t("removeTestCase")} ${index + 1}`);
  });
}

function handleSubmit(event) {
  const form = event.target.closest("form[data-form]");
  if (!form) return;
  event.preventDefault();
}

async function checkQuizAnswer() {
  const question = quizState.questions[quizState.index];
  let isCorrect = false;
  let answerText = "";
  let explanation = question.explain;
  let codeFailure = false;
  let expectedOutput = "";
  let actualOutput = "";

  if (quizState.type === "multipleChoice") {
    const selected = document.querySelector('input[name="quiz-answer"]:checked');
    if (!selected) { showToast("Pumili muna ng sagot."); return; }
    isCorrect = Number(selected.value) === question.answer;
    answerText = question.options[question.answer];
  } else if (quizState.type === "trueFalse") {
    if (typeof quizState.pendingAnswer !== "boolean") { showToast("Pumili muna ng sagot."); return; }
    isCorrect = quizState.pendingAnswer === question.answer;
    answerText = question.answer ? "True" : "False";
  } else if (quizState.type === "identification") {
    const value = document.querySelector("#quiz-text-answer").value;
    const normalize = answer => answer.trim().toLowerCase().replace(/^['"]|['"]$/g, "").replace(/[.!?;:,]+$/g, "").replace(/\s+/g, " ");
    isCorrect = question.answers.some(answer => normalize(answer) === normalize(value));
    answerText = question.answers[0];
  } else if (quizState.language === "python") {
    const live = document.querySelector("#quiz-live");
    live.textContent = "Running Python code...";
    document.querySelector('[data-action="quiz-check"]').disabled = true;
    const result = await runPython(document.querySelector("#quiz-code-editor").value, message => { live.textContent = message; });
    expectedOutput = String(question.expectedOutput ?? "").trim();
    actualOutput = String(result.error || result.output || "").trim();
    isCorrect = !result.error && String(result.output || "").trim() === expectedOutput;
    answerText = "Tingnan ang solution code.";
    codeFailure = !isCorrect;
  } else if (K.features.runner.RUNNER_CONFIG.java.enabled) {
    const result = await runCode("java", document.querySelector("#quiz-code-editor").value);
    expectedOutput = String(question.expectedOutput ?? "").trim();
    actualOutput = String(result.error || result.output || "").trim();
    isCorrect = !result.error && String(result.output || "").trim() === expectedOutput;
    answerText = "Tingnan ang solution code.";
    codeFailure = !isCorrect;
  } else {
    const code = document.querySelector("#quiz-code-editor").value.replace(/\s+/g, "");
    isCorrect = (question.patterns || []).every(pattern => new RegExp(pattern).test(code));
    answerText = "Tingnan ang solution code.";
  }

  quizState.wasCorrect = isCorrect;
  quizState.answerText = answerText;
  quizState.explanation = explanation;
  quizState.codeFailure = codeFailure;
  quizState.expectedOutput = expectedOutput;
  quizState.actualOutput = actualOutput;
  quizState.solution = question.solution;
  quizState.checked = true;
  quizState.showingAnswer = false;
  if (isCorrect) {
    quizState.score += 1;
    quizState.correctByType[quizState.type] += 1;
  }
  else quizState.wrongAttempts += 1;
  render();
}

async function handleClick(event) {
  const languageButton = event.target.closest("[data-nav-lang]");
  if (languageButton) {
    const language = languageButton.dataset.navLang;
    const state = getNav();
    saveNav({ ...state, lang: language });
    const hash = `#/${language}/history`;
    if (location.hash === hash) render();
    else navigate(`${language}/history`);
    return;
  }
  const codeChoice = event.target.closest(".code-choice");
  if (codeChoice) {
    const task = codeChoice.closest("[data-reorder]");
    task.querySelectorAll(".code-choice.selected").forEach(choice => choice.classList.remove("selected"));
    codeChoice.classList.add("selected");
    return;
  }
  const codeSlot = event.target.closest(".code-drop-slot");
  if (codeSlot) {
    const choice = codeSlot.closest("[data-reorder]").querySelector(".code-choice.selected");
    if (choice) placeCodeChoice(codeSlot, choice);
    return;
  }
  const target = event.target.closest("[data-action]");
  if (!target) {
    const annotation = event.target.closest(".annotated");
    if (annotation && (event.type === "click")) showTooltip(annotation);
    return;
  }
  const action = target.dataset.action;
  if (action === "unavailable-course") {
    showToast(`${target.dataset.course} lessons are not available yet.`);
    return;
  }
  if (action === "challenge-hint") {
    const level = K.features.practice.levels[document.querySelector("#challenge-level").value];
    const step = Number(target.dataset.step || 0);
    const output = document.querySelector("#challenge-hint-output");
    const english = K.i18n.language === "en";
    const hints = english ? level.hintsEn : level.hints;
    output.hidden = false;
    output.textContent = step < hints.length
      ? `${K.i18n.t("hint")} ${step + 1}: ${hints[step]}`
      : (english ? "Run the code after each small change and check the output in the test playground." : "I-run ang code pagkatapos ng bawat maliit na pagbabago at tingnan ang output sa test playground.");
    target.dataset.step = String(step + 1);
    return;
  }
  if (action === "memory-previous") { updateMemoryVisualization(memoryStep - 1); return; }
  if (action === "memory-next") { updateMemoryVisualization(memoryStep + 1); return; }
  if (action === "add-test-case") {
    const cases = document.querySelector("#test-cases");
    const testCase = cases.firstElementChild.cloneNode(true);
    testCase.querySelector(".test-input").value = "";
    testCase.querySelector(".test-expected").value = "";
    const result = testCase.querySelector(".test-result");
    result.className = "test-result feedback";
    result.textContent = K.i18n.t("notRunYet");
    cases.append(testCase);
    updateTestCaseLabels();
    testCase.querySelector(".test-input").focus();
    return;
  }
  if (action === "remove-test-case") {
    const cases = document.querySelectorAll("[data-test-case]");
    if (cases.length > 1) target.closest("[data-test-case]").remove();
    updateTestCaseLabels();
    return;
  }
  if (action === "challenge-submit") {
    const code = document.querySelector("#challenge-editor").value;
    const levelId = document.querySelector("#challenge-level").value;
    const level = K.features.practice.levels[levelId];
    const status = document.querySelector("#challenge-status");
    const output = document.querySelector("#challenge-output");
    if (!code.trim()) { status.textContent = K.i18n.language === "en" ? "Write some solution code first." : "Magsulat muna ng solution code."; return; }
    const starter = activeLesson.editable?.starter || activeLesson.code || activeLesson.sections?.[0]?.code || "";
    if (normalizeCode(code) === normalizeCode(K.i18n.practiceCode(starter))) { status.textContent = K.i18n.language === "en" ? "Change the starter code to meet the challenge before submitting." : "Baguhin muna ang starter code ayon sa challenge bago mag-submit."; return; }
    const token = renderToken;
    target.disabled = true;
    status.textContent = activeLesson.language === "python" ? copy.loadingPython : (K.i18n.language === "en" ? "Running Java..." : "Tumatakbo ang Java...");
    const result = await runCode(activeLesson.language, code, message => { status.textContent = message; }, []);
    if (token !== renderToken) return;
    target.disabled = false;
    output.textContent = result.output || result.error || (K.i18n.language === "en" ? "No output." : "Walang output.");
    output.classList.toggle("error", Boolean(result.error));
    if (result.error) {
      status.textContent = K.i18n.language === "en" ? "The run returned an error. Fix it and try again." : "May error sa run. Ayusin muna ito at subukan ulit.";
      return;
    }
    const challengeId = `${activeLesson.language}:${activeLesson.id}:${levelId}`;
    const progress = K.store.getProgress();
    const completed = progress.completedChallenges || [];
    if (!completed.includes(challengeId)) {
      K.store.awardXP(level.points);
      const updatedProgress = K.store.getProgress();
      updatedProgress.completedChallenges = [...(updatedProgress.completedChallenges || []), challengeId];
      K.store.saveProgress(updatedProgress);
      status.textContent = K.i18n.language === "en"
        ? `Successful run! +${level.points} points. Your progress was saved. Check that the output meets the challenge.`
        : `Successful run! +${level.points} points. Na-save ang progress mo. I-check ang output para siguradong natutupad nito ang challenge.`;
    } else status.textContent = K.i18n.language === "en" ? "Successful run! You have already earned points for this challenge." : "Successful run! Nakuha mo na ang points para sa challenge na ito.";
    document.querySelector("#challenge-complete").hidden = false;
    return;
  }
  if (action === "run-test-cases") {
    const code = document.querySelector("#playground-editor").value;
    const testCases = [...document.querySelectorAll("[data-test-case]")];
    const status = document.querySelector("#test-status");
    if (!code.trim()) { status.textContent = K.i18n.language === "en" ? "Write some code to test first." : "Magsulat muna ng code na ite-test."; return; }
    const token = renderToken;
    let passedCount = 0;
    target.disabled = true;
    status.textContent = K.i18n.language === "en" ? "Running test cases..." : "Tumatakbo ang test cases...";
    for (const [index, testCase] of testCases.entries()) {
      const input = testCase.querySelector(".test-input").value.split(/\r?\n/);
      const expected = testCase.querySelector(".test-expected").value;
      const result = await runCode(activeLesson.language, code, message => { status.textContent = `Test ${index + 1}: ${message}`; }, input);
      if (token !== renderToken) return;
      const passed = !result.error && normalizeAnswer(result.output || "") === normalizeAnswer(expected);
      const feedback = testCase.querySelector(".test-result");
      feedback.className = `test-result feedback ${passed ? "success" : "error"}`;
      feedback.textContent = passed
        ? `PASSED · ${result.output || (K.i18n.language === "en" ? "No output" : "Walang output")}`
        : `FAILED · ${result.error ? `Error: ${result.error}` : `${K.i18n.t("expectedOutput")}: ${expected || "(empty)"} · ${K.i18n.language === "en" ? "Got" : "Nakuha"}: ${(result.output || "(empty)").trim()}`}`;
      if (passed) passedCount += 1;
    }
    target.disabled = false;
    status.textContent = K.i18n.language === "en"
      ? `${passedCount} / ${testCases.length} test cases passed.`
      : `${passedCount} / ${testCases.length} test cases ang pumasa.`;
    return;
  }
  if (action === "quiz-boolean") {
    quizState.pendingAnswer = target.dataset.value === "true";
    document.querySelectorAll('[data-action="quiz-boolean"]').forEach(button => {
      const selected = button.dataset.value === String(quizState.pendingAnswer);
      button.classList.toggle("primary", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    target.focus();
    return;
  }
  if (action === "quiz-retry") {
    beginQuiz(quizState.language, quizState.questions.map(question => `${question.type}:${question.q}`));
    render();
    return;
  }
  if (action === "quiz-next") {
    quizState.index += 1;
    quizState.type = quizState.questions[quizState.index]?.type;
    quizState.checked = false;
    quizState.wrongAttempts = 0;
    quizState.pendingAnswer = null;
    if (quizState.index === 20 && !quizState.awarded) {
      quizState.awarded = true;
      K.store.awardXP(10);
      showToast("Quiz complete! +10 XP");
    }
    render();
    return;
  }
  if (action === "quiz-try-again") {
    quizState.checked = false;
    render();
    return;
  }
  if (action === "quiz-show-answer") {
    quizState.showingAnswer = true;
    render();
    return;
  }
  if (action === "quiz-check") {
    await checkQuizAnswer();
    return;
  }
  if (action === "run-code" || action === "retry-code") {
    const output = document.querySelector("#run-output");
    const status = document.querySelector("#run-status");
    output.textContent = ""; output.classList.remove("error"); status.textContent = activeLesson.language === "python" ? copy.loadingPython : "Running...";
    const result = await runCode(activeLesson.language, document.querySelector("#lesson-editor").value, message => { status.textContent = message; });
    output.textContent = result.output || result.error || "No output.";
    output.classList.toggle("error", Boolean(result.error));
    status.textContent = result.error ? copy.errorOutput : "Done.";
    document.querySelector("#run-note").textContent = result.note || "";
    document.querySelector('[data-action="retry-code"]').hidden = !result.retryable;
  }
  if (action === "load-example") {
    const editor = document.querySelector("#lesson-editor");
    const sample = activeLesson.editable?.starter || activeLesson.code || activeLesson.sections?.[0]?.code || "";
    editor.value = K.i18n.practiceCode(sample);
    editor.focus();
    document.querySelector("#run-output").textContent = K.i18n.language === "en"
      ? "Sample loaded. Change a value or rule, then run it."
      : "Sample loaded. Palitan ang isang value o rule, then i-run mo.";
    document.querySelector("#run-output").classList.remove("error");
    return;
  }
  if (action === "reset-code") { document.querySelector("#lesson-editor").value = ""; document.querySelector("#run-output").textContent = "Ready kapag ikaw na."; document.querySelector("#run-output").classList.remove("error"); }
  if (action === "copy-editor") await copyText(document.querySelector("#lesson-editor").value);
  if (action === "check-predict") {
    const index = Number(target.dataset.index); const question = activeLesson.predict[index];
    const input = document.querySelector(`#predict-answer-${index}`); const feedback = document.querySelector(`#predict-feedback-${index}`);
    const correct = normalizeAnswer(input.value) === normalizeAnswer(question.answer);
    const explanation = K.i18n.lessonText(question.explanation, "Review the code and compare its result with your prediction.");
    feedback.hidden = false; feedback.className = `feedback ${correct ? "success" : "error"}`; feedback.textContent = `${correct ? copy.correct : copy.wrong} ${K.i18n.t("expectedOutput")}: ${question.answer}. ${explanation}`;
    if (!correct) { const lines = target.closest("article").querySelectorAll(".code-line"); lines[lines.length - 1]?.classList.add("current"); }
  }
  if (action === "debug-hint") {
    const index = Number(target.dataset.index); const item = activeLesson.debug[index]; const display = document.querySelector(`#debug-hint-${index}`); const step = Number(target.dataset.step || 0);
    display.hidden = false;
    if (step < item.hints.length) {
      display.textContent = `${K.i18n.t("hint")} ${step + 1}: ${K.i18n.lessonText(item.hints[step], "Check the line that causes the unexpected behavior.")}`;
      target.dataset.step = String(step + 1);
      if (step + 1 === item.hints.length) target.textContent = K.i18n.t("showAnswer");
    } else {
      display.textContent = `${K.i18n.language === "en" ? "Answer" : "Sagot"}: ${K.i18n.practiceCode(item.solution)}\n\n${K.i18n.lessonText(item.explanation, "Compare the corrected code with the original and identify why the change works.")}`;
      target.disabled = true;
    }
  }
  if (action === "debug-check") {
    const index = Number(target.dataset.index); const item = activeLesson.debug[index]; const code = document.querySelector(`#debug-editor-${index}`).value; const feedback = document.querySelector(`#debug-feedback-${index}`); let solved = false;
    if (activeLesson.language === "python") {
      const actual = await runPython(code);
      const expected = await runPython(item.check);
      solved = !actual.error && !expected.error && normalizeAnswer(actual.output) === normalizeAnswer(expected.output);
    } else solved = normalizeCode(code) === normalizeCode(K.i18n.practiceCode(item.check));
    feedback.hidden = false; feedback.className = `feedback ${solved ? "success" : "error"}`; feedback.textContent = solved
      ? `${copy.correct} ${K.i18n.lessonText(item.explanation, "The corrected code now produces the expected behavior.")}`
      : `${copy.wrong} ${K.i18n.language === "en" ? "Try the Hint button." : "Subukan ang Hint button."}`;
    if (solved) { const progress = getProgress(); progress.badges = [...new Set([...(progress.badges || []), copy.badges[2]])]; saveProgress(progress); }
  }
  if (action === "check-reorder") {
    const index = Number(target.dataset.index); const task = activeLesson.reorder?.[index] || { explanation: "Nabuo ang code mula sa starter at missing lines." };
    const slots = [...target.closest("[data-reorder]").querySelectorAll(".code-drop-slot")];
    const isCorrect = slots.length > 0 && slots.every(slot => slot.dataset.line === slot.dataset.expectedLine);
    slots.forEach(slot => { slot.classList.toggle("correct", slot.dataset.line === slot.dataset.expectedLine); slot.classList.toggle("incorrect", Boolean(slot.dataset.line) && slot.dataset.line !== slot.dataset.expectedLine); });
    const feedback = document.querySelector(`#reorder-feedback-${index}`); feedback.hidden = false; feedback.className = `feedback ${isCorrect ? "success" : "error"}`; feedback.textContent = isCorrect
      ? `${copy.correct} ${K.i18n.lessonText(task.explanation, "The code is now in the correct order.")}`
      : copy.wrong;
  }
  if (action === "reset-reorder") { resetReorderTask(target.closest("[data-reorder]")); return; }
  if (action === "check-fill-blank") {
    const index = Number(target.dataset.index); const task = activeLesson.fillBlanks[index];
    const input = document.querySelector(`#fill-blank-answer-${index}`); const feedback = document.querySelector(`#fill-blank-feedback-${index}`);
    const correct = normalizeCode(input.value) === normalizeCode(task.answer);
    feedback.hidden = false; feedback.className = `feedback ${correct ? "success" : "error"}`;
    feedback.textContent = correct
      ? `${copy.correct} ${K.i18n.lessonText(task.explanation, "The missing code is correct.")}`
      : `${copy.wrong} ${K.i18n.t("hint")}: ${K.i18n.lessonText(task.hint, "Review the surrounding code to find the required value or operation.")}`;
    if (correct) input.closest("[data-fill-blank]").classList.add("correct");
    return;
  }
  if (action === "line-up" || action === "line-down") {
    const row = target.closest(".sortable-line"); const list = row.parentElement;
    if (action === "line-up" && row.previousElementSibling) list.insertBefore(row, row.previousElementSibling);
    if (action === "line-down" && row.nextElementSibling) list.insertBefore(row.nextElementSibling, row);
    updateLineLabels(list);
  }
  if (action === "replay-animation") replayAnimation(document.querySelector("#animation-stage"), activeLesson.animation);
  if (action === "project-hint") {
    const output = document.querySelector("#project-hint-output"); const index = Number(target.dataset.step || 0); output.hidden = false;
    if (index < activeLesson.miniProject.hints.length) {
      output.textContent = `${K.i18n.t("hint")} ${index + 1}: ${K.i18n.lessonText(activeLesson.miniProject.hints[index], "Break the project into smaller steps and reuse the lesson example.")}`;
      target.dataset.step = String(index + 1);
    } else {
      output.textContent = K.i18n.language === "en" ? "There are no more hints. Use the solution button if needed." : "Wala nang ibang hint. Nasa katabing button ang solution.";
    }
  }
  if (action === "project-solution") { document.querySelector("#project-solution-output").hidden = false; }
  if (action === "copy-snippet") { const snippet = activeLesson.kodigoCard[Number(target.dataset.index)]; await copyText(snippet.snippet); }
  if (action === "pin-snippet") {
    const index = Number(target.dataset.index); const snippet = activeLesson.kodigoCard[index]; const id = `${activeLesson.language}:${activeLesson.id}:${index}`;
    const pinCountBefore = getPins().length;
    togglePin({ id, language: curriculum[activeLesson.language].name, lessonTitle: activeLesson.title, label: snippet.label, snippet: snippet.snippet });
    if (pinCountBefore < 5 && getPins().length >= 5) showToast(`${copy.badges[3]} unlocked.`);
    render();
  }
  if (action === "complete-lesson") {
    const lessonState = { language: activeLesson.language, id: activeLesson.id };
    const progress = markComplete(`${lessonState.language}:${lessonState.id}`);
    K.ui.nav.updateLessonStatus(lessonState.language, lessonState.id, true);
    const badge = activeLesson.id === "loops" ? copy.badges[1] : copy.badges[0];
    progress.badges = [...new Set([...(progress.badges || []), badge])]; saveProgress(progress);
    target.disabled = true; target.textContent = "Completed";
    showToast(copy.completed);
  }
  if (action === "copy-pin") await copyText(getPins()[Number(target.dataset.index)].snippet);
  if (action === "remove-pin") { const pins = getPins(); pins.splice(Number(target.dataset.index), 1); savePins(pins); render(); }
}

function updateLineLabels(list) {
  list.querySelectorAll(".sortable-line").forEach((line, index) => {
    line.querySelector('[data-action="line-up"]').setAttribute("aria-label", `Itaas ang line ${index + 1}`);
    line.querySelector('[data-action="line-down"]').setAttribute("aria-label", `Ibaba ang line ${index + 1}`);
  });
}

function placeCodeChoice(slot, choice) {
  const task = slot.closest("[data-reorder]");
  const previous = slot.dataset.choiceId;
  if (previous !== undefined) task.querySelector(`[data-code-choice="${previous}"]`)?.removeAttribute("hidden");
  slot.dataset.choiceId = choice.dataset.codeChoice;
  slot.dataset.line = choice.dataset.line;
  slot.textContent = choice.dataset.line;
  slot.classList.add("filled");
  choice.hidden = true;
  task.querySelectorAll(".code-choice.selected").forEach(item => item.classList.remove("selected"));
}

function resetReorderTask(task) {
  task.querySelectorAll(".code-choice").forEach(choice => { choice.hidden = false; choice.classList.remove("selected"); });
  task.querySelectorAll(".code-drop-slot").forEach(slot => {
    delete slot.dataset.choiceId;
    delete slot.dataset.line;
    slot.textContent = "___";
    slot.classList.remove("filled", "correct", "incorrect");
  });
  const feedback = task.querySelector(".feedback");
  if (feedback) feedback.hidden = true;
}

function enablePointerSorting(event) {
  const row = event.target.closest(".sortable-line");
  if (!row || event.target.closest("button")) return;
  const list = row.parentElement;
  row.classList.add("dragging");
  row.setPointerCapture?.(event.pointerId);
  const move = pointerEvent => {
    const target = document.elementFromPoint(pointerEvent.clientX, pointerEvent.clientY)?.closest(".sortable-line");
    if (target && target !== row && target.parentElement === list) {
      const rect = target.getBoundingClientRect();
      list.insertBefore(row, pointerEvent.clientY < rect.top + rect.height / 2 ? target : target.nextElementSibling);
    }
  };
  const end = () => { row.classList.remove("dragging"); row.removeEventListener("pointermove", move); row.removeEventListener("pointerup", end); row.removeEventListener("pointercancel", end); updateLineLabels(list); };
  row.addEventListener("pointermove", move);
  row.addEventListener("pointerup", end);
  row.addEventListener("pointercancel", end);
}

document.addEventListener("click", handleClick);
document.addEventListener("change", event => {
  if (!event.target.matches("#challenge-level")) return;
  const level = K.features.practice.levels[event.target.value];
  if (!level) return;
  document.querySelector("#challenge-task").textContent = K.i18n.language === "en" ? level.taskEn : level.task;
  document.querySelector("#challenge-points").textContent = String(level.points);
  const hint = document.querySelector('[data-action="challenge-hint"]');
  hint.dataset.step = "0";
  hint.textContent = K.i18n.t("hint");
  document.querySelector("#challenge-hint-output").hidden = true;
  document.querySelector("#challenge-status").textContent = "";
  const completedId = `${activeLesson.language}:${activeLesson.id}:${event.target.value}`;
  document.querySelector("#challenge-complete").hidden = !(K.store.getProgress().completedChallenges || []).includes(completedId);
});
document.addEventListener("submit", handleSubmit);
document.addEventListener("pointerdown", enablePointerSorting);
document.addEventListener("pointerdown", event => {
  if (event.pointerType === "mouse") return;
  const choice = event.target.closest(".code-choice");
  if (!choice || choice.hidden) return;
  event.preventDefault();
  touchCodeDrag = { choice, pointerId: event.pointerId, slot: null };
  choice.classList.add("dragging", "selected");
  choice.setPointerCapture?.(event.pointerId);
});
document.addEventListener("pointermove", event => {
  if (!touchCodeDrag || event.pointerId !== touchCodeDrag.pointerId) return;
  const slot = document.elementFromPoint(event.clientX, event.clientY)?.closest(".code-drop-slot");
  if (touchCodeDrag.slot && touchCodeDrag.slot !== slot) touchCodeDrag.slot.classList.remove("drag-over");
  touchCodeDrag.slot = slot;
  slot?.classList.add("drag-over");
});
document.addEventListener("pointerup", event => {
  if (!touchCodeDrag || event.pointerId !== touchCodeDrag.pointerId) return;
  const { choice, slot } = touchCodeDrag;
  slot?.classList.remove("drag-over");
  choice.classList.remove("dragging");
  if (slot && slot.closest("[data-reorder]") === choice.closest("[data-reorder]")) placeCodeChoice(slot, choice);
  touchCodeDrag = null;
});
document.addEventListener("pointercancel", event => {
  if (!touchCodeDrag || event.pointerId !== touchCodeDrag.pointerId) return;
  touchCodeDrag.slot?.classList.remove("drag-over");
  touchCodeDrag.choice.classList.remove("dragging");
  touchCodeDrag = null;
});
document.addEventListener("dragstart", event => {
  const choice = event.target.closest(".code-choice");
  if (!choice) return;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", choice.dataset.codeChoice);
  choice.classList.add("dragging");
});
document.addEventListener("dragend", event => event.target.closest(".code-choice")?.classList.remove("dragging"));
document.addEventListener("dragover", event => {
  const slot = event.target.closest(".code-drop-slot");
  if (!slot) return;
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  slot.classList.add("drag-over");
});
document.addEventListener("dragleave", event => event.target.closest(".code-drop-slot")?.classList.remove("drag-over"));
document.addEventListener("drop", event => {
  const slot = event.target.closest(".code-drop-slot");
  if (!slot) return;
  event.preventDefault();
  slot.classList.remove("drag-over");
  const choiceId = event.dataTransfer.getData("text/plain");
  const choice = slot.closest("[data-reorder]").querySelector(`[data-code-choice="${choiceId}"]`);
  if (choice) placeCodeChoice(slot, choice);
});
document.addEventListener("focusin", event => { const annotation = event.target.closest(".annotated"); if (annotation) showTooltip(annotation); });
document.addEventListener("keydown", event => {
  const languageTab = event.target.closest?.('[role="radio"][data-nav-lang]');
  if (languageTab && ["ArrowLeft", "ArrowRight"].includes(event.key)) {
    event.preventDefault();
    const radios = [...document.querySelectorAll("[data-nav-lang]")];
    const index = radios.indexOf(languageTab);
    const next = radios[(index + (event.key === "ArrowRight" ? 1 : -1) + radios.length) % radios.length];
    next.focus();
    next.click();
  }
  if (event.key === "Tab" && event.target.matches("textarea.editor")) {
    event.preventDefault();
    const field = event.target;
    const start = field.selectionStart;
    const end = field.selectionEnd;
    field.setRangeText("    ", start, end, "end");
    field.dispatchEvent(new Event("input", { bubbles: true }));
  }
  if (event.key === "Escape") {
    closeTooltip();
    const searchForm = document.querySelector("#search-form");
    if (searchForm.classList.contains("expanded")) {
      searchForm.classList.remove("expanded");
      document.querySelector("#search-results").hidden = true;
      const searchToggle = document.querySelector("#search-toggle");
      if (searchToggle.hidden) document.querySelector(".wordmark").focus();
      else searchToggle.focus();
    }
  }
  if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) { event.preventDefault(); focusSearch(); }
  if (["Enter", " "].includes(event.key) && event.target.matches(".annotated")) { event.preventDefault(); showTooltip(event.target); }
});
document.addEventListener("click", event => { if (!event.target.closest(".annotated")) closeTooltip(); });
document.querySelector("#search-input").addEventListener("input", event => { clearTimeout(searchTimer); const value = event.target.value; searchTimer = setTimeout(() => renderSearchResults(value), 140); });
document.querySelector("#search-input").addEventListener("keydown", event => { if (event.key === "Escape") { event.target.value = ""; renderSearchResults(""); event.target.blur(); } });
document.querySelector("#search-toggle").addEventListener("click", focusSearch);
document.querySelector("#theme-toggle").addEventListener("click", () => { const current = document.documentElement.dataset.theme || "light"; const next = current === "dark" ? "light" : "dark"; saveTheme(next); applyTheme(next); });
document.querySelector("#search-form").addEventListener("submit", event => { event.preventDefault(); const first = document.querySelector("#search-results a"); if (first) location.hash = first.getAttribute("href"); });
document.querySelector("#search-results").addEventListener("click", () => { document.querySelector("#search-results").hidden = true; });
document.querySelector("#search-input").addEventListener("blur", () => { setTimeout(() => { if (!document.querySelector("#search-results").matches(":hover")) document.querySelector("#search-results").hidden = true; }, 120); });
document.addEventListener("keydown", event => { if (event.key === "Tab") document.body.classList.add("keyboard-mode"); });

applyTheme(getTheme());
const searchToggle = document.querySelector("#search-toggle");
const updateSearchButton = () => { searchToggle.hidden = window.innerWidth >= 640; };
updateSearchButton(); window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(updateSearchButton, 100); }, { passive: true });
const missingLessons = allLessons.filter(item => !loadLesson(item.language, item.id)).map(item => `${item.language}/${item.id}`);
if (missingLessons.length) console.warn("Missing registered lessons:", missingLessons);
K.app = { render, footer };
startRouter(render);
})(window.Kodigo = window.Kodigo || {});
