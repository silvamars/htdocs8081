export function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  const message = document.getElementById("newsletterMessage");

  if (!form || !message) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    message.textContent =
      "Cadastro demonstrativo concluído. A integração real será adicionada depois.";
    form.reset();
  });
}
