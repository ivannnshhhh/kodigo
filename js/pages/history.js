// Renders language history pages using local registry data.
(function (K) {
// Builds the language-specific history content and navigation.
function renderHistory(language, lastTopic) {
  const data = K.history[language];
  const curriculum = K.curriculum[language];
  const topic = curriculum.topics.find(item => item.id === lastTopic);
  const continueLink = topic
    ? `<a class="button" href="#/${language}/${topic.id}">${data.continueLabel}: ${K.features.escapeHtml(topic.title)}</a>`
    : "";
  return `<article class="content-section history-page">
    <header class="lesson-heading"><div class="eyebrow">${curriculum.name} · History</div><h1>${data.title}</h1><p class="muted">${data.hook}</p><p class="muted">Ginawa ni ${K.features.escapeHtml(data.creator)}.</p></header>
    ${continueLink ? `<div class="button-row">${continueLink}</div>` : ""}
    <section class="content-section"><h2>Timeline</h2><ol class="history-timeline">${data.timeline.map(item => `<li><strong>${K.features.escapeHtml(item.year)}</strong><span>${K.features.escapeHtml(item.event)}</span></li>`).join("")}</ol></section>
    <section class="content-section"><h2>Bakit sikat?</h2><ul>${data.popular.map(item => `<li>${K.features.escapeHtml(item)}</li>`).join("")}</ul></section>
    <section class="content-section"><h2>Saan ginagamit?</h2><ul>${data.uses.map(item => `<li>${K.features.escapeHtml(item)}</li>`).join("")}</ul></section>
    <section class="content-section"><h2>Mahahalagang milestones</h2><div class="history-milestones">${(data.milestones || []).map(item => `<article class="panel"><h3>${K.features.escapeHtml(item.title)}</h3><p>${K.features.escapeHtml(item.text)}</p></article>`).join("")}</div></section>
    <section class="content-section"><h2>Saan magsisimula?</h2><ol>${(data.startHere || []).map(item => `<li>${K.features.escapeHtml(item)}</li>`).join("")}</ol></section>
    <aside class="history-fun-fact"><strong>Fun fact</strong><p>${K.features.escapeHtml(data.funFact)}</p></aside>
    <nav class="lesson-bottom-nav" aria-label="Lesson navigation"><span></span><a class="button primary" href="#/${language}/${curriculum.topics[0].id}">Simulan na: Topic 1</a></nav>
    ${K.app.footer()}
  </article>`;
}
K.pages = K.pages || {};
K.pages.history = { renderHistory };
})(window.Kodigo = window.Kodigo || {});
