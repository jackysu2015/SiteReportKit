const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

function syncHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function setNavOpen(isOpen) {
  if (!header || !nav || !navToggle) return;
  document.body.classList.toggle("nav-open", isOpen);
  header.classList.toggle("is-open", isOpen);
  nav.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

navToggle?.addEventListener("click", () => {
  setNavOpen(!nav?.classList.contains("is-open"));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setNavOpen(false);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setNavOpen(false);
  }
});
