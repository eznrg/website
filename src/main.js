const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const precisePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

document.documentElement.classList.add("is-enhanced");

const header = document.querySelector(".site-header");

if (header) {
  const updateHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}

const revealElements = Array.from(document.querySelectorAll(".reveal"));

if (revealElements.length) {
  revealElements.forEach((element) => {
    const siblings = Array.from(element.parentElement?.children || []);
    const localIndex = siblings.indexOf(element);
    const delay = Math.max(0, Math.min(localIndex, 3)) * 70;
    element.style.setProperty("--reveal-delay", `${delay}ms`);
  });

  const revealAll = () => {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  };

  if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
    revealAll();
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  }
}

if (!reducedMotionQuery.matches && precisePointerQuery.matches) {
  const heroVisual = document.querySelector(".hero-visual");
  const strategyPanel = heroVisual?.querySelector(".strategy-panel");

  if (heroVisual && strategyPanel) {
    heroVisual.addEventListener("pointermove", (event) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      strategyPanel.style.setProperty("--tilt-x", `${(-y * 7).toFixed(2)}deg`);
      strategyPanel.style.setProperty("--tilt-y", `${(x * 9).toFixed(2)}deg`);
      strategyPanel.style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(1)}%`);
      strategyPanel.style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(1)}%`);
      heroVisual.classList.add("is-interacting");
    });

    heroVisual.addEventListener("pointerleave", () => {
      strategyPanel.style.setProperty("--tilt-x", "0deg");
      strategyPanel.style.setProperty("--tilt-y", "0deg");
      heroVisual.classList.remove("is-interacting");
    });
  }

  document
    .querySelectorAll(
      ".info-card, .learn-summary-card, .watch-card, .channel-card, .storage-card, .storage-visual-card, .founder-card, .upload-panel, .enrollment-card, .enrollment-payment-panel, .enrollment-aside",
    )
    .forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty("--glow-x", `${x.toFixed(1)}%`);
        card.style.setProperty("--glow-y", `${y.toFixed(1)}%`);
      });
    });
}

document.querySelectorAll("[data-enrollment-flow]").forEach((flow) => {
  const steps = Array.from(flow.querySelectorAll("[data-enrollment-step]"));
  const tabs = Array.from(flow.querySelectorAll("[data-enrollment-step-tab]"));
  const currentStepInput = flow.querySelector("[data-current-step]");
  const error = flow.querySelector(".form-error");
  let activeIndex = 0;

  function showStep(index, focus = true) {
    activeIndex = Math.max(0, Math.min(index, steps.length - 1));

    steps.forEach((step, stepIndex) => {
      const isActive = stepIndex === activeIndex;
      step.hidden = !isActive;
      step.classList.toggle("is-active", isActive);
    });

    tabs.forEach((tab, tabIndex) => {
      tab.classList.toggle("is-active", tabIndex === activeIndex);
      tab.classList.toggle("is-complete", tabIndex < activeIndex);
    });

    if (currentStepInput) {
      currentStepInput.value = String(activeIndex + 1);
    }

    if (focus) {
      const legend = steps[activeIndex]?.querySelector("legend");
      legend?.setAttribute("tabindex", "-1");
      legend?.focus({ preventScroll: true });
    }
  }

  function validateCurrentStep() {
    const controls = Array.from(
      steps[activeIndex]?.querySelectorAll("input, textarea, select") || [],
    ).filter(
      (control) =>
        !control.disabled &&
        control.type !== "hidden" &&
        !control.closest("[hidden]"),
    );

    for (const control of controls) {
      if (!control.checkValidity()) {
        control.reportValidity();
        return false;
      }
    }

    const selectedBillOption = steps[activeIndex]?.querySelector(
      "[data-bill-option]:checked",
    );

    if (selectedBillOption?.getAttribute("data-bill-option") === "upload") {
      const upload = steps[activeIndex].querySelector("[data-bill-upload]");
      const input = upload?.querySelector("[data-bill-input]");
      const status = upload?.querySelector("[data-bill-status]");

      if (!input?.files?.length) {
        if (status) {
          status.textContent =
            "Please choose a utility bill file or select Enter manually.";
          status.classList.add("is-error");
          status.classList.remove("is-ready");
        }

        upload?.classList.add("is-error");
        upload?.classList.remove("is-ready");
        return false;
      }
    }

    return true;
  }

  function setFlowError(message) {
    if (!error) return;

    error.textContent = message;
    error.hidden = false;
  }

  function clearFlowError() {
    if (error) {
      error.hidden = true;
    }
  }

  async function saveContactStep(button) {
    const name = flow.querySelector('[name="name"]')?.value.trim() || "";
    const phone = flow.querySelector('[name="phone"]')?.value.trim() || "";
    const saveKey = `${name}\n${phone}`;

    if (flow.dataset.contactSaveKey === saveKey) {
      return true;
    }

    const originalLabel = button.innerHTML;

    button.disabled = true;
    button.textContent = "Saving...";
    clearFlowError();

    try {
      const response = await fetch(flow.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "enrollment-contact",
          name,
          phone,
          sourcePath: window.location.pathname,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Contact save failed.");
      }

      flow.dataset.contactSaveKey = saveKey;
      return true;
    } catch (saveError) {
      setFlowError(
        saveError instanceof Error
          ? saveError.message
          : "We could not save your contact details. Please try again.",
      );
      return false;
    } finally {
      button.disabled = false;
      button.innerHTML = originalLabel;
    }
  }

  flow.querySelectorAll("[data-step-next]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!validateCurrentStep()) return;

      if (button.hasAttribute("data-save-contact-step")) {
        const didSave = await saveContactStep(button);
        if (!didSave) return;
      }

      showStep(activeIndex + 1);
    });
  });

  flow.querySelectorAll("[data-step-prev]").forEach((button) => {
    button.addEventListener("click", () => {
      showStep(activeIndex - 1);
    });
  });

  showStep(0, false);
});

