// Reading progress + active-section highlighting in the sticky rail.
// Shared by the two reading documents (hospitality white paper, commercial
// brief); loaded as /static/doc.js from the bottom of each <body>.
// Self-contained, no dependencies. Purely additive: the rail and TOC work as
// plain links without it.
(function () {
  var bar = document.getElementById("progress");
  var railLinks = Array.prototype.slice.call(
    document.querySelectorAll(".rail a")
  );
  var byId = {};
  railLinks.forEach(function (a) {
    byId[a.getAttribute("href").slice(1)] = a;
  });
  var sections = Object.keys(byId)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var ticking = false;
  function update() {
    ticking = false;
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    if (bar) {
      bar.style.transform =
        "scaleX(" + (max > 0 ? Math.min(1, doc.scrollTop / max) : 0) + ")";
    }
    // Active = last section whose top is above the 40% viewport line.
    var line = doc.clientHeight * 0.4;
    var active = null;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= line) active = sections[i];
    }
    railLinks.forEach(function (a) { a.classList.remove("is-active"); });
    if (active && byId[active.id]) byId[active.id].classList.add("is-active");
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();
