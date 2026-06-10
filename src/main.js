const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");

if (menu && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  menu.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      menu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("[data-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const success = form.querySelector(".form-success");
    const error = form.querySelector(".form-error");
    const button = form.querySelector('button[type="submit"]');

    if (success) {
      success.hidden = true;
    }

    if (error) {
      error.hidden = true;
    }

    if (button) {
      button.disabled = true;
      button.dataset.label = button.innerHTML;
      button.textContent = "Sending...";
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new FormData(form),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Form submission failed.");
      }

      form.reset();

      if (success) {
        success.hidden = false;
      }
    } catch (formError) {
      if (error) {
        error.textContent =
          formError instanceof Error
            ? formError.message
            : "Something went wrong. Please try again soon.";
        error.hidden = false;
      }
    } finally {
      if (button) {
        button.disabled = false;
        button.innerHTML = button.dataset.label || "Submit";
      }
    }
  });
});
