// The sidebar renders one language's complete topic list and updates completion in place.
(function (K) {
const svgNamespace = "http://www.w3.org/2000/svg";
let renderedLanguage = "";
let lastRoute = "";

function makeIcon(complete) {
  const svg = document.createElementNS(svgNamespace, "svg");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("sidebar-icon");
  if (complete) {
    const circle = document.createElementNS(svgNamespace, "circle");
    circle.setAttribute("cx", "8");
    circle.setAttribute("cy", "8");
    circle.setAttribute("r", "6");
    circle.setAttribute("fill", "currentColor");
    const check = document.createElementNS(svgNamespace, "path");
    check.setAttribute("d", "m4.7 8 2.1 2.1 4.6-4.5");
    check.setAttribute("fill", "none");
    check.setAttribute("stroke", "var(--surface)");
    check.setAttribute("stroke-width", "1.6");
    check.setAttribute("stroke-linecap", "round");
    check.setAttribute("stroke-linejoin", "round");
    svg.append(circle, check);
  }
  return svg;
}

// Draws the clock icon used by the pinned History row.
function makeHistoryIcon() {
  const svg = document.createElementNS(svgNamespace, "svg");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("sidebar-icon");
  const circle = document.createElementNS(svgNamespace, "circle");
  circle.setAttribute("cx", "8");
  circle.setAttribute("cy", "8");
  circle.setAttribute("r", "6");
  circle.setAttribute("fill", "none");
  circle.setAttribute("stroke", "currentColor");
  circle.setAttribute("stroke-width", "1.4");
  const hands = document.createElementNS(svgNamespace, "path");
  hands.setAttribute("d", "M8 4.5V8l2.2 1.4");
  hands.setAttribute("fill", "none");
  hands.setAttribute("stroke", "currentColor");
  hands.setAttribute("stroke-width", "1.4");
  hands.setAttribute("stroke-linecap", "round");
  hands.setAttribute("stroke-linejoin", "round");
  svg.append(circle, hands);
  return svg;
}

function makeTopicRow(topic, language, completed) {
  const row = document.createElement("a");
  row.className = "nav-topic-row";
  row.href = `#/${language}/${topic.id}`;
  row.dataset.topicId = topic.id;
  row.dataset.topicLang = language;
  row.setAttribute("aria-label", `${topic.n}. ${topic.title}${completed ? ", complete" : ""}`);
  const number = document.createElement("span");
  number.className = "nav-topic-number";
  number.dataset.topicNumber = "";
  number.textContent = String(topic.n);
  if (completed) number.replaceChildren(makeIcon(true));
  const title = document.createElement("span");
  title.className = "nav-topic-title";
  title.textContent = topic.title;
  row.append(number, title);
  return row;
}

// Creates the History link that stays above curriculum groups.
function makeHistoryRow(language) {
  const row = document.createElement("a");
  row.className = "nav-topic-row nav-history-row";
  row.href = `#/${language}/history`;
  row.dataset.historyLang = language;
  row.setAttribute("aria-label", "History");
  const icon = document.createElement("span");
  icon.className = "nav-topic-number";
  icon.append(makeHistoryIcon());
  const title = document.createElement("span");
  title.className = "nav-topic-title";
  title.textContent = "History";
  row.append(icon, title);
  return row;
}

function buildTopicList(middle, language, progress) {
  middle.replaceChildren();
  const topics = K.curriculum[language].topics;
  const completed = new Set(progress.completed || []);
  middle.append(makeHistoryRow(language));
  K.levelIds.forEach(level => {
    const group = document.createElement("section");
    group.className = "nav-topic-group";
    const heading = document.createElement("h2");
    heading.className = "nav-level-heading";
    heading.textContent = level[0].toUpperCase() + level.slice(1);
    const list = document.createElement("div");
    list.className = "nav-topic-list";
    topics.filter(topic => topic.level === level).forEach(topic => {
      list.append(makeTopicRow(topic, language, completed.has(`${language}:${topic.id}`)));
    });
    group.append(heading, list);
    middle.append(group);
  });
}

function updateCurrent(middle, route, language, scrollCurrent) {
  let current = null;
  const history = middle.querySelector(".nav-history-row");
  const historyActive = route.page === "history" && route.language === language;
  history.classList.toggle("current", historyActive);
  history.removeAttribute("aria-current");
  if (historyActive) {
    history.setAttribute("aria-current", "page");
    current = history;
  }
  middle.querySelectorAll(".nav-topic-row[data-topic-id]").forEach(row => {
    const active = route.page === "lesson" && route.language === language && route.lesson === row.dataset.topicId;
    row.classList.toggle("current", active);
    row.removeAttribute("aria-current");
    if (active) {
      row.setAttribute("aria-current", "page");
      current = row;
    }
  });
  if (current && scrollCurrent) current.scrollIntoView({ block: "nearest" });
}

function renderSidebar(route, state, progress) {
  const middle = document.querySelector("#course-nav");
  if (renderedLanguage !== state.lang) {
    buildTopicList(middle, state.lang, progress);
    renderedLanguage = state.lang;
  }
  const routeKey = `${route.page}/${route.language || ""}/${route.lesson || ""}`;
  updateCurrent(middle, route, state.lang, routeKey !== lastRoute);
  lastRoute = routeKey;
}

function updateLessonStatus(language, id, complete) {
  const row = document.querySelector(`.nav-topic-row[data-topic-lang="${language}"][data-topic-id="${id}"]`);
  if (!row) return;
  const number = row.querySelector("[data-topic-number]");
  const topic = K.curriculum[language].topics.find(item => item.id === id);
  number.replaceChildren(complete ? makeIcon(true) : document.createTextNode(String(topic.n)));
  row.setAttribute("aria-label", `${topic.n}. ${topic.title}${complete ? ", complete" : ""}`);
}

K.ui = K.ui || {};
K.ui.nav = { renderSidebar, updateLessonStatus };
})(window.Kodigo = window.Kodigo || {});
