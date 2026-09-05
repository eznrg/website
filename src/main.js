const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

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

if (menu && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      menu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus();
    }
  });

  menu.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest("a")) {
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

      if (form.dataset.hideOnSuccess !== undefined) {
        form.classList.add("is-submitted");
      }

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
