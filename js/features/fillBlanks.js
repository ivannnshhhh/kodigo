(function (K) {
function renderFillBlanks(tasks = []) {
  if (!tasks.length) return "";
  return `<section class="content-section panel" id="fill-in-the-blank"><div><span class="eyebrow">Fill in the blank</span><h2>Kumpletuhin ang code</h2><p class="muted">Tingnan ang context, ilagay ang missing code, then i-check ang sagot.</p></div>${tasks.map((task, index) => `<article class="fill-blank-card" data-fill-blank="${index}"><div class="code-frame"><div class="code-scroll"><pre class="code-lines">${K.features.escapeHtml(task.code)}</pre></div></div><label for="fill-blank-answer-${index}">Missing code</label><input class="form-control fill-blank-input" id="fill-blank-answer-${index}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="I-type ang missing code"><div class="button-row"><button class="button primary" type="button" data-action="check-fill-blank" data-index="${index}">Check answer</button><span class="feedback" id="fill-blank-feedback-${index}" aria-live="polite" hidden></span></div></article>`).join("")}</section>`;
}
K.features.fillBlanks = { renderFillBlanks };
})(window.Kodigo = window.Kodigo || {});
