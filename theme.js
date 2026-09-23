// Run before the page paints; storage can be unavailable in private browsing.
(() => {
  let theme;
  try {
    theme = localStorage.getItem("theme");
  } catch (_) {}
  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  document.documentElement.dataset.theme = theme;
})();
