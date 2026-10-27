 (function (K) {
function normalizeCode(code) { return code.trim().replace(/\r/g, "").replace(/[ \t]+$/gm, ""); }

function renderDebug(debug = []) {
  if (!debug.length) return "";
  return `<section class="content-section panel" id="debug-mode"><div><span class="eyebrow">Sirang code</span><h2>Hanapin at ayusin ang bug</h2></div>${debug.map((item, index) => `<article class="content-section" data-debug="${index}"><label for="debug-editor-${index}">I-edit ang code</label><textarea class="editor" id="debug-editor-${index}" spellcheck="false">${item.buggyCode.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</textarea><div class="button-row"><button class="button" data-action="debug-hint" data-index="${index}">Hint</button><button class="button primary" data-action="debug-check" data-index="${index}">Check</button><span class="feedback" id="debug-feedback-${index}" aria-live="polite" hidden></span></div><div class="output-box" id="debug-hint-${index}" hidden></div></article>`).join("")}</section>`;
}
K.features.debugMode = { normalizeCode, renderDebug };
})(window.Kodigo = window.Kodigo || {});