(() => {
  const root = document.documentElement;
  const nav = document.getElementById("primary-nav");
  const menu = document.querySelector(".menu-toggle");
  const pages = [...document.querySelectorAll(".page")];
  const themeButton = document.querySelector(".theme-toggle");
  const pageNames = {
    home: "Home",
    experience: "Experience",
    projects: "Projects",
    education: "Education",
    skills: "Skills & certifications",
    about: "About",
  };
  const aliases = { top: "home", work: "projects", stack: "skills" };
  const filters = [...document.querySelectorAll("[data-filter]")];
  const cards = [...document.querySelectorAll(".project-card")];

  function syncTheme() {
    const dark = root.dataset.theme === "dark";
    document.getElementById("theme-label").textContent = dark
      ? "Light mode"
      : "Dark mode";
    themeButton.setAttribute(
      "aria-label",
      dark ? "Switch to light theme" : "Switch to dark theme",
    );
    document.querySelector('meta[name="theme-color"]').content = dark
      ? "#141b18"
      : "#f6f5f0";
  }
  syncTheme();
  themeButton.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", root.dataset.theme);
    } catch (_) {}
    syncTheme();
  });
  function closeMenu() {
    nav.classList.remove("is-open");
    menu.setAttribute("aria-expanded", "false");
  }
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menu.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
      menu.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".sidebar")) closeMenu();
  });
  window.matchMedia("(min-width: 901px)").addEventListener("change", closeMenu);

  function filterProjects(category) {
    let count = 0;
    filters.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === category),
      ),
    );
    cards.forEach((card) => {
      card.hidden =
        category !== "all" &&
        !card.dataset.category.split(" ").includes(category);
      if (!card.hidden) count++;
    });
    document.querySelector(".project-count").textContent =
      `${count} ${count === 1 ? "project" : "projects"}`;
  }
  filters.forEach((button) =>
    button.addEventListener("click", () =>
      filterProjects(button.dataset.filter),
    ),
  );

  function route(moveFocus = true) {
    const [raw = "home", project] = location.hash.slice(1).split("/");
    if (raw === "main") return; // Preserve the native skip link.
    const requested = aliases[raw] || raw || "home";
    const id = Object.hasOwn(pageNames, requested) ? requested : "home";
    pages.forEach((page) => {
      page.hidden = page.id !== id;
    });
    nav.querySelectorAll("a").forEach((link) => {
      if (link.hash === `#${id}`) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    document.getElementById("page-label").textContent =
      pageNames[id].toUpperCase();
    document.title =
      id === "home"
        ? "Deeksha Sinha — Software Engineer"
        : `${pageNames[id]} — Deeksha Sinha`;
    closeMenu();
    if (id === "projects" && project) filterProjects("all");
    const target =
      id === "projects" && project
        ? document.getElementById(`project-${project}`)
        : null;
    if (moveFocus) {
      const focus = target || document.querySelector(`#${id} h1`);
      focus.setAttribute("tabindex", "-1");
      focus.focus({ preventScroll: true });
    }
    if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    else if (moveFocus) window.scrollTo({ top: 0, behavior: "instant" });
  }
  window.addEventListener("hashchange", () => route());
  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link && link.hash === location.hash) {
      closeMenu();
      route();
    }
  });
  route(false);
})();
