document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuToggle || !mobileMenu) {
    console.warn("Elementos do menu mobile não encontrados.");
    return;
  }

  const closeButton = mobileMenu.querySelector(".mobile-menu__close");
  const backdrop = mobileMenu.querySelector(".mobile-menu__backdrop");
  const menuLinks = mobileMenu.querySelectorAll(
    ".mobile-menu__nav a, .mobile-menu__cta"
  );

  let closeTimer;

  function openMenu() {
    window.clearTimeout(closeTimer);

    mobileMenu.hidden = false;

    requestAnimationFrame(() => {
      mobileMenu.classList.add("is-open");
    });

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu");

    document.body.classList.add("menu-open");

    closeButton?.focus();
  }

  function closeMenu({ restoreFocus = true } = {}) {
    mobileMenu.classList.remove("is-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");

    document.body.classList.remove("menu-open");

    closeTimer = window.setTimeout(() => {
      mobileMenu.hidden = true;
    }, 240);

    if (restoreFocus) {
      menuToggle.focus();
    }
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeButton?.addEventListener("click", () => {
    closeMenu();
  });

  backdrop?.addEventListener("click", () => {
    closeMenu();
  });

  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu({ restoreFocus: false });
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !mobileMenu.hidden) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && !mobileMenu.hidden) {
      closeMenu({ restoreFocus: false });
    }
  });
});