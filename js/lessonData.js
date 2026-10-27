(function (K) {
function loadLesson(language, id) {
  if (!["python", "java"].includes(language) || !/^[a-z0-9-]+$/.test(id)) return null;
  return K.lessons?.[`${language}/${id}`] || null;
}
K.lessonData = { loadLesson };
})(window.Kodigo = window.Kodigo || {});