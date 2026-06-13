/**
 * app.js — Application Entry Point
 * Wires up event listeners and orchestrates the API → UI data flow.
 * This is the controller layer: it calls WeatherAPI, then WeatherUI.
 */

'use strict';

// ─── Main Controller ─────────────────────────────────────────────────────────

const WeatherApp = (() => {

  /**
   * handleSearch
   * The core async/await flow:
   *  1. Validate input
   *  2. Show loading state
   *  3. Fetch data from REST API
   *  4. Parse complex nested JSON
   *  5. Render to DOM
   *  6. Handle all error cases
   *
   * @param {string} city - City name to search
   */
  async function handleSearch(city) {
    const trimmed = city?.trim();
    if (!trimmed) {
      WeatherUI.showError('Please enter a city name before searching.');
      return;
    }

    WeatherUI.setLoading(true);
    WeatherUI.hideError();

    try {
      // ── Step 1: Fetch raw JSON via async/await ──────────────────────────────
      const rawData = await WeatherAPI.fetchWeatherByCity(trimmed);

      // ── Step 2: Parse & transform complex nested JSON ───────────────────────
      const weatherData = WeatherAPI.extractWeatherData(rawData);

      // ── Step 3: Render all metrics to the dashboard ─────────────────────────
      WeatherUI.renderWeather(weatherData);

      // Clear input after successful search
      WeatherUI.el.cityInput.value = '';

    } catch (err) {
      // ── Comprehensive error handling ────────────────────────────────────────
      console.error(`[WeatherApp] ${err.name}:`, err.message);
      WeatherUI.showError(err.message);

    } finally {
      // Always restore UI state, success or failure
      WeatherUI.setLoading(false);
    }
  }

  // ─── Event Listeners ─────────────────────────────────────────────────────────

  function initEventListeners() {
    // Search form submit
    WeatherUI.el.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSearch(WeatherUI.el.cityInput.value);
    });

    // Quick city pills
    document.querySelectorAll('.quick-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        const city = pill.dataset.city;
        WeatherUI.el.cityInput.value = city;
        handleSearch(city);
      });
    });

    // Temperature unit toggle
    WeatherUI.el.unitToggle.addEventListener('click', () => {
      WeatherUI.toggleUnit();
    });

    // Dismiss error banner
    WeatherUI.el.errorDismiss.addEventListener('click', () => {
      WeatherUI.hideError();
    });

    // Keyboard: Enter in input triggers search
    WeatherUI.el.cityInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch(WeatherUI.el.cityInput.value);
      }
    });
  }

  // ─── Init ────────────────────────────────────────────────────────────────────

  function init() {
    WeatherUI.startClock();
    initEventListeners();

    // Auto-load a default city on startup for demo purposes
    handleSearch('London');
  }

  // ─── Public ──────────────────────────────────────────────────────────────────

  return { init };

})();

// Bootstrap the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => WeatherApp.init());
