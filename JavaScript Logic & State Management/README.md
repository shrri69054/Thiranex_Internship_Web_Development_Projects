# ✦ TaskFlow — To-Do List App

A fully functional, state-driven task management application built with **vanilla JavaScript**, no frameworks or dependencies.

![TaskFlow Screenshot](https://via.placeholder.com/640x400/0d0f14/c8f135?text=TaskFlow)

## 🚀 Live Demo

Open `index.html` directly in any modern browser — no build step required.

---

## ✨ Features

| Feature | Details |
|--------|---------|
| **Create** | Add tasks via input field or pressing Enter |
| **Read** | Renders tasks with live stats (Total / Active / Done) |
| **Update** | Inline edit via modal dialog |
| **Delete** | Remove individual tasks with animated exit |
| **Toggle** | Click checkbox or use keyboard to mark complete |
| **Filters** | All · Active · Completed |
| **Bulk actions** | Mark all complete / Unmark all · Clear completed |
| **Persistence** | Auto-saves to `localStorage` on every change |
| **Accessible** | ARIA roles, keyboard navigation, focus management |
| **Responsive** | Works on mobile, tablet, and desktop |

---

## 📁 Project Structure

```
todo-app/
├── index.html          # App shell & semantic HTML
├── css/
│   └── style.css       # Design system & component styles
└── js/
    ├── storage.js      # localStorage read/write abstraction
    ├── state.js        # Application state & business logic (CRUD)
    ├── ui.js           # DOM rendering & element factories
    └── app.js          # Main controller — wires State ↔ UI
```

### Module responsibilities

```
storage.js   →  load() / save() / clear()   (pure localStorage)
    ↓
state.js     →  tasks[], filter, CRUD ops   (no DOM)
    ↓
ui.js        →  render() / createTaskElement() (no state)
    ↓
app.js       →  event listeners, orchestration
```

---

## 🧠 Key Concepts Demonstrated

### DOM Manipulation
- `document.createElement` + `DocumentFragment` for efficient batch inserts
- `dataset` attributes as the bridge between data and DOM
- Animated add (slide-in) and delete (fade-out) transitions

### Event Handling
- **Delegated events** on `#taskList` — one listener handles click/keyboard for all tasks
- Modal dialog with Escape / overlay-click dismissal
- `keydown` on inputs for Enter-to-submit UX

### State Management
- IIFE module pattern — encapsulated state, no globals
- Single source of truth: `tasks[]` array in `State`
- Filter state (`all` / `active` / `completed`) drives rendering

### localStorage Persistence
- `JSON.stringify` / `JSON.parse` with error handling
- Auto-saves on every mutation (add, toggle, edit, delete)
- Survives page reload and browser restart

---

## 🛠️ Getting Started

### Option 1 — Open directly
```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/todo-app.git
cd todo-app

# Open in browser (macOS)
open index.html

# Open in browser (Linux)
xdg-open index.html

# Open in browser (Windows)
start index.html
```

### Option 2 — Local dev server (optional)
```bash
# Python 3
python3 -m http.server 3000

# Node (npx)
npx serve .
```

Then visit `http://localhost:3000`.

---

## 🎨 Design

- **Palette**: Deep navy `#0d0f14` + electric lime `#c8f135` accent
- **Type**: [Syne](https://fonts.google.com/specimen/Syne) (display) + [Inter](https://fonts.google.com/specimen/Inter) (body)
- **Theme**: Dark, focused task environment

---

## 📋 Browser Support

Works in all modern browsers (Chrome, Firefox, Safari, Edge). No transpilation needed — uses ES6 IIFEs, `const`/`let`, template literals, and `Array` methods.

---

## 📄 License

MIT — free to use, modify, and distribute.
