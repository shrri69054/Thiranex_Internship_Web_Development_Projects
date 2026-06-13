/**
 * app.js — Main controller
 * Wires State ↔ UI together via event listeners (delegated where possible).
 */

(() => {
  'use strict';

  // ── Element refs ─────────────────────────────
  const taskInput        = document.getElementById('taskInput');
  const addBtn           = document.getElementById('addBtn');
  const taskList         = document.getElementById('taskList');
  const filterTabs       = document.querySelectorAll('.filter-tab');
  const clearCompletedBtn= document.getElementById('clearCompletedBtn');
  const markAllBtn       = document.getElementById('markAllBtn');
  const editModal        = document.getElementById('editModal');
  const editSaveBtn      = document.getElementById('editSaveBtn');
  const editCancelBtn    = document.getElementById('editCancelBtn');
  const editInput        = document.getElementById('editInput');

  /** Currently editing task id */
  let editingId = null;

  // ── Full re-render helper ─────────────────────

  function refresh() {
    UI.render(
      State.getFiltered(),
      State.getStats(),
      State.allCompleted()
    );
    UI.setActiveFilter(State.getFilter());
  }

  // ── Validation ───────────────────────────────

  function validateText(text, errorFn) {
    const trimmed = text.trim();
    if (!trimmed) {
      errorFn('Task cannot be empty.');
      return false;
    }
    if (trimmed.length < 2) {
      errorFn('Task is too short (min 2 characters).');
      return false;
    }
    return true;
  }

  // ── Add task ─────────────────────────────────

  function handleAdd() {
    const val = taskInput.value;
    if (!validateText(val, UI.showInputError)) return;
    UI.clearInputError();
    State.addTask(val);
    taskInput.value = '';
    taskInput.focus();
    refresh();
  }

  addBtn.addEventListener('click', handleAdd);

  taskInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleAdd();
    else UI.clearInputError();
  });

  // ── Delegated list events ─────────────────────
  // Handles toggle, edit, delete from a single listener on the parent.

  taskList.addEventListener('click', e => {
    const action = e.target.dataset.action;
    const li = e.target.closest('.task-item');
    if (!li) return;
    const id = li.dataset.id;

    if (action === 'toggle') {
      const task = State.toggleTask(id);
      if (!task) return;

      // Smart refresh: if filtering, we need full re-render;
      // otherwise update in place for smoothness.
      const f = State.getFilter();
      if (f !== 'all') {
        // Remove from view after brief delay (let animation run)
        li.style.transition = 'opacity 0.2s ease';
        li.style.opacity = '0';
        setTimeout(refresh, 200);
      } else {
        UI.updateTaskElement(task);
        // Update stats without re-render
        const stats = State.getStats();
        document.getElementById('statTotal').textContent  = stats.total;
        document.getElementById('statActive').textContent = stats.active;
        document.getElementById('statDone').textContent   = stats.completed;
        document.getElementById('markAllLabel').textContent =
          State.allCompleted() ? 'Unmark all' : 'Mark all complete';
      }
    }

    if (action === 'delete') {
      State.deleteTask(id);
      UI.removeTaskElement(id);
      // Update stats after animation
      setTimeout(refresh, 210);
    }

    if (action === 'edit') {
      const task = State.getAll().find(t => t.id === id);
      if (!task) return;
      editingId = id;
      UI.openModal(task.text);
    }
  });

  // ── Keyboard on list (accessibility) ─────────

  taskList.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const action = e.target.dataset.action;
    if (action) {
      e.preventDefault();
      e.target.click();
    }
  });

  // ── Edit modal ───────────────────────────────

  function handleEditSave() {
    const val = UI.getEditValue();
    if (!validateText(val, UI.showEditError)) return;
    UI.clearEditError();
    State.updateTask(editingId, val);
    UI.closeModal();
    editingId = null;
    refresh();
  }

  editSaveBtn.addEventListener('click', handleEditSave);

  editInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') { UI.closeModal(); editingId = null; }
  });

  editCancelBtn.addEventListener('click', () => {
    UI.closeModal();
    editingId = null;
  });

  // Close modal on overlay click
  editModal.addEventListener('click', e => {
    if (e.target === editModal) {
      UI.closeModal();
      editingId = null;
    }
  });

  // Global Escape key closes modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !editModal.hidden) {
      UI.closeModal();
      editingId = null;
    }
  });

  // ── Filters ───────────────────────────────────

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      State.setFilter(tab.dataset.filter);
      refresh();
    });
  });

  // ── Clear completed ───────────────────────────

  clearCompletedBtn.addEventListener('click', () => {
    const removed = State.clearCompleted();
    if (removed > 0) refresh();
  });

  // ── Mark all / Unmark all ─────────────────────

  markAllBtn.addEventListener('click', () => {
    State.toggleAll();
    refresh();
  });

  // ── Boot ─────────────────────────────────────

  State.init();
  refresh();

})();
