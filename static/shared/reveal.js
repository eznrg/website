// Minimal, self-contained reveal-on-scroll (mirrors the main site's feel).
// Shared by the standalone landing pages under `static/`; loaded as
// /static/reveal.js from the bottom of each <body>.
//
// Purely additive: .reveal is fully visible in the stylesheet by default, and
// only the `is-enhanced` class this script adds opts an element into the fade.
// With JS off, every section renders normally.
(function () {
  document.documentElement.classList.add("is-enhanced");
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
