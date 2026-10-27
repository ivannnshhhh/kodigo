(function (K) {
function renderReorder(tasks = []) {
  if (!tasks.length) return "";
  return `<section class="content-section panel" id="reorder-lines"><div><span class="eyebrow">Ayusin ang mga line</span><h2>Ilagay sa tamang order</h2></div>${tasks.map((task, taskIndex) => {
    const lines = [...task.lines].reverse();
    return `<div class="content-section" data-reorder="${taskIndex}"><div class="line-sort-list">${lines.map((line, index) => `<div class="sortable-line" draggable="false" data-sort-index="${index}"><code>${K.features.escapeHtml(line) || " "}</code><button type="button" class="icon-button" data-action="line-up" aria-label="Itaas ang line ${index + 1}" title="Move up">↑</button><button type="button" class="icon-button" data-action="line-down" aria-label="Ibaba ang line ${index + 1}" title="Move down">↓</button></div>`).join("")}</div><div class="button-row"><button type="button" class="button primary" data-action="check-reorder" data-index="${taskIndex}">Check</button><span class="feedback" id="reorder-feedback-${taskIndex}" aria-live="polite" hidden></span></div></div>`;
  }).join("")}</section>`;
}
K.features.reorderLines = { renderReorder };
})(window.Kodigo = window.Kodigo || {});