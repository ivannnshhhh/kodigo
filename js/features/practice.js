(function (K) {
const escapeHtml = K.features.escapeHtml;
const levels = {
  beginner: {
    label: "Beginner",
    points: 10,
    task: "I-run ang starter code, pagkatapos baguhin ang kahit isang value o instruction para maipakita ang pangunahing idea ng topic.",
    hints: ["Hanapin ang value o linya na direktang konektado sa topic.", "Baguhin muna ang isang maliit na bahagi, saka i-run ulit."],
    taskEn: "Run the starter code, then change at least one value or instruction to demonstrate the main idea of the topic.",
    hintsEn: ["Find the value or line directly connected to the topic.", "Change one small part first, then run the code again."]
  },
  intermediate: {
    label: "Intermediate",
    points: 20,
    task: "Palawakin ang starter code: magdagdag ng isa pang value, case, o hakbang na gumagamit ng topic.",
    hints: ["I-reuse ang pattern na nasa starter code.", "Subukan ang dagdag na case at i-check kung tama ang output."],
    taskEn: "Extend the starter code by adding a value, case, or step that uses the topic.",
    hintsEn: ["Reuse a pattern from the starter code.", "Try an additional case and check whether the output is correct."]
  },
  advanced: {
    label: "Advanced",
    points: 30,
    task: "Gawing mas matibay ang starter code sa pamamagitan ng pag-handle ng boundary case o invalid na data.",
    hints: ["Isipin kung anong input o state ang puwedeng magdulot ng error.", "Magdagdag ng check bago gamitin o baguhin ang value."],
    taskEn: "Make the starter code more robust by handling a boundary case or invalid data.",
    hintsEn: ["Think about which input or state could cause an error.", "Add a check before using or changing the value."]
  }
};

function starterFor(lesson) {
  return lesson.editable?.starter || lesson.code || lesson.sections?.[0]?.code || "";
}

function renderChallenge(lesson, topic) {
  const starter = escapeHtml(K.i18n.practiceCode(starterFor(lesson)));
  const level = levels.beginner;
  const english = K.i18n.language === "en";
  const progress = K.store.getProgress();
  const completedId = `${lesson.language}:${lesson.id}:beginner`;
  const completed = (progress.completedChallenges || []).includes(completedId);
  return `<section class="content-section panel practice-challenge" id="coding-challenge">
    <div><span class="eyebrow">${K.i18n.t("codingChallenge")}</span><h2>${K.i18n.t("yourTurn")} ${escapeHtml(topic.title)}</h2><p class="muted">${K.i18n.t("chooseDifficulty")}</p></div>
    <label for="challenge-level">${K.i18n.t("difficulty")}</label><select class="form-control" id="challenge-level" data-action="challenge-level"><option value="beginner">${K.i18n.t("beginner")} · 10 points</option><option value="intermediate">${K.i18n.t("intermediate")} · 20 points</option><option value="advanced">${K.i18n.t("advanced")} · 30 points</option></select>
    <p id="challenge-task" class="feedback">${escapeHtml(english ? level.taskEn : level.task)}</p>
    <label for="challenge-editor">${K.i18n.t("solutionCode")}</label><textarea id="challenge-editor" class="editor" spellcheck="false">${starter}</textarea>
    <div class="button-row"><button class="button" type="button" data-action="challenge-hint">${K.i18n.t("hint")}</button><button class="button primary" type="button" data-action="challenge-submit">${K.i18n.t("runChallenge")} · <span id="challenge-points">${level.points}</span> points</button><span id="challenge-complete" class="badge" ${completed ? "" : "hidden"}>${K.i18n.t("completed")}</span></div>
    <div id="challenge-hint-output" class="feedback" aria-live="polite" hidden></div><p id="challenge-status" class="muted" aria-live="polite"></p><pre id="challenge-output" class="output-box" aria-live="polite">${K.i18n.t("readyWhenYouAre")}</pre>
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
    <div><span class="eyebrow">${K.i18n.t("memoryVisualization")}</span><h2>${K.i18n.t("peekMemory")}</h2><p class="muted">${K.i18n.t("stepThroughCode")}</p></div>
    <p id="memory-step-label" class="badge" aria-live="polite">Step 1 / ${trace.length}${first.line ? ` · line ${first.line}` : ""}</p>
    <div id="memory-values" class="memory-values" aria-live="polite">${entries.length ? entries.map(([name, value]) => `<article class="memory-value"><strong>${escapeHtml(name)}</strong><span class="memory-type">${escapeHtml(memoryType(value))}</span><code>${escapeHtml(displayMemoryValue(value))}</code></article>`).join("") : `<p class="muted">${K.i18n.t("noVariablesYet")}</p>`}</div>
    <p id="memory-note" class="muted">${escapeHtml(first.note || first.output ? K.i18n.lessonText(first.note || `Output: ${first.output}`, "Follow the code step to see the next change.") : K.i18n.t("noOutputThisStep"))}</p>
    <div class="button-row"><button class="button" type="button" data-action="memory-previous" ${trace.length < 2 ? "disabled" : ""}>${K.i18n.t("previousStep")}</button><button class="button primary" type="button" data-action="memory-next" ${trace.length < 2 ? "disabled" : ""}>${K.i18n.t("nextStep")}</button></div>
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
  const starter = escapeHtml(K.i18n.practiceCode(starterFor(lesson)));
  return `<section class="content-section panel" id="test-case-playground">
    <div><span class="eyebrow">${K.i18n.t("testCasePlayground")}</span><h2>${K.i18n.t("tryDifferentInputs")}</h2><p class="muted">${K.i18n.t("runEachTest")}</p>${lesson.language === "java" ? `<p class="annotation-note">${K.features.runner.RUNNER_CONFIG.java.enabled ? (K.i18n.language === "en" ? "Java code and test input are sent to the configured Piston runner." : "Ipinapadala ang Java code at test input sa configured Piston runner.") : escapeHtml(K.copy.javaRunnerNotice)}</p>` : ""}</div>
    <label for="playground-editor">Code editor</label><textarea id="playground-editor" class="editor" spellcheck="false">${starter}</textarea>
    <div id="test-cases" class="test-cases"><article class="test-case" data-test-case><div class="section-head"><h3>Test case 1 · ${K.i18n.t("baseline")}</h3><button class="button danger" type="button" data-action="remove-test-case" aria-label="${K.i18n.t("removeTestCase")} 1" disabled>${K.i18n.t("removeTestCase")}</button></div><label>${K.i18n.t("input")} <textarea class="form-control test-input" rows="2" placeholder="${K.i18n.t("oneInputPerLine")}"></textarea></label><label>${K.i18n.t("expectedOutput")} <textarea class="form-control test-expected" rows="2" placeholder="${K.i18n.t("expectedOutput")}">${escapeHtml(expected)}</textarea></label><p class="test-result feedback" aria-live="polite">${K.i18n.t("notRunYet")}</p></article><article class="test-case" data-test-case><div class="section-head"><h3>Test case 2 · ${K.i18n.t("ownEdgeCase")}</h3><button class="button danger" type="button" data-action="remove-test-case" aria-label="${K.i18n.t("removeTestCase")} 2">${K.i18n.t("removeTestCase")}</button></div><label>${K.i18n.t("input")} <textarea class="form-control test-input" rows="2" placeholder="${K.i18n.t("exampleInputs")}"></textarea></label><label>${K.i18n.t("expectedOutput")} <textarea class="form-control test-expected" rows="2" placeholder="${K.i18n.t("expectedBehavior")}"></textarea></label><p class="test-result feedback" aria-live="polite">${K.i18n.language === "en" ? "Add a case to test your solution." : "Maglagay ng case para ma-test ang solution."}</p></article></div>
    <div class="button-row"><button class="button" type="button" data-action="add-test-case">${K.i18n.t("addTestCase")}</button><button class="button primary" type="button" data-action="run-test-cases">${K.i18n.t("runAllTests")}</button></div><p id="test-status" class="muted" aria-live="polite"></p>
  </section>`;
}

K.features.practice = { levels, memoryTrace, memoryType, displayMemoryValue, renderChallenge, renderMemory, renderPlayground };
})(window.Kodigo = window.Kodigo || {});
