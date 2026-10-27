(function (K) {
const sidebar = document.querySelector("#sidebar");
const scrim = document.querySelector("#drawer-scrim");
const menuButton = document.querySelector("#menu-toggle");
let previousFocus = null;
let previousOverflow = "";

function focusableItems() {
  return [...sidebar.querySelectorAll('a[href], button:not(:disabled), select:not(:disabled), input:not(:disabled), [tabindex="0"]')]
    .filter(item => item.getClientRects().length > 0);
}

function openDrawer() {
  if (sidebar.classList.contains("open")) return;
  previousFocus = document.activeElement;
  previousOverflow = document.body.style.overflow;
  sidebar.classList.add("open");
  scrim.hidden = false;
  scrim.classList.add("open");
  menuButton.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
  const selectedLanguage = sidebar.querySelector('[data-nav-lang][aria-selected="true"]');
  const first = selectedLanguage || focusableItems()[0];
  if (first) first.focus();
}

function closeDrawer(returnFocus = true) {
  if (!sidebar.classList.contains("open")) return;
  sidebar.classList.remove("open");
  scrim.classList.remove("open");
  scrim.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  document.body.style.overflow = previousOverflow;
  if (returnFocus && previousFocus?.isConnected) previousFocus.focus();
}

function toggleDrawer() {
  if (sidebar.classList.contains("open")) closeDrawer();
  else openDrawer();
}

menuButton.addEventListener("click", toggleDrawer);
scrim.addEventListener("click", () => closeDrawer());
sidebar.addEventListener("click", event => {
  if (event.target.closest("#sidebar-close")) closeDrawer();
});
document.addEventListener("keydown", event => {
  if (!sidebar.classList.contains("open")) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeDrawer();
    return;
  }
  if (event.key !== "Tab") return;
  const items = focusableItems();
  if (!items.length) { event.preventDefault(); return; }
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

K.ui = K.ui || {};
K.ui.drawer = { open: openDrawer, close: closeDrawer, toggle: toggleDrawer, isOpen: () => sidebar.classList.contains("open") };
})(window.Kodigo = window.Kodigo || {});