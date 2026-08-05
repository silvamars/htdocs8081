function normalizeText(value = "") {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function initProductCatalog() {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const productCards = [...document.querySelectorAll(".product-card")];
  const noResults = document.getElementById("noResults");
  const categoryButtons = document.querySelectorAll("[data-filter]");

  if (!searchInput || !categoryFilter || !productCards.length || !noResults) {
    return null;
  }

  const filterProducts = () => {
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
      if (shouldShow) visibleCount += 1;
    });

    noResults.hidden = visibleCount !== 0;
  };

  searchInput.addEventListener("input", filterProducts);
  categoryFilter.addEventListener("change", filterProducts);

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryFilter.value = button.dataset.filter;
      searchInput.value = "";
      filterProducts();
      document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
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

  return {
    searchInput,
    categoryFilter,
    filterProducts,
  };
}
