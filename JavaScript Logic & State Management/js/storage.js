/**
 * storage.js — localStorage persistence layer
 * Provides a safe, typed wrapper around window.localStorage.
 */

const Storage = (() => {
  const KEY = 'taskflow_tasks';

  /**
   * Load all tasks from localStorage.
   * @returns {Task[]} Array of task objects (empty array if none/corrupt)
   */
  function load() {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch {
      console.warn('TaskFlow: Failed to load tasks from localStorage.');
      return [];
    }
  }

  /**
   * Persist the full task array to localStorage.
   * @param {Task[]} tasks
   */
  function save(tasks) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('TaskFlow: Failed to save tasks.', e);
    }
  }

  /**
   * Erase all stored data (used for full reset).
   */
  function clear() {
    try {
      window.localStorage.removeItem(KEY);
    } catch {
      // silently fail
    }
  }

  return { load, save, clear };
})();
