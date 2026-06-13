/**
 * ui.js — UI Rendering Module
 * All DOM manipulation, rendering, and dynamic updates live here.
 * Keeps rendering logic cleanly separated from data-fetching logic.
 */

'use strict';

const WeatherUI = (() => {

  // ─── DOM References ──────────────────────────────────────────────────────────

  const el = {
    dashboard:       document.getElementById('dashboard'),
    emptyState:      document.getElementById('empty-state'),
    errorBanner:     document.getElementById('error-banner'),
    errorMessage:    document.getElementById('error-message'),
    errorDismiss:    document.getElementById('error-dismiss'),
    searchForm:      document.getElementById('search-form'),
    cityInput:       document.getElementById('city-input'),
    searchBtn:       document.getElementById('search-btn'),
    datetimeBadge:   document.getElementById('current-datetime'),

    // Hero
    cityName:        document.getElementById('city-name'),
    countryBadge:    document.getElementById('country-badge'),
    weatherCondition:document.getElementById('weather-condition'),
    feelsLike:       document.getElementById('feels-like'),
    tempMax:         document.getElementById('temp-max'),
    tempMin:         document.getElementById('temp-min'),
    temperature:     document.getElementById('temperature'),
    weatherEmoji:    document.getElementById('weather-emoji'),
    unitToggle:      document.getElementById('unit-toggle'),
    unitC:           document.getElementById('unit-c'),
    unitF:           document.getElementById('unit-f'),

    // Stats
    humidity:        document.getElementById('humidity'),
    humidityBar:     document.getElementById('humidity-bar'),
    windSpeed:       document.getElementById('wind-speed'),
    windDirection:   document.getElementById('wind-direction'),
    pressure:        document.getElementById('pressure'),
    visibility:      document.getElementById('visibility'),

    // Sun
    sunrise:         document.getElementById('sunrise'),
    sunset:          document.getElementById('sunset'),
    arcSun:          document.getElementById('arc-sun'),
    cloudiness:      document.getElementById('cloudiness'),
    cloudRingCircle: document.getElementById('cloud-ring-circle'),

    // Footer
    dataUpdated:     document.getElementById('data-updated'),
    coords:          document.getElementById('coords'),
  };

  // ─── State ───────────────────────────────────────────────────────────────────

  let currentUnit = 'C';  // 'C' or 'F'
  let currentData = null; // Last successfully fetched weather data

  // ─── Clock ───────────────────────────────────────────────────────────────────

  /**
   * Starts a live clock in the header badge.
   */
  function startClock() {
    function tick() {
      const now = new Date();
      el.datetimeBadge.textContent = now.toUTCString().replace(' GMT', ' UTC');
    }
    tick();
    setInterval(tick, 1000);
  }

  // ─── Loading State ───────────────────────────────────────────────────────────

  function setLoading(isLoading) {
    el.searchBtn.classList.toggle('loading', isLoading);
    el.searchBtn.disabled  = isLoading;
    el.cityInput.disabled  = isLoading;
  }

  // ─── Error Banner ────────────────────────────────────────────────────────────

  function showError(message) {
    el.errorMessage.textContent = message;
    el.errorBanner.hidden = false;
    // Auto-dismiss after 8 seconds
    setTimeout(() => hideError(), 8000);
  }

  function hideError() {
    el.errorBanner.hidden = true;
  }

  // ─── Dashboard Visibility ────────────────────────────────────────────────────

  function showDashboard() {
    el.emptyState.hidden  = true;
    el.dashboard.hidden   = false;
  }

  // ─── Main Render ─────────────────────────────────────────────────────────────

  /**
   * renderWeather
   * Takes a clean weather data object and updates every UI element.
   * Handles dynamic rendering of nested JSON data into the DOM.
   *
   * @param {Object} data - Parsed weather data from WeatherAPI.extractWeatherData()
   */
  function renderWeather(data) {
    currentData = data;
    currentUnit = 'C'; // Reset to Celsius on new search
    updateUnitToggleUI();

    showDashboard();
    hideError();

    // ── Location ──
    el.cityName.textContent        = data.city;
    el.countryBadge.textContent    = data.country;
    el.weatherCondition.textContent = data.condition;
    el.feelsLike.textContent       = `${data.feelsLikeC}°C`;
    el.tempMax.textContent         = `${data.tempMaxC}°C`;
    el.tempMin.textContent         = `${data.tempMinC}°C`;

    // ── Temperature ──
    el.temperature.textContent     = `${data.tempC}°`;
    el.weatherEmoji.textContent    = WeatherAPI.conditionToEmoji(data.conditionId);

    // ── Stats ──
    el.humidity.textContent        = `${data.humidity}%`;
    el.windSpeed.textContent       = `${data.windSpeed} m/s`;
    el.windDirection.textContent   = WeatherAPI.windDegreesToDirection(data.windDeg);
    el.pressure.textContent        = `${data.pressure} hPa`;
    el.visibility.textContent      = data.visibility !== '—'
                                       ? `${data.visibility} km`
                                       : '—';

    // ── Humidity Progress Bar ──
    // Deferred slightly so CSS transition triggers after paint
    requestAnimationFrame(() => {
      el.humidityBar.style.width = `${data.humidity}%`;
    });

    // ── Cloud Cover Ring ──
    const circumference = 2 * Math.PI * 30; // r=30, see SVG
    const offset = circumference * (1 - data.cloudiness / 100);
    el.cloudiness.textContent = `${data.cloudiness}%`;
    requestAnimationFrame(() => {
      el.cloudRingCircle.style.strokeDashoffset = offset;
    });

    // ── Sun Times & Arc ──
    el.sunrise.textContent = data.sunrise;
    el.sunset.textContent  = data.sunset;
    animateSunArc(data.sunrise, data.sunset, data.updatedAt);

    // ── Footer ──
    el.dataUpdated.textContent = data.updatedAt;
    el.coords.textContent      = `${data.lat}°, ${data.lon}°`;
  }

  // ─── Temperature Unit Toggle ─────────────────────────────────────────────────

  /**
   * Toggles between Celsius and Fahrenheit display.
   * Converts all displayed temperature values without re-fetching.
   */
  function toggleUnit() {
    if (!currentData) return;

    currentUnit = currentUnit === 'C' ? 'F' : 'C';
    updateUnitToggleUI();

    const isFahr = currentUnit === 'F';
    const cvt    = WeatherAPI.celsiusToFahrenheit;

    el.temperature.textContent = isFahr
      ? `${cvt(currentData.tempC)}°`
      : `${currentData.tempC}°`;

    el.feelsLike.textContent = isFahr
      ? `${cvt(currentData.feelsLikeC)}°F`
      : `${currentData.feelsLikeC}°C`;

    el.tempMax.textContent = isFahr
      ? `${cvt(currentData.tempMaxC)}°F`
      : `${currentData.tempMaxC}°C`;

    el.tempMin.textContent = isFahr
      ? `${cvt(currentData.tempMinC)}°F`
      : `${currentData.tempMinC}°C`;
  }

  function updateUnitToggleUI() {
    el.unitC.classList.toggle('active', currentUnit === 'C');
    el.unitF.classList.toggle('active', currentUnit === 'F');
  }

  // ─── Sun Arc Animation ───────────────────────────────────────────────────────

  /**
   * Positions the sun dot along the arc SVG path based on current time
   * relative to sunrise/sunset. Uses quadratic bezier parametrics.
   *
   * @param {string} sunriseStr - "HH:MM"
   * @param {string} sunsetStr  - "HH:MM"
   * @param {string} nowStr     - "HH:MM"
   */
  function animateSunArc(sunriseStr, sunsetStr, nowStr) {
    const toMins = (t) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };

    const rise  = toMins(sunriseStr);
    const set   = toMins(sunsetStr);
    const now   = toMins(nowStr);

    let t = Math.max(0, Math.min(1, (now - rise) / (set - rise)));
    if (isNaN(t)) t = 0;

    // Quadratic bezier: P = (1-t)²·P0 + 2(1-t)t·P1 + t²·P2
    // P0=(10,70), P1=(100,0), P2=(190,70)
    const bx = (1 - t) ** 2 * 10  + 2 * (1 - t) * t * 100 + t ** 2 * 190;
    const by = (1 - t) ** 2 * 70  + 2 * (1 - t) * t * 0   + t ** 2 * 70;

    el.arcSun.setAttribute('cx', bx.toFixed(1));
    el.arcSun.setAttribute('cy', by.toFixed(1));
  }

  // ─── Public API ──────────────────────────────────────────────────────────────

  return {
    el,
    startClock,
    setLoading,
    showError,
    hideError,
    renderWeather,
    toggleUnit,
  };

})();
