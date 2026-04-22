# WellTrack – Health & Wellbeing Web Application

**Unit:** ICT930 Advanced Web Application Development
**Student Name:** Tashi Namgay

---

## Project Overview

WellTrack is a production-quality frontend web application designed to help users manage their personal health and wellbeing. The application enables users to log wellness activities, book and manage health appointments, track weekly progress through interactive charts, and set personal health goals with visual progress indicators.

The application simulates a real-world frontend developer scenario where the backend API already exists and the frontend team is responsible for delivering a polished, accessible, and responsive user experience.

---

## Technology Stack
<img width="667" height="247" alt="image" src="https://github.com/user-attachments/assets/3544a480-ff28-47f1-af36-b438735627b7" />



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

