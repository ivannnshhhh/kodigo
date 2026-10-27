(function (K) {
function replayAnimation(stage, type) {
  stage.replaceChildren();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stages = type === "loop"
    ? [1, 2, 3, 4, 5].map(value => ({ label: `Iteration ${value}`, values: [value] }))
    : type === "list"
      ? [{ label: "Empty list", values: [] }, { label: "Inserted items", values: ["A", "B", "C"] }, { label: "Index 0", values: ["0: A", "1: B", "2: C"] }, { label: "Removed index 1", values: ["0: A", "1: C"] }]
      : [{ label: "Before", values: ["score = 10"] }, { label: "Updated", values: ["score = 11"] }];
  const renderStage = stageIndex => {
    stage.replaceChildren();
    const label = document.createElement("span"); label.className = "muted"; label.textContent = stages[stageIndex].label; stage.append(label);
    stages[stageIndex].values.forEach(value => { const item = document.createElement("span"); item.className = "animation-item"; item.textContent = String(value); stage.append(item); });
  };
  if (reduced) { renderStage(stages.length - 1); return; }
  let current = 0;
  renderStage(0);
  const timer = setInterval(() => {
    current += 1;
    renderStage(current);
    if (current >= stages.length - 1) clearInterval(timer);
  }, 480);
}
K.features.animations = { replayAnimation };
})(window.Kodigo = window.Kodigo || {});