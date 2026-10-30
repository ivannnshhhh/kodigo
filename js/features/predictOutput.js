(function (K) {
function renderPredictions(questions = []) {
  if (!questions.length) return "";
  return `<section class="content-section" id="predict-output"><div><span class="eyebrow">${K.i18n.t("predictOutput")}</span><h2>${K.i18n.t("predictQuestion")}</h2></div>${questions.map((question, index) => `<article class="panel predict-card" data-question="${index}"><h3>${K.i18n.t("question")} ${index + 1}</h3><div class="code-frame"><div class="code-scroll"><pre class="code-lines">${K.i18n.practiceCode(question.code).split("\n").map((line, lineIndex) => `<span class="code-line" data-line="${lineIndex + 1}">${K.features.escapeHtml(line) || " "}</span>`).join("")}</pre></div></div><label for="predict-answer-${index}">${K.i18n.t("output")}</label><input class="form-control" id="predict-answer-${index}" autocomplete="off"><div class="button-row"><button class="button" data-action="check-predict" data-index="${index}">${K.i18n.t("check")}</button><span class="feedback" id="predict-feedback-${index}" aria-live="polite" hidden></span></div></article>`).join("")}</section>`;
}
K.features.predictOutput = { renderPredictions };
})(window.Kodigo = window.Kodigo || {});