document.querySelectorAll("[data-bill-upload]").forEach((upload) => {
  const input = upload.querySelector("[data-bill-input]");
  const status = upload.querySelector("[data-bill-status]");
  const maxSizeMb = 10;

  if (!input || !status) return;

  input.addEventListener("change", () => {
    const file = input.files && input.files[0];

    if (!file) {
      status.textContent = "No bill file selected.";
      status.classList.remove("is-ready", "is-error");
      upload.classList.remove("is-ready", "is-error");
      return;
    }

    const type = file.type.toLowerCase();
    const isAccepted =
      type === "application/pdf" ||
      type.startsWith("image/") ||
      /\.(pdf|png|jpe?g|webp|heic)$/i.test(file.name);

    if (!isAccepted) {
      input.value = "";
      status.textContent = "Please choose a PDF or image of the utility bill.";
      status.classList.add("is-error");
      status.classList.remove("is-ready");
      upload.classList.add("is-error");
      upload.classList.remove("is-ready");
      return;
    }

    const sizeMb = file.size / (1024 * 1024);

    if (sizeMb > maxSizeMb) {
      input.value = "";
      status.textContent = `Please choose a bill file under ${maxSizeMb} MB.`;
      status.classList.add("is-error");
      status.classList.remove("is-ready");
      upload.classList.add("is-error");
      upload.classList.remove("is-ready");
      return;
    }

    status.textContent = `Selected: ${file.name} (${sizeMb.toFixed(1)} MB).`;
    status.classList.add("is-ready");
    status.classList.remove("is-error");
    upload.classList.add("is-ready");
    upload.classList.remove("is-error");
  });
});

document.querySelectorAll("[data-bill-option]").forEach((option) => {
  const flow = option.closest("[data-enrollment-flow]");
  const panels = Array.from(flow?.querySelectorAll("[data-bill-panel]") || []);

  function updatePanels() {
    const selected = flow?.querySelector("[data-bill-option]:checked");
    const selectedValue = selected?.getAttribute("data-bill-option");

    panels.forEach((panel) => {
      const isActive = panel.getAttribute("data-bill-panel") === selectedValue;

      panel.hidden = !isActive;
      panel.querySelectorAll("input, textarea, select").forEach((control) => {
        control.disabled = !isActive;
      });
    });
  }

  option.addEventListener("change", updatePanels);
  updatePanels();
});

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

      if (form.dataset.successRedirect) {
        window.location.assign(form.dataset.successRedirect);
        return;
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
      upload.classList.remove("is-ready", "is-error");
      return;
    }

    const isPdf =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      input.value = "";
      status.textContent = "Please choose a PDF supplier contract.";
      status.classList.add("is-error");
      status.classList.remove("is-ready");
      upload.classList.add("is-error");
      upload.classList.remove("is-ready");
      return;
    }

    const sizeMb = file.size / (1024 * 1024);
    status.textContent = `Selected: ${file.name} (${sizeMb.toFixed(1)} MB). Analysis agent coming soon.`;
    status.classList.add("is-ready");
    status.classList.remove("is-error");
    upload.classList.add("is-ready");
    upload.classList.remove("is-error");
  });
});
