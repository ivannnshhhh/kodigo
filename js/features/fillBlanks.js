(function (K) {
function renderFillBlanks(tasks = []) {
  if (!tasks.length) return "";
  const escape = K.features.escapeHtml;
  const english = K.i18n.language === "en";
  return `<section class="content-section panel" id="fill-in-the-blank"><div><span class="eyebrow">${K.i18n.t("fillInBlank")}</span><h2>${K.i18n.t("completeCode")}</h2><p class="muted">${english ? "Read the context, enter the missing code, and check your answer." : "Tingnan ang context, ilagay ang missing code, at i-check ang sagot."}</p></div>${tasks.map((task, index) => `<article class="fill-blank-card" data-fill-blank="${index}"><div class="code-frame"><div class="code-scroll"><pre class="code-lines">${escape(K.i18n.practiceCode(task.code))}</pre></div></div><label for="fill-blank-answer-${index}">${K.i18n.t("missingCode")}</label><input class="form-control fill-blank-input" id="fill-blank-answer-${index}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${K.i18n.t("typeMissingCode")}"><div class="button-row"><button class="button primary" type="button" data-action="check-fill-blank" data-index="${index}">${K.i18n.t("checkAnswer")}</button><span class="feedback" id="fill-blank-feedback-${index}" aria-live="polite" hidden></span></div></article>`).join("")}</section>`;
}
K.features.fillBlanks = { renderFillBlanks };
})(window.Kodigo = window.Kodigo || {});
