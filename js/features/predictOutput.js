(function (K) {
function renderPredictions(questions = []) {
  if (!questions.length) return "";
  return `<section class="content-section" id="predict-output"><div><span class="eyebrow">Hulaan ang output</span><h2>Ikaw muna: ano ang lalabas?</h2></div>${questions.map((question, index) => `<article class="panel predict-card" data-question="${index}"><h3>Question ${index + 1}</h3><div class="code-frame"><div class="code-scroll"><pre class="code-lines">${question.code.split("\n").map((line, lineIndex) => `<span class="code-line" data-line="${lineIndex + 1}">${K.features.escapeHtml(line) || " "}</span>`).join("")}</pre></div></div><label for="predict-answer-${index}">Output</label><input class="form-control" id="predict-answer-${index}" autocomplete="off"><div class="button-row"><button class="button" data-action="check-predict" data-index="${index}">Check</button><span class="feedback" id="predict-feedback-${index}" aria-live="polite" hidden></span></div></article>`).join("")}</section>`;
}
K.features.predictOutput = { renderPredictions };
})(window.Kodigo = window.Kodigo || {});