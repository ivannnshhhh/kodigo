(function (K) {
function renderMiniProject(project) {
  if (!project) return "";
  return `<section class="content-section panel mini-project" id="mini-project"><div><span class="eyebrow">Mini project</span><h2>Gawin mo itong sarili mong code</h2></div><p>${K.features.escapeHtml(project.goal)}</p><label for="project-editor">Starter code</label><textarea class="editor" id="project-editor" spellcheck="false">${K.features.escapeHtml(project.starter)}</textarea><div class="button-row"><button class="button" data-action="project-hint">Hint</button><button class="button" data-action="project-solution">Show solution</button></div><div class="output-box" id="project-hint-output" hidden></div><pre class="output-box" id="project-solution-output" hidden>${K.features.escapeHtml(project.solution)}</pre></section>`;
}

K.features.miniProject = { renderMiniProject };
})(window.Kodigo = window.Kodigo || {});