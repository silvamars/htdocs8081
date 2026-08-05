export function initNavbar() {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (!header || !navToggle || !mainNav) return;

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 30);
  };

  const closeMobileMenu = () => {
    mainNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}
