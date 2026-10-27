(function (K) {
K.features = K.features || {};
function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function highlightLine(line) {
  const pattern = /(#[^\n]*|\/\/[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b(def|class|return|if|elif|else|for|while|in|break|continue|True|False|None|and|or|not|import|from|as|try|except|finally|with|async|await|public|private|static|void|int|double|boolean|String|new|switch|case|default|extends|implements|return|this|super|throw|throws|final|abstract)\b|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*(?=\s*\()/g;
  let result = "";
  let last = 0;
  for (const match of line.matchAll(pattern)) {
    result += escapeHtml(line.slice(last, match.index));
    const token = match[0];
    let type = "syntax-function";
    if (match[1]) type = "syntax-comment";
    else if (match[2]) type = "syntax-string";
    else if (match[3]) type = "syntax-keyword";
    else if (/^\d/.test(token)) type = "syntax-number";
    result += `<span class="${type}">${escapeHtml(token)}</span>`;
    last = match.index + token.length;
  }
  return result + escapeHtml(line.slice(last));
}

function renderCode(code, annotations = [], currentLine = -1) {
  return String(code).split("\n").map((line, index) => {
    const lineNumber = index + 1;
    const note = annotations.find(item => item.line === lineNumber);
    const classes = ["code-line", currentLine === lineNumber ? "current" : ""].filter(Boolean).join(" ");
    let contents = highlightLine(line);
    if (note) {
      const noteAttrs = ` class="annotated" tabindex="0" role="button" aria-label="Paliwanag sa line ${lineNumber}" data-annotation="${escapeHtml(note.text)}"`;
      if (Number.isInteger(note.from) && Number.isInteger(note.to) && note.to > note.from) {
        const start = Math.max(0, Math.min(line.length, note.from));
        const end = Math.max(start, Math.min(line.length, note.to));
        contents = `${highlightLine(line.slice(0, start))}<span${noteAttrs}>${highlightLine(line.slice(start, end))}</span>${highlightLine(line.slice(end))}`;
      } else contents = `<span${noteAttrs}>${contents || " "}</span>`;
    }
    return `<span class="${classes}" data-line="${lineNumber}">${contents || " "}</span>`;
  }).join("");
}
K.features.escapeHtml = escapeHtml;
K.features.annotatedCode = { renderCode };
})(window.Kodigo = window.Kodigo || {});