(function (K) {
const escapeHtml = K.features.escapeHtml;
const levels = {
  beginner: {
    label: "Beginner",
    points: 10,
    task: "I-run ang starter code, pagkatapos baguhin ang kahit isang value o instruction para maipakita ang pangunahing idea ng topic.",
    hints: ["Hanapin ang value o linya na direktang konektado sa topic.", "Baguhin muna ang isang maliit na bahagi, saka i-run ulit."]
  },
  intermediate: {
    label: "Intermediate",
    points: 20,
    task: "Palawakin ang starter code: magdagdag ng isa pang value, case, o hakbang na gumagamit ng topic.",
    hints: ["I-reuse ang pattern na nasa starter code.", "Subukan ang dagdag na case at i-check kung tama ang output."]
  },
  advanced: {
    label: "Advanced",
    points: 30,
    task: "Gawing mas matibay ang starter code sa pamamagitan ng pag-handle ng boundary case o invalid na data.",
    hints: ["Isipin kung anong input o state ang puwedeng magdulot ng error.", "Magdagdag ng check bago gamitin o baguhin ang value."]
  }
};

function starterFor(lesson) {
  return lesson.editable?.starter || lesson.code || lesson.sections?.[0]?.code || "";
}

function renderChallenge(lesson, topic) {
  const starter = escapeHtml(starterFor(lesson));
  const level = levels.beginner;
  const progress = K.store.getProgress();
  const completedId = `${lesson.language}:${lesson.id}:beginner`;
  const completed = (progress.completedChallenges || []).includes(completedId);
  return `<section class="content-section panel practice-challenge" id="coding-challenge">
    <div><span class="eyebrow">Coding challenge</span><h2>Ikaw naman: ${escapeHtml(topic.title)}</h2><p class="muted">Pumili ng difficulty, gamitin ang hints kung kailangan, at i-run ang sariling solution. Kapag tumakbo nang walang error, makukuha mo ang points; gamitin ang test playground para i-verify ang output.</p></div>
    <label for="challenge-level">Difficulty</label><select class="form-control" id="challenge-level" data-action="challenge-level"><option value="beginner">Beginner · 10 points</option><option value="intermediate">Intermediate · 20 points</option><option value="advanced">Advanced · 30 points</option></select>
    <p id="challenge-task" class="feedback">${escapeHtml(level.task)}</p>
    <label for="challenge-editor">Solution code</label><textarea id="challenge-editor" class="editor" spellcheck="false">${starter}</textarea>
    <div class="button-row"><button class="button" type="button" data-action="challenge-hint">Hint</button><button class="button primary" type="button" data-action="challenge-submit">Run challenge · <span id="challenge-points">${level.points}</span> points</button><span id="challenge-complete" class="badge" ${completed ? "" : "hidden"}>Completed</span></div>
    <div id="challenge-hint-output" class="feedback" aria-live="polite" hidden></div><p id="challenge-status" class="muted" aria-live="polite"></p><pre id="challenge-output" class="output-box" aria-live="polite">Ready kapag ikaw na.</pre>
  </section>`;
}

function parseMemoryValue(source) {
  const value = source.trim().replace(/;\s*$/, "");
  if (/^(true|false)$/i.test(value)) return value.toLowerCase() === "true";
  if (/^(null|none)$/i.test(value)) return null;
  if (/^-?\d+(?:\.\d+)?$/.test(value)) return Number(value);
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) return value.slice(1, -1);
  if ((value.startsWith("[") && value.endsWith("]")) || (value.startsWith("{") && value.endsWith("}"))) {
    const body = value.slice(1, -1).trim();
    if (!body) return value.startsWith("[") ? [] : {};
    const parts = splitMemoryParts(body, ",");
    if (value.startsWith("[") || !parts.every(part => part.includes(":"))) return parts.map(parseMemoryValue);
    if (parts.every(part => part.includes(":"))) {
      return Object.fromEntries(parts.map(part => {
        const [keySource, ...valueParts] = splitMemoryParts(part, ":");
        return [String(parseMemoryValue(keySource)), parseMemoryValue(valueParts.join(":"))];
      }));
    }
  }
  const constructor = value.match(/^(?:new\s+)?([A-Za-z_$][\w$.]*)\((.*)\)$/);
  if (constructor) {
    return {
      type: constructor[1].split(".").pop(),
      constructorArguments: constructor[2].trim() ? splitMemoryParts(constructor[2], ",").map(parseMemoryValue) : []
    };
  }
  return value;
}

function splitMemoryParts(source, separator) {
  const parts = [];
  let start = 0;
  let depth = 0;
  let quote = "";
  let escaped = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (escaped) { escaped = false; continue; }
    if (char === "\\" && quote) { escaped = true; continue; }
    if (quote) { if (char === quote) quote = ""; continue; }
    if (char === '"' || char === "'") { quote = char; continue; }
    if ("[{(".includes(char)) depth += 1;
    else if ("]})".includes(char)) depth -= 1;
    else if (char === separator && depth === 0) {
      parts.push(source.slice(start, index).trim());
      start = index + 1;
    }
  }
  parts.push(source.slice(start).trim());
  return parts;
}

