(function (K) {
const PREFIX = "kodigo:";
const memory = new Map();

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return memory.has(key) ? memory.get(key) : fallback;
  }
}

function write(key, value) {
  memory.set(key, value);
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch {}
  return value;
}

const getProgress = () => {
  const progress = read("progress", { completed: [], xp: 0, streak: 0, lastStudy: "" });
  const legacyIds = {
    "python:beginner:variables": "python:variables-and-data-types",
    "python:beginner:conditions": "python:conditional-statements",
    "python:beginner:loops": "python:loops",
    "python:beginner:functions": "python:functions",
    "java:beginner:variables": "java:java-fundamentals",
    "java:beginner:conditions": "java:conditional-statements",
    "java:beginner:loops": "java:loops",
    "java:beginner:methods": "java:methods"
  };
  progress.completed = [...new Set((Array.isArray(progress.completed) ? progress.completed : []).map(id => legacyIds[id] || id))];
  return progress;
};
const saveProgress = value => write("progress", value);
const getPins = () => read("pins", []);
const savePins = value => write("pins", value);
const getTheme = () => read("theme", "system");
const saveTheme = value => write("theme", value);
const getNav = () => {
  const value = read("nav", { lang: "python", lastTopic: {} });
  return {
    lang: value?.lang === "java" ? "java" : "python",
    lastTopic: {
      python: typeof value?.lastTopic?.python === "string" ? value.lastTopic.python : "",
      java: typeof value?.lastTopic?.java === "string" ? value.lastTopic.java : ""
    }
  };
};
const saveNav = value => write("nav", {
  lang: value?.lang === "java" ? "java" : "python",
  lastTopic: {
    ...getNav().lastTopic,
    ...(value?.lastTopic || {})
  }
});

function markComplete(id) {
  const progress = getProgress();
  if (!progress.completed.includes(id)) {
    progress.completed.push(id);
    progress.xp += 10;
    const today = new Date().toISOString().slice(0, 10);
    if (progress.lastStudy !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      progress.streak = progress.lastStudy === yesterday ? progress.streak + 1 : 1;
    }
    progress.lastStudy = today;
  }
  return saveProgress(progress);
}

function awardXP(amount) {
  const progress = getProgress();
  progress.xp = (Number(progress.xp) || 0) + amount;
  return saveProgress(progress);
}

function togglePin(snippet) {
  const pins = getPins();
  const index = pins.findIndex(item => item.id === snippet.id);
  if (index >= 0) pins.splice(index, 1);
  else pins.push(snippet);
  savePins(pins);
  return pins;
}
K.store = { getProgress, saveProgress, getPins, savePins, getTheme, saveTheme, getNav, saveNav, markComplete, awardXP, togglePin };
})(window.Kodigo = window.Kodigo || {});