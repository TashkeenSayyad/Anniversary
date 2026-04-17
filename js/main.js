(function () {
  'use strict';

  const body = document.body;
  const reduceMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const template = document.getElementById('rosette-template');
  const ornaments = document.querySelectorAll('[data-ornament]');

  if (template) {
    ornaments.forEach(function (slot) {
      if (!slot.querySelector('.rosette')) {
        slot.appendChild(template.content.cloneNode(true));
      }
    });
  }

  function reveal() {
    body.classList.add('is-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal, { once: true });
  } else {
    requestAnimationFrame(reveal);
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    ornaments.forEach(function (el) { el.classList.add('is-drawn'); });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-drawn');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35, rootMargin: '0px 0px -5% 0px' }
  );

  ornaments.forEach(function (el) { observer.observe(el); });
})();