function memoryTrace(lesson) {
  const trace = Array.isArray(lesson.trace) ? lesson.trace : [];
  if (!trace[0]?.note?.startsWith("Start small:")) return trace.length ? trace : [{ vars: {} }];
  const vars = {};
  const steps = [];
  const lines = (lesson.code || lesson.sections?.[0]?.code || "").split(/\r?\n/);
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("//")) return;
    const assignment = trimmed.match(/^(?:[A-Za-z_$][\w$.[\]<>?, ]*\s+)?([A-Za-z_$][\w$]*)\s*=(?!=)\s*(.+?)\s*;?$/);
    if (assignment && !/^(if|else|for|while|switch|case|return|throw)\b/.test(trimmed)) {
      const name = assignment[1];
      const expression = assignment[2].replace(/;\s*$/, "");
      vars[name] = parseMemoryValue(expression);
      steps.push({ line: index + 1, vars: { ...vars }, note: `${name} = ${expression}` });
      return;
    }
    if (/\b(print|println|write|execute)\s*\(/.test(trimmed)) {
      steps.push({ line: index + 1, vars: { ...vars }, note: `Output/action: ${trimmed}` });
    }
  });
  return steps.length ? steps : trace;
}

function renderMemory(lesson) {
  const trace = memoryTrace(lesson);
  const first = trace[0];
  const entries = Object.entries(first.vars || {});
  return `<section class="content-section panel" id="memory-visualization">
    <div><span class="eyebrow">Memory visualization</span><h2>Silipin ang laman ng memory</h2><p class="muted">I-step ang code para makita ang pagbabago ng variables, collections, at object values habang sinusundan ang lesson.</p></div>
    <p id="memory-step-label" class="badge" aria-live="polite">Step 1 / ${trace.length}${first.line ? ` · line ${first.line}` : ""}</p>
    <div id="memory-values" class="memory-values" aria-live="polite">${entries.length ? entries.map(([name, value]) => `<article class="memory-value"><strong>${escapeHtml(name)}</strong><span class="memory-type">${escapeHtml(memoryType(value))}</span><code>${escapeHtml(displayMemoryValue(value))}</code></article>`).join("") : '<p class="muted">Wala pang variable values sa step na ito.</p>'}</div>
    <p id="memory-note" class="muted">${escapeHtml(first.note || first.output ? first.note || `Output: ${first.output}` : "I-advance ang step para makita ang susunod na pagbabago.")}</p>
    <div class="button-row"><button class="button" type="button" data-action="memory-previous" ${trace.length < 2 ? "disabled" : ""}>Previous step</button><button class="button primary" type="button" data-action="memory-next" ${trace.length < 2 ? "disabled" : ""}>Next step</button></div>
  </section>`;
}

function memoryType(value) {
  if (Array.isArray(value)) return "list / array";
  if (value === null) return "empty reference";
  if (typeof value === "object") return value.type ? `object · ${value.type}` : "object / dictionary";
  return typeof value;
}

function displayMemoryValue(value) {
  const serialized = JSON.stringify(value);
  return serialized === undefined ? String(value) : serialized;
}

function renderPlayground(lesson) {
  const expected = lesson.editable?.expectedOutput || "";
  return `<section class="content-section panel" id="test-case-playground">
    <div><span class="eyebrow">Test case playground</span><h2>I-test sa iba't ibang input</h2><p class="muted">Patakbuhin ang code sa bawat test case. Ilagay ang input (kung kailangan) at inaasahang output para makita kung pumasa o bumagsak.</p>${lesson.language === "java" ? `<p class="annotation-note">${K.features.runner.RUNNER_CONFIG.java.enabled ? "Ipinapadala ang Java code at test input sa configured Piston runner." : escapeHtml(K.copy.javaRunnerNotice)}</p>` : ""}</div>
    <label for="playground-editor">Code editor</label><textarea id="playground-editor" class="editor" spellcheck="false">${escapeHtml(starterFor(lesson))}</textarea>
    <div id="test-cases" class="test-cases"><article class="test-case" data-test-case><div class="section-head"><h3>Test case 1 · baseline</h3><button class="button danger" type="button" data-action="remove-test-case" aria-label="Alisin ang test case 1" disabled>Remove</button></div><label>Input <textarea class="form-control test-input" rows="2" placeholder="Isang input kada line"></textarea></label><label>Expected output <textarea class="form-control test-expected" rows="2" placeholder="Ilagay ang inaasahang output">${escapeHtml(expected)}</textarea></label><p class="test-result feedback" aria-live="polite">Hindi pa na-run.</p></article><article class="test-case" data-test-case><div class="section-head"><h3>Test case 2 · sariling edge case</h3><button class="button danger" type="button" data-action="remove-test-case" aria-label="Alisin ang test case 2">Remove</button></div><label>Input <textarea class="form-control test-input" rows="2" placeholder="Halimbawa: 0, blank, o ibang value"></textarea></label><label>Expected output <textarea class="form-control test-expected" rows="2" placeholder="Ano ang dapat mangyari?"></textarea></label><p class="test-result feedback" aria-live="polite">Maglagay ng case para ma-test ang solution.</p></article></div>
    <div class="button-row"><button class="button" type="button" data-action="add-test-case">Add test case</button><button class="button primary" type="button" data-action="run-test-cases">Run all tests</button></div><p id="test-status" class="muted" aria-live="polite"></p>
  </section>`;
}

K.features.practice = { levels, memoryTrace, memoryType, displayMemoryValue, renderChallenge, renderMemory, renderPlayground };
})(window.Kodigo = window.Kodigo || {});
