/**
 * projects-filter.js — Accessible project filtering
 */

'use strict';

(function initFilter() {
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update button states
      filterBtns.forEach(b => {
        b.classList.remove('filter-btn--active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('filter-btn--active');
      btn.setAttribute('aria-pressed', 'true');

      // Show/hide items
      let visibleCount = 0;
      projectItems.forEach(item => {
        const matches = filter === 'all' || item.dataset.category === filter;
        item.hidden = !matches;
        if (matches) visibleCount++;
      });

      // Announce result count to screen readers
      announceFilterResult(visibleCount, filter);
    });
  });

  function announceFilterResult(count, filter) {
    let announcer = document.getElementById('filter-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'filter-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.className = 'visually-hidden';
      document.body.appendChild(announcer);
    }
    const label = filter === 'all' ? 'all categories' : filter.replace('-', ' ');
    announcer.textContent = `Showing ${count} project${count !== 1 ? 's' : ''} in ${label}.`;
  }
})();
