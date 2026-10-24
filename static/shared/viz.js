/*
  Hover / tap / keyboard readout for every `.viz` chart on the standalone
  pages: the hospitality white paper's load profiles and the commercial rate
  charts.

  PURELY ADDITIVE. Every chart renders complete without this file: the lines,
  bars, gridlines, axis ticks, direct labels and the <details> data table are
  all in the markup. This only adds the crosshair, the markers and the readout.

  The hospitality landing page's load chart is a different component (a slider,
  see hospitality/load-chart.js) and does not use this file.

  Each plot carries its own data on `data-viz`:
    lo, hi  numeric axis bounds, matching the gridlines rendered in the markup
    x       x-axis: "month" (default; point 0 is January 2024, one step per
            month) or "hour" (point 0 is 00:00, one step per hour)
    u       unit: "¢" (three decimals), "$" (whole dollars, accounting style)
            or "kW" (one decimal; the markup prints the unit itself)
    a       first series (required)
    b       second series (optional; its absence means a single-series chart)
  Series names in the readout come from each row's <em> in the markup.
*/
(function () {
  var charts = document.querySelectorAll(".viz-plot[data-viz]");
  if (!charts.length) return;

  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function xLabel(i, mode) {
    if (mode === "hour") return (i < 10 ? "0" + i : i) + ":00";
    return MONTHS[i % 12] + " " + (2024 + Math.floor(i / 12));
  }

  /* Accounting style: negatives in parentheses, never a bare minus sign, so the
     sign survives being read aloud and matches the tables on the page. */
  function money(v) {
    var s = "$" + Math.round(Math.abs(v)).toLocaleString("en-US");
    return v < 0 ? "(" + s + ")" : s;
  }

  function f1(v) { return (Math.round(v * 10) / 10).toFixed(1); }

  function fmt(v, unit) {
    if (unit === "$") return money(v);
    if (unit === "kW") return f1(v);
    return v.toFixed(3) + "¢";
  }

  function delta(series, i, unit, names) {
    if (series.length > 1 && unit === "kW") {
      /* Derived from the displayed values, so the readout is self-consistent. */
      var kw = Math.round(Math.round(series[1][i] * 10) - Math.round(series[0][i] * 10)) / 10;
      return kw === 0
        ? names[1] + " and " + names[0].toLowerCase() + " are level"
        : names[1] + " " + (kw > 0 ? "+" : "−") + f1(Math.abs(kw)) +
          " kW vs. " + names[0].toLowerCase();
    }
    if (series.length > 1) {
      var diff = series[0][i] - series[1][i];
      return Math.abs(diff) < 0.0005
        ? "Level"
        : fmt(Math.abs(diff), unit) + (diff > 0 ? " above" : " below");
    }
    var v0 = series[0][i];
    return v0 < 0
      ? "The contract cost more this month"
      : v0 > 0 ? "The contract saved this month" : "Level";
  }

  Array.prototype.forEach.call(charts, function (plot) {
    var d;
    try { d = JSON.parse(plot.getAttribute("data-viz")); } catch (e) { return; }
    if (!d || !d.a || !d.a.length) return;

    var series = d.b ? [d.a, d.b] : [d.a];
    var n = d.a.length;
    var span = d.hi - d.lo;
    var unit = d.u || "";
    var mode = d.x || "month";
    var start = mode === "hour" ? Math.min(12, n - 1) : n - 1;
    var cross = plot.querySelector(".viz-cross");
    var dots = plot.querySelectorAll(".viz-dot");
    var tip = plot.querySelector(".viz-tip");
    if (!cross || !tip || !dots.length) return;
    var head = tip.querySelector(".viz-tip-h");
    var vals = tip.querySelectorAll(".viz-tip-r b");
    var names = Array.prototype.map.call(tip.querySelectorAll(".viz-tip-r em"), function (em) {
      return em.textContent;
    });
    var deltaEl = tip.querySelector(".viz-tip-d");
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

      head.textContent = xLabel(i, mode);
      for (var v = 0; v < vals.length && v < series.length; v++) {
        vals[v].textContent = fmt(series[v][i], unit);
      }
      if (deltaEl) deltaEl.textContent = delta(series, i, unit, names);

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
    plot.addEventListener("focus", function () { if (cur < 0) show(start); });
    plot.addEventListener("blur", hide);
    window.addEventListener("resize", function () {
      if (cur < 0) return;
      var i = cur;
      cur = -1;
      show(i);
    });
    plot.addEventListener("keydown", function (e) {
      var k = e.key, i = cur < 0 ? start : cur;
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
