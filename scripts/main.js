/* ============================================================
   MAIN · reveals, counter, ambient dust
   ============================================================ */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* --------------------------------------------------------
     1. Scroll-triggered reveals
     -------------------------------------------------------- */
  function initReveals() {
    const els = document.querySelectorAll('.reveal');

    // If reduced motion, reveal immediately and bail.
    if (prefersReducedMotion) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }

    // Fallback: no IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    els.forEach(el => io.observe(el));
  }

  /* --------------------------------------------------------
     2. Counter animation — "365" and any [data-count]
     -------------------------------------------------------- */
  function animateCount(el, target, duration = 2200) {
    if (prefersReducedMotion) {
      el.textContent = target.toLocaleString();
      return;
    }

    const start = performance.now();
    const from = 0;

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Eased: easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(from + (target - from) * eased);
      el.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function initCounters() {
    // Hero big counter
    const hero = document.getElementById('counter');
    if (hero) {
      const target = parseInt(hero.dataset.target, 10) || 365;
      // small delay so the reveal animation can breathe first
      setTimeout(() => animateCount(hero, target, 2400), 700);
    }

    // Stat-card counters (animated when scrolled into view)
    const statCounters = document.querySelectorAll('[data-count]');
    if (!statCounters.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      statCounters.forEach(el => {
        const t = parseInt(el.dataset.count, 10);
        if (!isNaN(t)) el.textContent = t.toLocaleString();
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const t = parseInt(entry.target.dataset.count, 10);
            if (!isNaN(t)) animateCount(entry.target, t, 1800);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    statCounters.forEach(el => io.observe(el));
  }

  /* --------------------------------------------------------
     3. Ambient gold dust particles
     -------------------------------------------------------- */
  function initDust() {
    const container = document.getElementById('dust');
    if (!container) return;
    if (prefersReducedMotion) return;

    const count = window.innerWidth < 640 ? 14 : 26;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const mote = document.createElement('span');
      mote.classList.add('dust-mote');

      // Size variant
      const roll = Math.random();
      if (roll < 0.3) mote.classList.add('dust-mote--sm');
      else if (roll > 0.85) mote.classList.add('dust-mote--lg');

      // Position & motion
      const left = Math.random() * 100;
      const bottom = -Math.random() * 20;
      const duration = 22 + Math.random() * 28; // 22s–50s, slow & dreamy
      const delay = -Math.random() * duration;   // desync start times
      const drift = (Math.random() - 0.5) * 140; // px horizontal drift

      mote.style.left = left + '%';
      mote.style.bottom = bottom + 'vh';
      mote.style.animationDuration = duration + 's';
      mote.style.animationDelay = delay + 's';
      mote.style.setProperty('--dx', drift + 'px');

      frag.appendChild(mote);
    }

    container.appendChild(frag);
  }

  /* --------------------------------------------------------
     Init
     -------------------------------------------------------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initReveals();
      initCounters();
      initDust();
    });
  } else {
    initReveals();
    initCounters();
    initDust();
  }
})();
