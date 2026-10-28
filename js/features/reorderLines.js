(function (K) {
function fallbackTask(lesson) {
  const lines = String(lesson?.code || lesson?.sections?.[0]?.code || "").split("\n").filter(line => line.trim()).slice(0, 4);
  if (lines.length < 2) return [];
  return [{ lines, explanation: "Basahin ang existing code, saka punan ang nawawalang bahagi." }];
}

function stableNumber(value) {
  return [...String(value)].reduce((total, character) => total + character.charCodeAt(0), 0);
}

function findBlank(lines, seed) {
  const patterns = [/System\.out\.println/g, /\bprint\b/g, /\breturn\b/g, /\bappend\b/g, /\bremove\b/g, /\bsort\b/g, /\brange\b/g, /\b(if|else|for|while|def|class|static)\b/g, /\b(String|int|double|boolean)\b/g, /\b[A-Za-z_]\w*\b/g];
  const searchableLines = lines.map(line => line.replace(/(["']).*?\1/g, " "));
  const candidates = [];
  patterns.forEach(pattern => searchableLines.forEach((line, lineIndex) => {
    for (const match of line.matchAll(pattern)) {
      const duplicate = candidates.some(item => item.lineIndex === lineIndex && item.start === match.index);
      if (!duplicate && !["true", "false", "null", "True", "False", "None", "System", "out", "println"].includes(match[0])) candidates.push({ lineIndex, answer: match[0], start: match.index, end: match.index + match[0].length });
    }
  }));
  return candidates.length ? candidates[stableNumber(seed) % candidates.length] : null;
}

function choicesFor(answer, language) {
  const defaults = language === "java" ? ["System.out.println", "return", "int"] : ["print", "input", "len"];
  return [...new Set([answer, ...defaults])].slice(0, 3).sort(() => Math.random() - .5);
}

function renderReorder(tasks = [], lesson) {
  const activityTasks = tasks.length ? tasks : fallbackTask(lesson);
  if (!activityTasks.length) return "";
  return `<section class="content-section panel" id="reorder-lines"><div><span class="eyebrow">Drag-and-Drop Coding</span><h2>Kumpletuhin ang isang missing part</h2><p class="muted">May existing code na sa code area. I-drag ang tamang choice papunta mismo sa <strong>___</strong> na blank. Sa phone, tap ang choice, then tap ang blank.</p></div>${activityTasks.map((task, taskIndex) => {
    const blank = findBlank(task.lines, `${lesson?.language}:${lesson?.id}:${taskIndex}`);
    if (!blank) return "";
    const choices = choicesFor(blank.answer, lesson?.language);
    const code = task.lines.map((line, index) => {
      if (index !== blank.lineIndex) return `<div class="code-starter-line"><span class="drop-line-number">${index + 1}</span><code>${K.features.escapeHtml(line) || " "}</code></div>`;
      const before = K.features.escapeHtml(line.slice(0, blank.start));
      const after = K.features.escapeHtml(line.slice(blank.end));
      return `<div class="code-starter-line"><span class="drop-line-number">${index + 1}</span><code>${before}<span class="code-drop-slot" data-drop-slot="${index}" data-expected-line="${K.features.escapeHtml(blank.answer)}" tabindex="0" role="button" aria-label="Missing code: drop an answer here">___</span>${after}</code></div>`;
    }).join("");
    return `<article class="drag-code-task" data-reorder="${taskIndex}"><p class="drag-task-label">Punan ang blank sa existing code.</p><div class="code-frame"><div class="code-scroll"><div class="code-drop-area">${code}</div></div></div><p class="muted">Choices</p><div class="code-choice-tray">${choices.map((choice, index) => `<button class="code-choice" type="button" draggable="true" data-code-choice="${index}" data-line="${K.features.escapeHtml(choice)}"><code>${K.features.escapeHtml(choice)}</code></button>`).join("")}</div><div class="button-row"><button type="button" class="button primary" data-action="check-reorder" data-index="${taskIndex}">Check answer</button><button type="button" class="button" data-action="reset-reorder" data-index="${taskIndex}">Reset</button><span class="feedback" id="reorder-feedback-${taskIndex}" aria-live="polite" hidden></span></div></article>`;
  }).join("")}</section>`;
}
K.features.reorderLines = { renderReorder };
})(window.Kodigo = window.Kodigo || {});
