(function () {
  var storageKey = "eznrg-appearance";
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function preference() {
    try {
      var stored = window.localStorage.getItem(storageKey);
      return stored === "light" || stored === "dark" ? stored : "system";
    } catch (_) {
      return "system";
    }
  }

  function apply(value) {
    var resolved = value === "system" ? (media.matches ? "dark" : "light") : value;
    document.documentElement.dataset.theme = resolved;
    document.documentElement.dataset.appearance = value;

    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.content = resolved === "dark" ? "#111820" : "#f7f9fc";
    }

    document.querySelectorAll("[data-appearance]").forEach(function (control) {
      control.value = value;
    });
  }

  function save(value) {
    try {
      window.localStorage.setItem(storageKey, value);
    } catch (_) {}
    apply(value);
  }

  apply(preference());

  document.addEventListener("DOMContentLoaded", function () {
    apply(preference());
    document.querySelectorAll("[data-appearance]").forEach(function (control) {
      control.addEventListener("change", function () {
        save(control.value);
      });
    });
  });

  media.addEventListener("change", function () {
    if (preference() === "system") apply("system");
  });

  window.addEventListener("storage", function (event) {
    if (event.key === storageKey) apply(preference());
  });
})();
