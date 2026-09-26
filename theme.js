// Run before the page paints; storage can be unavailable in private browsing.
(() => {
  let theme;
  try {
    theme = localStorage.getItem("theme");
  } catch (_) {}
  if (theme !== "light" && theme !== "dark") {
    theme = "dark";
  }
  document.documentElement.dataset.theme = theme;
})();
