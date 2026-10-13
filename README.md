# ODS-system (Evrika)

Opportunity Discovery System (ODS), nicknamed **Evrika**, is a centralized web platform for discovering internships, hackathons, scholarships, workshops, and coding competitions.

## Project structure

- `src/` — React frontend built with Vite.
- `server/` — Express API, administrator authentication, and MongoDB models/routes.
- `public/` — static assets and frontend-host routing configuration.

## Requirements

- Node.js compatible with the installed Vite version (Node.js 20.19+ or 22.12+ recommended).
- MongoDB for persistent listings and administrator accounts.

## Run locally

From the project root, install the frontend and backend dependencies:

- `npm install`
- `npm --prefix server install`

Configure the API environment by copying `server/.env.example` to `server/.env` and setting `MONGODB_URI` and a private `JWT_SECRET` of at least 32 bytes. Start the API and frontend in separate terminals:

- API: `npm --prefix server run dev`
- Frontend: `npm run dev`

The frontend development API URL defaults to `http://localhost:5000/api`.

## Checks

- Frontend production build: `npm run build`
- Frontend lint: `npm run lint`
- Backend tests: `npm --prefix server test`
- API health endpoint: `http://localhost:5000/api/health`

## Deployment overview

Deploy the frontend as a static Vite site and the API as a Node.js service. MongoDB must be reachable from the API host.

Before setting a Railway Root Directory, confirm the connected GitHub repository contains the backend files. If the backend is a regular `server/` directory in a monorepo, use `/server`; if the connected repository contains only the backend files, use its root. The backend start command is `npm start` (`node server.js`); `npm install` installs its dependencies.

Configure these API environment variables on the server host:

- `NODE_ENV=production`
- `MONGODB_URI` — private MongoDB connection string
- `JWT_SECRET` — private random value of at least 32 bytes
- `CORS_ORIGINS` — exact HTTPS frontend origin, without a path or trailing slash

Configure `VITE_API_URL` in the frontend build environment to the API URL ending in `/api`. This value is bundled into public client-side assets, so it must not contain secrets. Build with `npm run build` and publish the root `dist` directory. Configure the static host to rewrite frontend routes to `/index.html`; `public/_redirects` supplies a Netlify-style rule.

Create the administrator account by running `node scripts/createAdmin.js` from the backend directory in an interactive terminal with the production `MONGODB_URI` and `JWT_SECRET` configured. Use a unique password of at least 12 characters.

Never commit `.env` files. Student login/signup and the student dashboard currently use demo browser storage and are not production authentication or account storage. Rotate credentials if they may have been exposed.

## API endpoints

- `GET /api/health` — health check.
- `GET /api/opportunities` — list opportunities.
- `GET /api/opportunities/:id` — retrieve one opportunity.
- `POST /api/opportunities` — create an opportunity (admin JWT required).
- `POST /api/auth/login` — administrator login.
