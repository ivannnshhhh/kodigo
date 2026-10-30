// Hash routing keeps every page available from file:// without local fetches.
(function (K) {
function readRoute() {
  const path = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  if (!path.length) return { page: "home" };
  if (path[0] === "roadmap") {
    if (path.length === 1) return { page: "roadmap" };
    if (path.length === 2 && /^[a-z0-9-]+$/.test(path[1])) return { page: "roadmap", path: path[1] };
    return { page: "not-found" };
  }
  if (path[0] === "kodigo-ko" || path[0] === "kodigo") return { page: "pins" };
  if (path[0] === "quiz") {
    if (path.length === 1) return { page: "quiz" };
    if (path.length === 2 && ["python", "java"].includes(path[1])) return { page: "quiz-language", language: path[1] };
    return { page: "not-found" };
  }
  if (!["python", "java"].includes(path[0])) return { page: "not-found" };
  if (path.length === 1) return { page: "language", language: path[0] };
  if (path.length === 2 && path[1] === "history") return { page: "history", language: path[0] };
  if (path.length !== 2 || !/^[a-z0-9-]+$/.test(path[1])) return { page: "not-found" };
  return { page: "lesson", language: path[0], lesson: path[1] };
}

function navigate(path) {
  location.hash = `/${path.replace(/^\//, "")}`;
}

function startRouter(render) {
  window.addEventListener("hashchange", render);
  render();
}
K.router = { readRoute, navigate, startRouter };
})(window.Kodigo = window.Kodigo || {});
