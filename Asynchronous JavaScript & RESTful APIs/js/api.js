/**
 * api.js — Weather API Module
 * Handles all async data fetching from OpenWeatherMap REST API.
 * Uses modern Fetch API with async/await and comprehensive error handling.
 *
 * API: OpenWeatherMap Current Weather Data
 * Docs: https://openweathermap.org/current
 *
 * ⚠️  SETUP: Replace the API_KEY below with your free key from
 *     https://openweathermap.org/appid
 */

'use strict';

// ─── Configuration ───────────────────────────────────────────────────────────

const WeatherAPI = (() => {
  const API_KEY  = 'YOUR_API_KEY_HERE'; // ← Replace with your OWM key
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const UNITS    = 'metric';            // metric = °C; imperial = °F

  // Custom error classes for fine-grained error handling
  class NetworkError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NetworkError';
    }
  }

  class CityNotFoundError extends Error {
    constructor(city) {
      super(`City "${city}" was not found. Try checking the spelling.`);
      this.name = 'CityNotFoundError';
    }
  }

  class APIKeyError extends Error {
    constructor() {
      super('Invalid or missing API key. Please check your OpenWeatherMap key.');
      this.name = 'APIKeyError';
    }
  }

  class RateLimitError extends Error {
    constructor() {
      super('Too many requests. Please wait a moment and try again.');
      this.name = 'RateLimitError';
    }
  }

  // ─── Core Fetch Function ────────────────────────────────────────────────────

  /**
   * fetchWeatherByCity
   * Async function: fetches current weather JSON for a city name.
   *
   * @param {string} city - City name (e.g. "London", "New York")
   * @returns {Promise<Object>} Parsed JSON weather data
   * @throws {CityNotFoundError|NetworkError|APIKeyError|RateLimitError|Error}
   */
  async function fetchWeatherByCity(city) {
    if (!city || !city.trim()) {
      throw new Error('Please enter a city name.');
    }

    const url = buildURL({ q: city.trim(), units: UNITS });

    let response;
    try {
      // Modern Fetch API call with AbortController timeout
      const controller = new AbortController();
      const timeoutId  = setTimeout(() => controller.abort(), 10_000); // 10s timeout

      response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

    } catch (err) {
      if (err.name === 'AbortError') {
        throw new NetworkError('Request timed out. Check your connection and try again.');
      }
      throw new NetworkError(`Network error: ${err.message}`);
    }

    // Parse JSON first to get API error details
    let data;
    try {
      data = await response.json();
    } catch {
      throw new NetworkError('Received an invalid response from the weather service.');
    }

    // Handle HTTP error status codes
    if (!response.ok) {
      handleHTTPError(response.status, data, city);
    }

    return data; // Successfully parsed weather JSON
  }

  // ─── Helper: Build URL ──────────────────────────────────────────────────────

  /**
   * Builds the API request URL with query parameters.
   * @param {Object} params - Key/value query parameters
   * @returns {string} Full URL string
   */
  function buildURL(params) {
    const query = new URLSearchParams({
      ...params,
      appid: API_KEY,
    });
    return `${BASE_URL}?${query.toString()}`;
  }

  // ─── Helper: HTTP Error Handler ─────────────────────────────────────────────

  /**
   * Maps HTTP status codes to descriptive errors.
   * @param {number} status - HTTP response status
   * @param {Object} data   - Parsed JSON body
   * @param {string} city   - City name for context
   */
  function handleHTTPError(status, data, city) {
    switch (status) {
      case 401:
        throw new APIKeyError();
      case 404:
        throw new CityNotFoundError(city);
      case 429:
        throw new RateLimitError();
      case 500:
      case 502:
      case 503:
        throw new NetworkError('Weather service is temporarily unavailable. Try again shortly.');
      default:
        throw new NetworkError(
          `Unexpected error (${status}): ${data?.message || 'Unknown error'}`
        );
    }
  }

  // ─── Data Extractor ─────────────────────────────────────────────────────────

  /**
   * extractWeatherData
   * Parses the complex nested OpenWeatherMap JSON into a flat, clean object.
   * This is the JSON parsing / transformation layer.
   *
   * Raw OWM JSON structure (simplified):
   * {
   *   name: string,
   *   sys: { country, sunrise, sunset },
   *   coord: { lat, lon },
   *   main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
   *   weather: [{ id, main, description, icon }],
   *   wind: { speed, deg },
   *   clouds: { all },
   *   visibility: number,
   *   dt: unix timestamp,
   *   timezone: offset in seconds
   * }
   *
   * @param {Object} raw - Raw JSON from OpenWeatherMap API
   * @returns {Object} Clean, flat weather data object
   */
  function extractWeatherData(raw) {
    const tz = raw.timezone; // UTC offset in seconds

    return {
      // Location
      city:        raw.name,
      country:     raw.sys?.country ?? '—',
      lat:         raw.coord?.lat?.toFixed(2) ?? '—',
      lon:         raw.coord?.lon?.toFixed(2) ?? '—',

      // Temperature (°C from metric units)
      tempC:       Math.round(raw.main?.temp ?? 0),
      feelsLikeC:  Math.round(raw.main?.feels_like ?? 0),
      tempMinC:    Math.round(raw.main?.temp_min ?? 0),
      tempMaxC:    Math.round(raw.main?.temp_max ?? 0),

      // Atmospheric
      humidity:    raw.main?.humidity ?? 0,           // %
      pressure:    raw.main?.pressure ?? 0,           // hPa
      visibility:  raw.visibility != null
                     ? (raw.visibility / 1000).toFixed(1)
                     : '—',                           // km

      // Wind
      windSpeed:   raw.wind?.speed?.toFixed(1) ?? '—',  // m/s
      windDeg:     raw.wind?.deg ?? null,

      // Sky
      cloudiness:  raw.clouds?.all ?? 0,              // %
      conditionId: raw.weather?.[0]?.id ?? 800,
      condition:   raw.weather?.[0]?.description ?? 'clear sky',
      icon:        raw.weather?.[0]?.icon ?? '01d',

      // Sun times — convert Unix timestamps to local city time
      sunrise: formatUnixTime(raw.sys?.sunrise, tz),
      sunset:  formatUnixTime(raw.sys?.sunset,  tz),

      // Data freshness
      updatedAt: formatUnixTime(raw.dt, tz),
    };
  }

  // ─── Utility: Format Unix Timestamp ────────────────────────────────────────

  /**
   * Converts a Unix timestamp + UTC offset to a readable HH:MM string.
   * @param {number} unixTime  - Seconds since Unix epoch
   * @param {number} tzOffset  - UTC offset in seconds
   * @returns {string}
   */
  function formatUnixTime(unixTime, tzOffset) {
    if (unixTime == null) return '—';
    const utcMs     = (unixTime + tzOffset) * 1000;
    const localDate = new Date(utcMs);
    const h = String(localDate.getUTCHours()).padStart(2, '0');
    const m = String(localDate.getUTCMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  }

  // ─── Utility: Convert °C to °F ──────────────────────────────────────────────

  function celsiusToFahrenheit(c) {
    return Math.round(c * 9 / 5 + 32);
  }

  // ─── Wind Direction ─────────────────────────────────────────────────────────

  /**
   * Converts wind degree to compass direction string.
   * @param {number|null} deg
   * @returns {string}
   */
  function windDegreesToDirection(deg) {
    if (deg == null) return '—';
    const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE',
                  'S','SSW','SW','WSW','W','WNW','NW','NNW'];
    return dirs[Math.round(deg / 22.5) % 16];
  }

  // ─── Weather Emoji Mapper ───────────────────────────────────────────────────

  /**
   * Maps OpenWeatherMap condition IDs to emoji.
   * Condition ID docs: https://openweathermap.org/weather-conditions
   * @param {number} id
   * @returns {string}
   */
  function conditionToEmoji(id) {
    if (id >= 200 && id < 300) return '⛈️';   // Thunderstorm
    if (id >= 300 && id < 400) return '🌦️';   // Drizzle
    if (id >= 500 && id < 600) return '🌧️';   // Rain
    if (id >= 600 && id < 700) return '❄️';    // Snow
    if (id >= 700 && id < 800) return '🌫️';   // Atmosphere (fog, haze)
    if (id === 800)             return '☀️';    // Clear
    if (id === 801)             return '🌤️';   // Few clouds
    if (id === 802)             return '⛅';    // Scattered clouds
    if (id >= 803)              return '☁️';    // Broken / Overcast
    return '🌡️';
  }

  // ─── Public API ─────────────────────────────────────────────────────────────

  return {
    fetchWeatherByCity,
    extractWeatherData,
    celsiusToFahrenheit,
    windDegreesToDirection,
    conditionToEmoji,
  };
})();
