(function () {
  'use strict';

  var body = document.body;
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Clone rosette template into [data-ornament] placeholders (bismillah only)
  var template = document.getElementById('rosette-template');
  var ornamentSlots = document.querySelectorAll('[data-ornament]');

  if (template) {
    ornamentSlots.forEach(function (slot) {
      if (!slot.querySelector('.rosette')) {
        slot.appendChild(template.content.cloneNode(true));
      }
    });
  }

  // Ambient gold dust motes — 14 on mobile, 26 on desktop
  var dustContainer = document.getElementById('dust');
  if (dustContainer && !reduceMotion) {
    var isMobile = window.matchMedia('(max-width: 768px)').matches;
    var count = isMobile ? 14 : 26;
    var sizes = ['sm', 'md', 'lg'];
    for (var i = 0; i < count; i++) {
      var mote = document.createElement('span');
      mote.className = 'dust-mote dust-mote--' + sizes[Math.floor(Math.random() * sizes.length)];
      var dur   = (22 + Math.random() * 28).toFixed(1);
      var delay = -(Math.random() * 50).toFixed(1);
      var dx    = Math.round((Math.random() - 0.5) * 140);
      var left  = (Math.random() * 100).toFixed(1);
      mote.style.cssText =
        'left:' + left + '%;' +
        '--dust-dur:' + dur + 's;' +
        '--dust-delay:' + delay + 's;' +
        '--dx:' + dx + 'px;';
      dustContainer.appendChild(mote);
    }
  }

  function reveal() {
    body.classList.add('is-ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal, { once: true });
  } else {
    requestAnimationFrame(reveal);
  }

  // All elements needing scroll-triggered reveal: rosette slots + custom ornaments
  var revealEls = document.querySelectorAll('[data-ornament], [data-reveal]');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-drawn'); });
    return;
  }

  var observer = new IntersectionObserver(
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

  revealEls.forEach(function (el) { observer.observe(el); });
})();
