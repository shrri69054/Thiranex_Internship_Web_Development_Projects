/**
 * main.js — Shared JavaScript
 * Alex Rivera Portfolio
 */

'use strict';

/* ── Year ────────────────────────────────────────────────── */
document.querySelectorAll('#footer-year').forEach(el => {
  const year = new Date().getFullYear();
  el.textContent = year;
  el.setAttribute('datetime', year);
});

/* ── Mobile Navigation ───────────────────────────────────── */
(function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('#nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      toggle.focus();
    }
  });

  // Close when clicking outside
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ── Scroll-reveal (respects prefers-reduced-motion) ────── */
(function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const revealEls = document.querySelectorAll(
    '.project-card, .expertise-item, .timeline-item, .article-card, .project-item'
  );

  if (!revealEls.length) return;

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();

/* ── Announce page title to screen readers on navigation ─── */
(function announcePageTitle() {
  const main = document.querySelector('#main-content');
  if (main && document.readyState === 'complete') {
    // Set focus to main on load so screen readers announce page context
    main.setAttribute('tabindex', '-1');
  }
})();
