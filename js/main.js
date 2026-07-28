import { initNavbar } from "./components/navbar.js";
import { initProductCatalog } from "./components/product-catalog.js";
import { initSearchModal } from "./components/search-modal.js";
import { initNewsletter } from "./components/newsletter.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();

  const catalog = initProductCatalog();
  initSearchModal(catalog);

  initNewsletter();
});
