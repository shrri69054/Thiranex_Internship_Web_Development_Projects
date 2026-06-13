/**
 * ui.js — DOM rendering & element factories
 * All direct DOM manipulation lives here; no state logic.
 */

const UI = (() => {

  // ── Element refs ─────────────────────────────
  const taskList        = document.getElementById('taskList');
  const emptyState      = document.getElementById('emptyState');
  const statTotal       = document.getElementById('statTotal');
  const statActive      = document.getElementById('statActive');
  const statDone        = document.getElementById('statDone');
  const markAllLabel    = document.getElementById('markAllLabel');
  const bulkSection     = document.getElementById('bulkSection');
  const inputError      = document.getElementById('inputError');
  const editError       = document.getElementById('editError');
  const editModal       = document.getElementById('editModal');
  const editInput       = document.getElementById('editInput');
  const filterTabs      = document.querySelectorAll('.filter-tab');

  // ── Task item factory ─────────────────────────

  /**
   * Create a <li> task element.
   * @param {Task} task
   * @returns {HTMLLIElement}
   */
  function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item${task.completed ? ' completed' : ''}`;
    li.dataset.id = task.id;
    li.setAttribute('role', 'listitem');

    // Checkbox
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'task-check';
    check.checked = task.completed;
    check.setAttribute('aria-label', `Mark "${task.text}" as ${task.completed ? 'active' : 'completed'}`);
    check.dataset.action = 'toggle';

    // Text
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;

    // Actions
    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'task-btn edit';
    editBtn.title = 'Edit task';
    editBtn.setAttribute('aria-label', `Edit: ${task.text}`);
    editBtn.dataset.action = 'edit';
    editBtn.textContent = '✎';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task-btn delete';
    deleteBtn.title = 'Delete task';
    deleteBtn.setAttribute('aria-label', `Delete: ${task.text}`);
    deleteBtn.dataset.action = 'delete';
    deleteBtn.textContent = '✕';

    actions.append(editBtn, deleteBtn);
    li.append(check, span, actions);
    return li;
  }

  // ── Render ────────────────────────────────────

  /**
   * Full re-render of the task list.
   * @param {Task[]} tasks  Filtered task array to display
   * @param {{ total: number, active: number, completed: number }} stats
   * @param {boolean} allCompleted
   */
  function render(tasks, stats, allCompleted) {
    // Stats
    statTotal.textContent  = stats.total;
    statActive.textContent = stats.active;
    statDone.textContent   = stats.completed;

    // Bulk button label
    markAllLabel.textContent = allCompleted ? 'Unmark all' : 'Mark all complete';

    // Show/hide bulk section
    bulkSection.style.display = stats.total > 0 ? 'flex' : 'none';

    // List
    taskList.innerHTML = '';

    if (tasks.length === 0) {
      emptyState.hidden = false;
      taskList.hidden   = true;
    } else {
      emptyState.hidden = true;
      taskList.hidden   = false;
      const fragment = document.createDocumentFragment();
      tasks.forEach(t => fragment.appendChild(createTaskElement(t)));
      taskList.appendChild(fragment);
    }
  }

  /**
   * Update a single task item in place (avoids full re-render).
   * @param {Task} task
   */
  function updateTaskElement(task) {
    const li = taskList.querySelector(`[data-id="${task.id}"]`);
    if (!li) return;

    li.classList.toggle('completed', task.completed);

    const check = li.querySelector('.task-check');
    check.checked = task.completed;
    check.setAttribute('aria-label', `Mark "${task.text}" as ${task.completed ? 'active' : 'completed'}`);

    const span = li.querySelector('.task-text');
    span.textContent = task.text;
  }

  /**
   * Animate-out and remove a task item.
   * @param {string} id
   */
  function removeTaskElement(id) {
    const li = taskList.querySelector(`[data-id="${id}"]`);
    if (!li) return;
    li.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    li.style.opacity = '0';
    li.style.transform = 'translateX(16px)';
    setTimeout(() => li.remove(), 200);
  }

  // ── Filters ───────────────────────────────────

  /**
   * Highlight the active filter tab.
   * @param {'all'|'active'|'completed'} active
   */
  function setActiveFilter(active) {
    filterTabs.forEach(btn => {
      const isActive = btn.dataset.filter === active;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });
  }

  // ── Error messages ────────────────────────────

  /** @param {string} msg */
  function showInputError(msg) {
    inputError.textContent = msg;
  }

  function clearInputError() {
    inputError.textContent = '';
  }

  /** @param {string} msg */
  function showEditError(msg) {
    editError.textContent = msg;
  }

  function clearEditError() {
    editError.textContent = '';
  }

  // ── Modal ─────────────────────────────────────

  /**
   * Open the edit modal with a pre-filled value.
   * @param {string} currentText
   */
  function openModal(currentText) {
    clearEditError();
    editInput.value = currentText;
    editModal.hidden = false;
    requestAnimationFrame(() => editInput.focus());
  }

  function closeModal() {
    editModal.hidden = true;
    clearEditError();
  }

  /** @returns {string} */
  function getEditValue() { return editInput.value; }

  return {
    render,
    updateTaskElement,
    removeTaskElement,
    setActiveFilter,
    showInputError,
    clearInputError,
    showEditError,
    clearEditError,
    openModal,
    closeModal,
    getEditValue,
  };
})();
