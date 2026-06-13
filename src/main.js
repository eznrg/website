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

document.querySelectorAll("[data-primer]").forEach((primer) => {
  const tabs = Array.from(primer.querySelectorAll("[data-primer-tab]"));
  const panels = Array.from(primer.querySelectorAll("[data-primer-panel]"));

  function activatePrimerTab(id) {
    tabs.forEach((tab) => {
      const active = tab.getAttribute("data-primer-tab") === id;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    panels.forEach((panel) => {
      const active = panel.getAttribute("data-primer-panel") === id;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  }

  tabs.forEach((tab, index) => {
    if (!tab.classList.contains("is-active")) {
      tab.tabIndex = -1;
    }

    tab.addEventListener("click", () => {
      activatePrimerTab(tab.getAttribute("data-primer-tab"));
    });

    tab.addEventListener("keydown", (event) => {
      const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
      if (!keys.includes(event.key)) return;

      event.preventDefault();

      let nextIndex = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      }

      const nextTab = tabs[nextIndex];
      activatePrimerTab(nextTab.getAttribute("data-primer-tab"));
      nextTab.focus();
    });
  });
});

document.querySelectorAll("[data-contract-upload]").forEach((upload) => {
  const input = upload.querySelector("[data-contract-input]");
  const status = upload.querySelector("[data-contract-status]");

  if (!input || !status) return;

  input.addEventListener("change", () => {
    const file = input.files && input.files[0];

    if (!file) {
      status.textContent = "No file selected.";
      status.classList.remove("is-ready", "is-error");
      return;
    }

    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      input.value = "";
      status.textContent = "Please choose a PDF supplier contract.";
      status.classList.add("is-error");
      status.classList.remove("is-ready");
      return;
    }

    const sizeMb = file.size / (1024 * 1024);
    status.textContent = `Selected: ${file.name} (${sizeMb.toFixed(1)} MB). Analysis agent coming soon.`;
    status.classList.add("is-ready");
    status.classList.remove("is-error");
  });
});
