# Full-Stack Assessment

## Q1 — Paginated Movies

A full-stack paginated movie listing built with **FastAPI**, **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

The application displays 30 hardcoded Bollywood movies and fetches them from the FastAPI backend with pagination.

## Running the Project

### Backend — FastAPI

```bash
cd backend

python -m venv venv
```

**Windows PowerShell:**

```powershell
venv\Scripts\activate
```

**macOS/Linux:**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the backend:

```bash
uvicorn main:app --reload --port 8000
```

API documentation:

http://localhost:8000/docs

### Frontend — Next.js

Open a second terminal:

```bash
cd frontend
npm install
```

Create `.env.local` from `.env.local.example` and set:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

Open:

http://localhost:3000

Then click **"View Movies"**.

Both the backend and frontend must be running at the same time:

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:3000`

## Live Demo

**Frontend:**  
https://fullstack-assignment-kappa.vercel.app/

**Backend API Docs:**  
https://fullstack-assignment-1-eia6.onrender.com/docs

**GitHub Repository:**  
https://github.com/shubhamk-83/Fullstack-Assignment

## How Pagination Works

The backend exposes:

```text
GET /items?page=1&limit=8
```

The endpoint returns the requested slice of movies along with:

- `total` — total number of movies
- `page` — current page
- `limit` — number of movies per page
- `total_pages` — total number of available pages

For example, with 30 movies and 8 movies per page:

```text
Page 1 → 8 movies
Page 2 → 8 movies
Page 3 → 8 movies
Page 4 → 6 movies
```

The frontend stores the current page in React state and fetches new data whenever the page changes.

The **Previous** button is disabled on the first page and the **Next** button is disabled on the last page. The final page correctly displays fewer movies without causing an error.

## Project Structure

```text
fullstack-assessment/
├── backend/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   └── items/
│   │       └── page.tsx
│   ├── lib/
│   │   └── api.ts
│   └── package.json
│
└── README.md
```

## Features

- 30 hardcoded Bollywood movies
- FastAPI REST endpoint
- Server-side pagination
- Next.js App Router
- TypeScript
- Tailwind CSS
- Frontend API fetching
- Loading state
- Error and retry state
- Previous/Next pagination
- Last-page edge-case handling
- CORS configuration for frontend/backend communication
