# Technical Reflection

**Unit:** ICT930 Advanced Web Application Development
**Assessment:** Assignment 2 — Frontend Design Overview
**Student Name:** Tashi Namgay
**Institution:** CIHE
**Semester:** Semester 1, 2026

---

## Architectural Choices

The WellTrack application was built using React 18 with functional components and hooks, selected because React is the most widely adopted frontend framework in the Australian and global job market. Every component in the project uses the modern functional component pattern with hooks rather than class components, reflecting current industry standards.

For the application's state management, React Context API was chosen deliberately over heavier libraries such as Redux Toolkit or Zustand. The decision was based on the scale of the application: a single AppContext provider manages all shared data — activities, appointments, and goals — and exposes both state values and action functions to any component through a custom useApp() hook. This avoids prop drilling while keeping the codebase simple and readable. In a larger application with dozens of data domains, a dedicated state management library would be more appropriate, but for this scope, Context is the correct tool.

The project follows a clear separation of concerns in its folder structure. Layout components (Sidebar, Layout) handle page structure. UI components (Card, Button, Badge, Modal, Toast, ProgressBar, LoadingSpinner, ErrorMessage) are stateless, reusable building blocks. Pages (Dashboard, Activities, Appointments, Progress, Goals) contain feature-specific logic. A dedicated data layer (dataService.js) simulates asynchronous API calls using Promise-based delays, keeping data-fetching logic separate from UI logic.

CSS Modules were chosen over utility-first frameworks like Tailwind CSS because they produce locally scoped class names with no runtime overhead, and integrate naturally with the component model. A global.css file stores all design tokens as CSS custom properties, creating a single source of truth for the entire visual language.

---

## Challenges Faced and Solutions

**Challenge 1: Asynchronous data with loading and error states**

The most technically demanding requirement was implementing proper asynchronous data loading across all pages. Since no real backend exists, a dataService.js module was built to simulate network requests using setTimeout-based Promises. Each data domain (activities, appointments, goals) has its own loading and error state managed in AppContext. Two reusable UI components — LoadingSpinner and ErrorMessage — were built to handle these states consistently. The ErrorMessage component includes a retry button that re-triggers the fetch, mimicking real-world error recovery behaviour.

**Challenge 2: Form validation without a library**

Implementing field-level validation manually without Formik or React Hook Form required careful state design. Each form maintains an errors object where keys are field names and values are error messages. A validate() function populates this object before form submission and returns a boolean. Error messages render inline beneath each field and are linked to their inputs via aria-describedby, ensuring screen reader users receive the same feedback as visual users. This approach taught a deeper understanding of controlled form patterns in React.

**Challenge 3: Responsive sidebar navigation**

Making the sidebar work as a persistent panel on desktop and a slide-in drawer on mobile presented layout challenges. The solution used CSS transform: translateX(-100%) to hide the sidebar off-screen on small screens, toggled by a hamburger button with animated bars that transform into an X icon when open. A semi-transparent overlay captures clicks outside the drawer to close it, preventing navigation from becoming inaccessible.

**Challenge 4: Performance optimisation**

Unnecessary re-renders were identified and addressed. All action functions in AppContext are wrapped in useCallback to maintain referential stability across renders. The filtered activity and appointment lists use useMemo so filtering logic only recalculates when the underlying data or filter criteria actually changes. Search input uses a custom useDebounce hook to delay filtering until 300ms after the user stops typing, preventing excessive computation on every keystroke.

---

## Industry Relevance

Health technology is one of the fastest-growing sectors in software development globally and in Australia. The Australian Digital Health Agency reported significant growth in telehealth adoption, and platforms for managing wellness activities, clinical appointments, and personal health data are increasingly common across aged care, corporate wellness, and consumer health markets.

WellTrack simulates the kind of frontend application a junior-to-mid-level React developer would be asked to build in a health technology company. The technical decisions made throughout this project — React with hooks, Context-based state, async data patterns, accessible forms, responsive design — map directly to skills listed in frontend developer job descriptions on Seek and LinkedIn in Australia.

The accessibility considerations built into WellTrack reflect a real professional requirement. The Australian Government's Digital Service Standard mandates WCAG 2.1 AA compliance for all government digital services, and enterprise clients in healthcare increasingly require the same standard. Understanding and implementing accessibility from the start of a project, rather than retrofitting it, is a mark of professional-level frontend development.

The project also demonstrates understanding of the separation between frontend and backend concerns. By building a service layer (dataService.js) that abstracts data fetching behind async functions, the application is structured so that replacing mock data with real API calls requires changes only in that one file, not across every component. This is exactly how production frontend teams work when consuming REST APIs or GraphQL endpoints.

---

## Word Count: approximately 650 words

---

## AI Use Declaration

Grammar review and sentence structure suggestions in this reflection were assisted by AI tools. All architectural analysis, technical reasoning, challenge descriptions, and industry observations are the student's own original work, developed through the process of building this application. This declaration is made in full compliance with CIHE's Academic Integrity and Honesty Policy.
