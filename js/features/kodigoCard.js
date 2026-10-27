(function (K) {
function renderKodigoCard(snippets = [], pins = []) {
  if (!snippets.length) return "";
  const lessonId = document.body.dataset.lesson || "";
  return `<section class="kodigo-card" id="kodigo-card"><div class="kodigo-label"><span class="logo-mark" aria-hidden="true">k_</span><span>kodigo card</span></div>${snippets.map((item, index) => {
    const id = `${lessonId}:${index}`;
    const pinned = pins.some(pin => pin.id === id);
    return `<div class="snippet-row"><span class="sr-only">${K.features.escapeHtml(item.label)}</span><code>${K.features.escapeHtml(item.snippet)}</code><button class="icon-button" data-action="copy-snippet" data-index="${index}" aria-label="Kopyahin ang ${K.features.escapeHtml(item.label)}" title="Copy">⧉</button><button class="icon-button" data-action="pin-snippet" data-index="${index}" aria-label="${pinned ? "Alisin sa" : "I-pin sa"} Kodigo ko" aria-pressed="${pinned}">${pinned ? "★" : "☆"}</button></div>`;
  }).join("")}</section>`;
}
K.features.kodigoCard = { renderKodigoCard };
})(window.Kodigo = window.Kodigo || {});