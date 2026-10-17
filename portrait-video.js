(() => {
  'use strict';
  const video = document.getElementById('portrait-video');
  const hero = document.getElementById('home');
  if (!video || !hero) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let unavailable = false;
  video.muted = true;
  video.playsInline = true;

  function sync() {
    const shouldPlay = visible && !document.hidden && !reduced.matches &&
      !document.body.classList.contains('pause-motion') && !unavailable;
    if (!shouldPlay) {
      video.pause();
      if (reduced.matches) document.body.classList.remove('has-walking-video');
      return;
    }
    if (!video.getAttribute('src')) video.src = video.dataset.src;
    video.play().catch(() => document.body.classList.remove('has-walking-video'));
  }
  video.addEventListener('playing', () => {
    if (!reduced.matches) document.body.classList.add('has-walking-video');
  });
  video.addEventListener('error', () => {
    unavailable = true;
    document.body.classList.remove('has-walking-video');
  });
  document.getElementById('motion-toggle')?.addEventListener('click', sync);
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      sync();
    }, {threshold: 0.05}).observe(hero);
  } else {
    visible = true;
    sync();
  }
})();
