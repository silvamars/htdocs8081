export function initSearchModal(catalog) {
  const searchTrigger = document.querySelector(".search-trigger");
  const searchModal = document.getElementById("searchModal");
  const modalClose = document.querySelector(".modal-close");
  const modalBackdrop = document.querySelector(".search-modal__backdrop");
  const modalSearchInput = document.getElementById("modalSearchInput");
  const suggestionButtons = document.querySelectorAll("[data-query]");

  if (
    !searchTrigger ||
    !searchModal ||
    !modalClose ||
    !modalBackdrop ||
    !modalSearchInput
  ) {
    return;
  }

  const openSearchModal = () => {
    searchModal.hidden = false;
    document.body.classList.add("modal-open");
    window.setTimeout(() => modalSearchInput.focus(), 50);
  };

  const closeSearchModal = () => {
    searchModal.hidden = true;
    document.body.classList.remove("modal-open");
    modalSearchInput.value = "";
  };

  const sendQueryToCatalog = (query) => {
    if (!catalog || !query.trim()) return;

    catalog.searchInput.value = query.trim();
    catalog.categoryFilter.value = "all";
    catalog.filterProducts();
    closeSearchModal();
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
  };

  searchTrigger.addEventListener("click", openSearchModal);
  modalClose.addEventListener("click", closeSearchModal);
  modalBackdrop.addEventListener("click", closeSearchModal);

  suggestionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sendQueryToCatalog(button.dataset.query || "");
    });
  });

  modalSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      sendQueryToCatalog(modalSearchInput.value);
    }
  });

  document.addEventListener("keydown", (event) => {
    const isShortcut =
      (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";

    if (isShortcut) {
      event.preventDefault();
      searchModal.hidden ? openSearchModal() : closeSearchModal();
    }

    if (event.key === "Escape" && !searchModal.hidden) {
      closeSearchModal();
    }
  });
}
