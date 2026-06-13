/**
 * state.js — Application state & business logic
 *
 * @typedef {{ id: string, text: string, completed: boolean, createdAt: number }} Task
 */

const State = (() => {
  /** @type {Task[]} */
  let tasks = [];

  /** @type {'all' | 'active' | 'completed'} */
  let filter = 'all';

  /** Generate a unique ID */
  function uid() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  /** Persist after any mutation */
  function persist() {
    Storage.save(tasks);
  }

  // ── Initialise ────────────────────────────────

  function init() {
    tasks = Storage.load();
  }

  // ── CRUD ──────────────────────────────────────

  /**
   * Add a new task.
   * @param {string} text
   * @returns {Task}
   */
  function addTask(text) {
    const task = {
      id: uid(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    tasks.unshift(task); // newest first
    persist();
    return task;
  }

  /**
   * Toggle completed status of a task.
   * @param {string} id
   * @returns {Task|null}
   */
  function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return null;
    task.completed = !task.completed;
    persist();
    return task;
  }

  /**
   * Update task text.
   * @param {string} id
   * @param {string} newText
   * @returns {Task|null}
   */
  function updateTask(id, newText) {
    const task = tasks.find(t => t.id === id);
    if (!task) return null;
    task.text = newText.trim();
    persist();
    return task;
  }

  /**
   * Delete a task by id.
   * @param {string} id
   * @returns {boolean}
   */
  function deleteTask(id) {
    const before = tasks.length;
    tasks = tasks.filter(t => t.id !== id);
    persist();
    return tasks.length < before;
  }

  /**
   * Remove all completed tasks.
   * @returns {number} count removed
   */
  function clearCompleted() {
    const before = tasks.length;
    tasks = tasks.filter(t => !t.completed);
    persist();
    return before - tasks.length;
  }

  /**
   * Toggle all tasks to completed / active.
   */
  function toggleAll() {
    const allDone = tasks.every(t => t.completed);
    tasks.forEach(t => { t.completed = !allDone; });
    persist();
  }

  // ── Selectors ────────────────────────────────

  /** @returns {Task[]} */
  function getAll() { return [...tasks]; }

  /** @returns {'all'|'active'|'completed'} */
  function getFilter() { return filter; }

  /** @param {'all'|'active'|'completed'} f */
  function setFilter(f) { filter = f; }

  /** @returns {Task[]} Tasks matching current filter */
  function getFiltered() {
    switch (filter) {
      case 'active':    return tasks.filter(t => !t.completed);
      case 'completed': return tasks.filter(t =>  t.completed);
      default:          return [...tasks];
    }
  }

  function getStats() {
    const total     = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active    = total - completed;
    return { total, active, completed };
  }

  /** @returns {boolean} */
  function allCompleted() {
    return tasks.length > 0 && tasks.every(t => t.completed);
  }

  return {
    init,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    clearCompleted,
    toggleAll,
    getAll,
    getFilter,
    setFilter,
    getFiltered,
    getStats,
    allCompleted,
  };
})();
