# WellTrack – Health & Wellbeing Web Application

**Unit:** ICT930 Advanced Web Application Development
**Course:** Master of Information Technology (MIT)
**Institution:** Cambridge International College of Higher Education (CIHE)
**Semester:** Semester 1, 2026
**Student Name:** Tashi Namgay

---

## Project Overview

WellTrack is a production-quality frontend web application designed to help users manage their personal health and wellbeing. The application enables users to log wellness activities, book and manage health appointments, track weekly progress through interactive charts, and set personal health goals with visual progress indicators.

The application simulates a real-world frontend developer scenario where the backend API already exists and the frontend team is responsible for delivering a polished, accessible, and responsive user experience.

---

## Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.2.0 | UI framework — functional components and hooks |
| React Router DOM | 6.22.0 | Client-side routing and multi-page navigation |
| Recharts | 2.12.0 | Data visualisation — bar, line, and radar charts |
| Vite | 5.1.0 | Build tool and development server |
| CSS Modules | Native | Scoped component-level styling |
| ESLint | Latest | Code quality and linting |

---

## Installation Instructions

### Prerequisites
- Node.js (version 18 or higher) — download from [nodejs.org](https://nodejs.org)
- A code editor (VS Code recommended)

### Steps

**1. Download and extract the project**
```
Extract wellbeing-app.zip to a folder on your computer
```

**2. Open the project in VS Code**
```
File → Open Folder → select the wellbeing-app folder
```

**3. Open the terminal in VS Code**
```
Press Ctrl + ` (backtick)
```

**4. Install dependencies**
```bash
npm install
```

**5. Start the development server**
```bash
npm run dev
```

**6. Open in browser**
```
http://localhost:5173
```

### Build for Production
```bash
npm run build
npm run preview
```

---

## Key Features

### 1. Dashboard
- Personalised time-based greeting (Good morning / afternoon / evening)
- Real-time stat cards showing calories burned, active minutes, activities completed, and upcoming appointments
- Interactive weekly activity bar chart showing calories and minutes per day
- Upcoming appointments snapshot with quick navigation
- Goal progress overview with animated progress bars

### 2. Activities
- Log new wellness activities via a validated modal form
- Filter activities by category (Fitness, Mindfulness, Nutrition)
- Live search with debounce to filter activities by name
- Toggle activities between complete and incomplete status
- Visual distinction between completed and pending activities

### 3. Appointments
- Book new health appointments with full form validation
- Filter appointments by status (All, Upcoming, Completed, Cancelled)
- Cancel upcoming appointments with one click
- Toast notification feedback on every action

### 4. Progress
- Switchable chart types: Calories (bar), Active Minutes (line), Mood (radar)
- Summary statistics: total calories, active time, average mood, total activities
- Activity breakdown by category (Fitness vs Mindfulness)
- Async data loading with spinner and error handling

### 5. Goals
- Add personal wellness goals with target, current progress, unit, and category
- Visual progress bars with percentage completion
- Achievement detection with trophy indicator when goal is reached
- Summary stats: total goals, achieved, in progress

---

## Design Decisions

### React Context over Redux
React Context API was chosen for state management instead of Redux or Zustand. At this application's scale, Context with useState and useCallback provides sufficient shared state without the boilerplate overhead of Redux. The AppContext acts as a single source of truth for all data domains.

### CSS Modules over Tailwind CSS
CSS Modules were chosen to provide locally scoped styles with zero runtime overhead. A single global.css file stores all design tokens (CSS custom properties) for colours, spacing, typography, and shadows, making the visual language consistent and easy to update from one place.

### Async Data Service Layer
A dedicated dataService.js module simulates real API calls using Promise-based delays. This forces all pages to handle three states — loading, error, and success — exactly as they would in production. The pattern makes it trivial to replace the mock with real fetch() calls later.

### Custom Hooks
Three custom hooks were built to extract reusable logic:
- useDebounce: delays search filtering until the user stops typing
- useLocalStorage: persists state to localStorage across sessions
- useMediaQuery: detects screen size for responsive behaviour
- useAsync: generic hook for managing async loading and error states

### Lazy Loading Routes
All five page components are lazy-loaded using React.lazy() and Suspense. This means each route's JavaScript chunk is only downloaded when the user navigates to that page, improving initial load performance.

### Accessibility First
Semantic HTML elements (nav, aside, section, header, ul, li) were used throughout. All interactive elements have aria-label, aria-live, role, and aria-describedby attributes. Form errors are associated to inputs via aria-describedby so screen readers announce them correctly. The colour contrast between white text and the dark green sidebar passes WCAG 2.1 AA standards.

---

## Folder Structure

```
src/
├── components/
│   ├── layout/         # Sidebar, Layout wrapper
│   └── ui/             # Card, Button, Badge, Modal, Toast,
│                         ProgressBar, LoadingSpinner, ErrorMessage
├── context/            # AppContext — global state management
├── data/               # mockData.js, dataService.js (async layer)
├── hooks/              # useDebounce, useLocalStorage,
│                         useMediaQuery, useAsync
├── pages/              # Dashboard, Activities, Appointments,
│                         Progress, Goals
└── styles/             # global.css with CSS design tokens
```

---

## APA References

Meta Platforms. (2024). *React documentation* (Version 18). https://react.dev

Remix Software. (2024). *React Router documentation* (Version 6). https://reactrouter.com

Recharts Group. (2024). *Recharts: A composable charting library*. https://recharts.org

Vite Contributors. (2024). *Vite: Next generation frontend tooling* (Version 5). https://vitejs.dev

World Wide Web Consortium. (2018). *Web content accessibility guidelines (WCAG) 2.1*. https://www.w3.org/TR/WCAG21/

Mozilla Developer Network. (2024). *CSS custom properties for cascading variables*. https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties

---

## AI Use Declaration

Grammar review and structural suggestions in this README were assisted by AI tools. All architectural decisions, code implementation, design choices, and written analysis are the student's own work. This declaration is made in accordance with CIHE's Academic Integrity and Honesty Policy.
