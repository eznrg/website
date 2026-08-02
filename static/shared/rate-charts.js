/*
  Hover / tap / keyboard readout for the rate charts on /commercial and
  /commercial/whitepaper.

  PURELY ADDITIVE. Every chart renders complete without this file: the lines,
  bars, gridlines, axis ticks, direct labels and the <details> data table are
  all in the markup. This only adds the crosshair, the markers and the readout.

  It is shared by the two commercial pages and linked by nothing else — the
  hospitality pages keep their own inline copy of an earlier, load-profile
  specific version. Adding a chart here cannot affect them.

  Each plot carries its own data on `data-viz`:
    lo, hi  numeric axis bounds, matching the gridlines rendered in the markup
    u       unit — "¢" (three decimals) or "$" (whole dollars, accounting style)
    a       first series (required)
    b       second series (optional; its absence means a single-series chart)
  Point 0 is January 2024 and each step is one month, which is how the readout
  labels the x position without shipping 30 date strings per chart.
*/
(function () {
  var charts = document.querySelectorAll(".viz-plot[data-viz]");
  if (!charts.length) return;

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function monthLabel(i) {
    return MONTHS[i % 12] + " " + (2024 + Math.floor(i / 12));
  }

  /* Accounting style: negatives in parentheses, never a bare minus sign, so the
     sign survives being read aloud and matches the tables on the page. */
  function money(v) {
    var s = "$" + Math.round(Math.abs(v)).toLocaleString("en-US");
    return v < 0 ? "(" + s + ")" : s;
  }

  function fmt(v, unit) {
    return unit === "$" ? money(v) : v.toFixed(3) + "¢";
  }

  Array.prototype.forEach.call(charts, function (plot) {
    var d;
    try { d = JSON.parse(plot.getAttribute("data-viz")); } catch (e) { return; }
    if (!d || !d.a || !d.a.length) return;

    var series = d.b ? [d.a, d.b] : [d.a];
    var n = d.a.length;
    var span = d.hi - d.lo;
    var unit = d.u || "";
    var cross = plot.querySelector(".viz-cross");
    var dots = plot.querySelectorAll(".viz-dot");
    var tip = plot.querySelector(".viz-tip");
    if (!cross || !tip || !dots.length) return;
    var head = tip.querySelector(".viz-tip-h");
    var vals = tip.querySelectorAll(".viz-tip-r b");
    var delta = tip.querySelector(".viz-tip-d");
    var cur = -1;

    function pct(v) { return ((d.hi - v) / span) * 100; }

    function show(i) {
      if (i === cur) return;
      cur = i;
      var x = (n > 1 ? i / (n - 1) : 0.5) * 100;
      /* Columns sit at the centre of their slot, not on the point grid, so the
         crosshair has to follow the same geometry the bars were placed with. */
      if (plot.classList.contains("is-bars")) x = ((i + 0.5) / n) * 100;

      cross.style.left = x + "%";
      for (var s = 0; s < series.length && s < dots.length; s++) {
        dots[s].style.left = x + "%";
        dots[s].style.top = pct(series[s][i]) + "%";
        dots[s].hidden = false;
      }

      head.textContent = monthLabel(i);
      for (var v = 0; v < vals.length && v < series.length; v++) {
        vals[v].textContent = fmt(series[v][i], unit);
      }

      if (delta) {
        if (series.length > 1) {
          var diff = series[0][i] - series[1][i];
          delta.textContent = Math.abs(diff) < 0.0005
            ? "Level"
            : fmt(Math.abs(diff), unit) + (diff > 0 ? " above" : " below");
        } else {
          var v0 = series[0][i];
          delta.textContent = v0 < 0
            ? "The contract cost more this month"
            : v0 > 0 ? "The contract saved this month" : "Level";
        }
      }

      cross.hidden = tip.hidden = false;

      /* The readout is placed in pixels, so it is clamped to the plot and
         flipped to whichever half is free of the markers. */
      var w = plot.clientWidth, h = plot.clientHeight;
      var tw = tip.offsetWidth, th = tip.offsetHeight;
      var top = pct(series[0][i]);
      for (var t = 1; t < series.length; t++) top = Math.min(top, pct(series[t][i]));
      tip.style.left = Math.min(Math.max((x / 100) * w - tw / 2, 0), Math.max(w - tw, 0)) + "px";
      tip.style.top = (top < 45 ? h - th : 0) + "px";
    }

    function hide() {
      cur = -1;
      cross.hidden = tip.hidden = true;
      Array.prototype.forEach.call(dots, function (dot) { dot.hidden = true; });
    }

    function at(clientX) {
      var r = plot.getBoundingClientRect();
      if (!r.width) return 0;
      var f = (clientX - r.left) / r.width;
      var i = plot.classList.contains("is-bars")
        ? Math.floor(f * n)
        : Math.round(f * (n - 1));
      return Math.max(0, Math.min(n - 1, i));
    }

    plot.addEventListener("pointermove", function (e) { show(at(e.clientX)); });
    plot.addEventListener("pointerdown", function (e) { show(at(e.clientX)); });
    plot.addEventListener("pointerleave", function (e) {
      if (e.pointerType !== "touch") hide();
    });
    plot.addEventListener("focus", function () { if (cur < 0) show(n - 1); });
    plot.addEventListener("blur", hide);
    window.addEventListener("resize", function () {
      if (cur < 0) return;
      var i = cur;
      cur = -1;
      show(i);
    });
    plot.addEventListener("keydown", function (e) {
      var k = e.key, i = cur < 0 ? n - 1 : cur;
      if (k === "ArrowRight") i = Math.min(n - 1, i + 1);
      else if (k === "ArrowLeft") i = Math.max(0, i - 1);
      else if (k === "Home") i = 0;
      else if (k === "End") i = n - 1;
      else if (k === "Escape") { hide(); return; }
      else return;
      e.preventDefault();
      show(i);
    });
  });
})();
