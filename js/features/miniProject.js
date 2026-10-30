(function (K) {
function renderMiniProject(project) {
  if (!project) return "";
  const text = (value, fallback) => K.i18n.lessonText(value, fallback);
  return `<section class="content-section panel mini-project" id="mini-project"><div><span class="eyebrow">${K.i18n.t("miniProject")}</span><h2>${K.i18n.t("makeItYourOwn")}</h2></div><p>${K.features.escapeHtml(text(project.goal, "Build a small project using the concepts from this lesson."))}</p><label for="project-editor">${K.i18n.t("starterCode")}</label><textarea class="editor" id="project-editor" spellcheck="false">${K.features.escapeHtml(K.i18n.practiceCode(project.starter))}</textarea><div class="button-row"><button class="button" data-action="project-hint">${K.i18n.t("hint")}</button><button class="button" data-action="project-solution">${K.i18n.t("showSolution")}</button></div><div class="output-box" id="project-hint-output" hidden></div><pre class="output-box" id="project-solution-output" hidden>${K.features.escapeHtml(K.i18n.practiceCode(project.solution))}</pre></section>`;
}

K.features.miniProject = { renderMiniProject };
})(window.Kodigo = window.Kodigo || {});