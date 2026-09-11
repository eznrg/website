// The hourly values match Customer 1 / Meter 780 in the white paper.
(() => {
  const plot = document.querySelector('.load-plot[data-viz]');
  if (!plot) return;
  const data = JSON.parse(plot.dataset.viz);
  const readout = document.querySelector('#load-readout');
  const guide = plot.querySelector('.load-guide');
  const summer = plot.querySelector('.load-point-summer');
  const winter = plot.querySelector('.load-point-winter');
  let hour = 12;
  const time = h => `${h % 12 || 12}${h < 12 ? 'am' : 'pm'}`;

  function show(next) {
    hour = Math.max(0, Math.min(23, next));
    const left = `${hour / 23 * 100}%`;
    guide.style.left = left;
    for (const [point, value] of [[summer, data.s[hour]], [winter, data.w[hour]]]) {
      point.style.left = left;
      point.style.top = `${(data.hi - value) / (data.hi - data.lo) * 100}%`;
    }
    const s = data.s[hour].toFixed(1);
    const w = data.w[hour].toFixed(1);
    readout.innerHTML = `<strong>${time(hour)}</strong><span class="load-readout-summer">Summer <b>${s} kW</b></span><span class="load-readout-winter">Winter <b>${w} kW</b></span>`;
    plot.setAttribute('aria-valuenow', String(hour));
    plot.setAttribute('aria-valuetext', `${time(hour)}: Summer ${s} kW; Winter ${w} kW`);
  }

  plot.setAttribute('role', 'slider');
  plot.setAttribute('tabindex', '0');
  plot.setAttribute('aria-label', 'Hour of day');
  plot.setAttribute('aria-describedby', 'load-description load-help');
  plot.setAttribute('aria-valuemin', '0');
  plot.setAttribute('aria-valuemax', '23');
  readout.hidden = false;
  guide.hidden = false;
  document.querySelector('#load-help').hidden = false;
  show(hour);

  function selectPointer(event) {
    const box = plot.getBoundingClientRect();
    if (box.width) show(Math.round((event.clientX - box.left) / box.width * 23));
  }
  plot.addEventListener('pointermove', selectPointer);
  plot.addEventListener('pointerdown', event => {
    selectPointer(event);
    plot.focus({ preventScroll: true });
  });
  plot.addEventListener('keydown', event => {
    const next = { ArrowRight: hour + 1, ArrowUp: hour + 1, ArrowLeft: hour - 1, ArrowDown: hour - 1, Home: 0, End: 23 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    show(next);
  });
})();
