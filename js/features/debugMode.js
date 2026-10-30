 (function (K) {
function normalizeCode(code) { return code.trim().replace(/\r/g, "").replace(/[ \t]+$/gm, ""); }

function renderDebug(debug = []) {
  if (!debug.length) return "";
  const escape = K.features.escapeHtml;
  return `<section class="content-section panel" id="debug-mode"><div><span class="eyebrow">${K.i18n.t("brokenCode")}</span><h2>${K.i18n.t("findFixBug")}</h2></div>${debug.map((item, index) => `<article class="content-section" data-debug="${index}"><label for="debug-editor-${index}">${K.i18n.t("editCode")}</label><textarea class="editor" id="debug-editor-${index}" spellcheck="false">${escape(K.i18n.practiceCode(item.buggyCode))}</textarea><div class="button-row"><button class="button" data-action="debug-hint" data-index="${index}">${K.i18n.t("hint")}</button><button class="button primary" data-action="debug-check" data-index="${index}">${K.i18n.t("check")}</button><span class="feedback" id="debug-feedback-${index}" aria-live="polite" hidden></span></div><div class="output-box" id="debug-hint-${index}" hidden></div></article>`).join("")}</section>`;
}
K.features.debugMode = { normalizeCode, renderDebug };
})(window.Kodigo = window.Kodigo || {});