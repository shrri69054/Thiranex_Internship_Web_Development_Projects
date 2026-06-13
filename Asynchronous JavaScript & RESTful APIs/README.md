# SkyCast — Real-Time Weather Dashboard

A dynamic, real-time weather dashboard built with **vanilla JavaScript** using the **Fetch API** and `async/await`. Fetches live data from the OpenWeatherMap REST API and renders parsed JSON metrics into a clean, responsive UI.

![SkyCast Weather Dashboard](https://img.shields.io/badge/JavaScript-ES2020-yellow?logo=javascript) ![License](https://img.shields.io/badge/license-MIT-blue) ![API](https://img.shields.io/badge/API-OpenWeatherMap-orange)

---

## ✨ Features

- **Async/Await Fetch** — Modern REST API calls with proper promise chaining
- **Comprehensive Error Handling** — Custom error classes for `NetworkError`, `CityNotFoundError`, `APIKeyError`, `RateLimitError`
- **Complex JSON Parsing** — Extracts and transforms deeply nested OWM JSON into clean data objects
- **City Search** — Search any city worldwide with quick-access preset buttons
- **Unit Toggle** — Switch between °C and °F without re-fetching
- **Live Clock** — Real-time UTC clock in the header
- **Animated UI** — Sun arc SVG, humidity progress bar, cloud cover ring
- **Fully Responsive** — Works on mobile, tablet, and desktop
- **Accessible** — ARIA labels, keyboard navigation, reduced-motion support

---

## 🚀 Quick Start

### 1. Get a Free API Key

Register at [openweathermap.org](https://openweathermap.org/appid) (free tier is sufficient).

### 2. Add Your API Key

Open `js/api.js` and replace the placeholder:

```js
const API_KEY = 'YOUR_API_KEY_HERE'; // ← Replace this
```

### 3. Run Locally

No build tools needed. Just open `index.html` in your browser or use a local server:

```bash
# Python
python -m http.server 3000

# Node.js (npx)
npx serve .

# VS Code: use the "Live Server" extension
```

---

## 📁 Project Structure

```
weather-dashboard/
├── index.html          # Main HTML — dashboard markup & layout
├── css/
│   └── style.css       # All styles — design tokens, layout, animations
├── js/
│   ├── api.js          # API module — fetch, parse JSON, error handling
│   ├── ui.js           # UI module — DOM rendering & updates
│   └── app.js          # App controller — event wiring & orchestration
└── README.md
```

---

## 🔌 API Details

**OpenWeatherMap Current Weather** — `GET /data/2.5/weather`

| Parameter | Value       |
|-----------|-------------|
| `q`       | City name   |
| `units`   | `metric`    |
| `appid`   | Your key    |

### JSON Data Parsed

```json
{
  "name": "London",
  "sys": { "country": "GB", "sunrise": 1700000, "sunset": 1700050 },
  "coord": { "lat": 51.51, "lon": -0.13 },
  "main": {
    "temp": 12.4,
    "feels_like": 10.1,
    "temp_min": 10.0,
    "temp_max": 14.0,
    "humidity": 78,
    "pressure": 1012
  },
  "weather": [{ "id": 801, "description": "few clouds", "icon": "02d" }],
  "wind": { "speed": 4.2, "deg": 230 },
  "clouds": { "all": 20 },
  "visibility": 10000,
  "dt": 1700010000,
  "timezone": 3600
}
```

---

## ⚙️ Architecture

```
User Input
    │
    ▼
app.js (Controller)
    │  async/await
    ▼
api.js (Data Layer)
    │  fetch() → JSON parse → extract & transform
    ▼
ui.js (Presentation Layer)
    │  DOM updates → animations
    ▼
Rendered Dashboard
```

### Error Handling Flow

```
fetch()
  ├── AbortController timeout  → NetworkError
  ├── Network failure          → NetworkError
  ├── HTTP 401                 → APIKeyError
  ├── HTTP 404                 → CityNotFoundError
  ├── HTTP 429                 → RateLimitError
  └── HTTP 5xx                 → NetworkError
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5      | Semantic markup, ARIA roles |
| CSS3       | Custom properties, Grid, Flexbox, animations |
| JavaScript (ES2020) | Modules, async/await, AbortController |
| Fetch API  | REST API calls |
| OpenWeatherMap API | Live weather data |

---

## 📝 License

MIT — free to use, modify, and distribute.
