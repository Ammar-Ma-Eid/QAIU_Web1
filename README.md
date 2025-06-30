# QAIU Web Project Structure

## Overview
This project is now organized for a clean separation of frontend and backend:

- **client/**: All frontend (Next.js, React, UI, static assets)
- **server/**: All backend (Express.js, API endpoints, database logic)
- **_trash/**: Backup of removed/disabled files for safe cleanup

## How to Run

### 1. Backend (server)
- Go to the `server` folder
- Install dependencies: `npm install`
- Start the server: `npm start` (or your custom script)
- The backend will run on its own port (e.g., http://localhost:5000)

### 2. Frontend (client)
- Go to the `client` folder
- Install dependencies: `npm install`
- Start the dev server: `npm run dev`
- The frontend will run on its own port (e.g., http://localhost:3000)

## Connecting Frontend to Backend
- All API calls from the frontend should use the backend server URL, e.g., `http://localhost:5000/api/login`
- Do not use Next.js API routes in `client/src/pages/api` (these are now disabled)
- Update your frontend code to use `fetch` or `axios` to call backend endpoints

## Safe Cleanup
- Disabled/removed files are in the `_trash` folder for backup
- No code was deleted outright

---
If you need to restore anything, check the `_trash` folder.
