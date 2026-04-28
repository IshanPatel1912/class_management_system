# EduConnect Admin Panel

This is the web dashboard for EduConnect. It is built with React, Vite, Tailwind CSS, Firebase, and React Router.

## What It Does

The admin panel helps teachers or administrators manage the class from one place:

- Add, edit, delete, and import students.
- Send notifications.
- Create and track polls.
- Publish marks.
- Manage calendar events.
- Upload and organize study materials.

The app now uses the EduConnect name and SVG branding:

- `public/educonnect-logo.svg`
- `public/favicon.svg`

## Requirements

- Node.js
- npm
- Firebase project configuration in `src/firebase.js`

## Setup

Install dependencies:

```bash
npm install
```

## Run Locally

Start the Vite development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```text
http://localhost:5173/
```

## Build

Create a production build:

```bash
npm run build
```

The output is generated in:

```text
dist/
```

## Preview Production Build

```bash
npm run preview
```

## Useful Scripts

```bash
npm run dev      # Start local development server
npm run build    # Build production files
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Important Files

- `src/components/Layout.jsx`: sidebar layout and EduConnect logo placement.
- `src/pages/Students.jsx`: student management and import flow.
- `src/pages/Notifications.jsx`: notification management.
- `src/pages/Polls.jsx`: poll creation and results.
- `src/pages/Marks.jsx`: marks publishing.
- `src/pages/Calendar.jsx`: event calendar.
- `src/pages/Materials.jsx`: study material management.
- `public/firebase-messaging-sw.js`: Firebase messaging service worker.

## Deployment Notes

Before deployment, run:

```bash
npm run build
```

Make sure the Firebase configuration and service worker match the Firebase project being used.
