document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const productCards = [...document.querySelectorAll(".product-card")];
  const noResults = document.getElementById("noResults");
  const categoryButtons = document.querySelectorAll("[data-filter]");

  const searchTrigger = document.querySelector(".search-trigger");
  const searchModal = document.getElementById("searchModal");
  const modalClose = document.querySelector(".modal-close");
  const modalBackdrop = document.querySelector(".search-modal__backdrop");
  const modalSearchInput = document.getElementById("modalSearchInput");
  const suggestionButtons = document.querySelectorAll("[data-query]");

  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterMessage = document.getElementById("newsletterMessage");

  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 30);
  }

  function closeMobileMenu() {
    mainNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function normalizeText(value) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function filterProducts() {
    const term = normalizeText(searchInput.value);
    const category = categoryFilter.value;
    let visibleCount = 0;

    productCards.forEach((card) => {
      const searchableText = normalizeText(card.dataset.search || card.textContent);
      const cardCategory = card.dataset.category;

      const matchesText = !term || searchableText.includes(term);
      const matchesCategory = category === "all" || cardCategory === category;
      const shouldShow = matchesText && matchesCategory;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    noResults.hidden = visibleCount !== 0;
  }

  function openSearchModal() {
    searchModal.hidden = false;
    document.body.classList.add("modal-open");

    window.setTimeout(() => {
      modalSearchInput.focus();
    }, 50);
  }

  function closeSearchModal() {
    searchModal.hidden = true;
    document.body.classList.remove("modal-open");
    modalSearchInput.value = "";
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  searchInput.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryFilter.value = button.dataset.filter;
      searchInput.value = "";
      filterProducts();
      document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    });
  });

  document.querySelectorAll(".favorite-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const active = button.classList.toggle("is-active");
      button.textContent = active ? "♥" : "♡";
      button.setAttribute(
        "aria-label",
        active ? "Remover dos favoritos" : "Adicionar aos favoritos"
      );
    });
  });

  searchTrigger.addEventListener("click", openSearchModal);
  modalClose.addEventListener("click", closeSearchModal);
  modalBackdrop.addEventListener("click", closeSearchModal);

  suggestionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      searchInput.value = button.dataset.query;
      categoryFilter.value = "all";
      filterProducts();
      closeSearchModal();
      document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    });
  });

  document.addEventListener("keydown", (event) => {
    const isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";

    if (isShortcut) {
      event.preventDefault();
      searchModal.hidden ? openSearchModal() : closeSearchModal();
    }

    if (event.key === "Escape" && !searchModal.hidden) {
      closeSearchModal();
    }
  });

  modalSearchInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    const value = modalSearchInput.value.trim();

    if (!value) return;

    searchInput.value = value;
    categoryFilter.value = "all";
    filterProducts();
    closeSearchModal();
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
  });

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    newsletterMessage.textContent =
      "Cadastro demonstrativo concluído. A integração real será adicionada depois.";

    newsletterForm.reset();
  });
});
