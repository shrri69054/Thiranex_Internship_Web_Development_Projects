/* ═══════════════════════════════════════
   MAIN.JS — Interactions & enhancements
═══════════════════════════════════════ */

'use strict';

/* ── Theme toggle ──────────────────── */
(function initTheme() {
  const root    = document.documentElement;
  const btn     = document.getElementById('themeToggle');
  const STORAGE = 'portfolio-theme';

  const saved = localStorage.getItem(STORAGE);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');

  root.setAttribute('data-theme', initial);

  btn?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE, next);
    btn.setAttribute('aria-label', `Switch to ${current} mode`);
  });

  // Sync with OS preference changes
  window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', e => {
      if (!localStorage.getItem(STORAGE)) {
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
})();

/* ── Mobile nav ────────────────────── */
(function initMobileNav() {
  const burger = document.getElementById('navBurger');
  const menu   = document.getElementById('mobileMenu');
  if (!burger || !menu) return;

  function toggle(open) {
    burger.setAttribute('aria-expanded', String(open));
    if (open) {
      menu.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      menu.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }
  }

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    toggle(!isOpen);
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      toggle(false);
      burger.focus();
    }
  });
})();

/* ── Sticky nav shadow ──────────────── */
(function initNavScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const observer = new IntersectionObserver(
    ([entry]) => header.classList.toggle('scrolled', !entry.isIntersecting),
    { rootMargin: '-1px 0px 0px 0px', threshold: 0 }
  );

  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none';
  document.body.prepend(sentinel);
  observer.observe(sentinel);
})();

/* ── Scroll-reveal ──────────────────── */
(function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.project-card, .skill-pillar, .about-grid, .contact-grid, ' +
    '.section-header, .marquee-band'
  );

  elements.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

/* ── Skill bar animation ────────────── */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-bar__fill');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  fills.forEach(fill => observer.observe(fill));
})();

/* ── Active nav link highlighting ──── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${entry.target.id}`) {
              link.style.color = 'var(--accent-1)';
            } else {
              link.style.color = '';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
})();

/* ── Contact form ───────────────────── */
(function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn.textContent;

    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate async submission
    await new Promise(r => setTimeout(r, 1200));

    btn.textContent = '✓ Message sent!';
    btn.style.background = 'var(--success)';
    form.reset();

    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  });
})();

/* ── Smooth anchor with offset ─────── */
(function initSmoothScroll() {
  const NAV_H = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '68'
  );

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - NAV_H;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();
