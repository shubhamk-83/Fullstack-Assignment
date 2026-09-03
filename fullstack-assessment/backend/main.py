from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from math import ceil

app = FastAPI(title="Movies API")

# --- CORS ---
# The frontend (Next.js) runs on a different origin (localhost:3000) than
# this backend (localhost:8000). Without CORS enabled, the browser will
# block the frontend's fetch requests with a cross-origin error, even
# though the request would work fine from something like curl/Postman.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://fullstack-assignment-i1rxg5yll-shubham-kumars-projects-75082655.vercel.app",
    ],
    allow_methods=["GET"],
    allow_headers=["*"],
)

# --- Hardcoded "database" ---
# 30 rows, 4 fields each. Loaded once at startup, kept in memory.
MOVIES = [
    {"id": 1, "title": "3 Idiots", "year": 2009, "genre": "Comedy-Drama", "rating": 8.4},
    {"id": 2, "title": "Dangal", "year": 2016, "genre": "Sports-Drama", "rating": 8.3},
    {"id": 3, "title": "Taare Zameen Par", "year": 2007, "genre": "Drama", "rating": 8.3},
    {"id": 4, "title": "12th Fail", "year": 2023, "genre": "Drama", "rating": 9.0},
    {"id": 5, "title": "Lagaan", "year": 2001, "genre": "Sports-Drama", "rating": 8.1},
    {"id": 6, "title": "Rang De Basanti", "year": 2006, "genre": "Drama", "rating": 8.1},
    {"id": 7, "title": "Swades", "year": 2004, "genre": "Drama", "rating": 8.2},
    {"id": 8, "title": "Munna Bhai M.B.B.S.", "year": 2003, "genre": "Comedy-Drama", "rating": 8.1},
    {"id": 9, "title": "Andhadhun", "year": 2018, "genre": "Thriller", "rating": 8.2},
    {"id": 10, "title": "Drishyam", "year": 2015, "genre": "Thriller", "rating": 8.2},
    {"id": 11, "title": "Drishyam 2", "year": 2022, "genre": "Crime-Thriller", "rating": 8.2},
    {"id": 12, "title": "Gully Boy", "year": 2019, "genre": "Drama", "rating": 7.9},
    {"id": 13, "title": "Zindagi Na Milegi Dobara", "year": 2011, "genre": "Comedy-Drama", "rating": 8.2},
    {"id": 14, "title": "Barfi!", "year": 2012, "genre": "Comedy-Drama", "rating": 8.1},
    {"id": 15, "title": "Queen", "year": 2013, "genre": "Comedy-Drama", "rating": 8.1},
    {"id": 16, "title": "Kahaani", "year": 2012, "genre": "Mystery-Thriller", "rating": 8.1},
    {"id": 17, "title": "Article 15", "year": 2019, "genre": "Crime-Drama", "rating": 8.1},
    {"id": 18, "title": "Masaan", "year": 2015, "genre": "Drama", "rating": 8.1},
    {"id": 19, "title": "Piku", "year": 2015, "genre": "Comedy-Drama", "rating": 7.6},
    {"id": 20, "title": "The Lunchbox", "year": 2013, "genre": "Drama", "rating": 7.8},
    {"id": 21, "title": "Haider", "year": 2014, "genre": "Crime-Drama", "rating": 8.0},
    {"id": 22, "title": "Omkara", "year": 2006, "genre": "Crime-Drama", "rating": 8.0},
    {"id": 23, "title": "Maqbool", "year": 2003, "genre": "Crime-Drama", "rating": 8.0},
    {"id": 24, "title": "Gangs of Wasseypur", "year": 2012, "genre": "Crime-Drama", "rating": 8.2},
    {"id": 25, "title": "Special 26", "year": 2013, "genre": "Crime-Thriller", "rating": 8.0},
    {"id": 26, "title": "Khosla Ka Ghosla", "year": 2006, "genre": "Comedy", "rating": 8.3},
    {"id": 27, "title": "Chak De! India", "year": 2007, "genre": "Sports-Drama", "rating": 8.1},
    {"id": 28, "title": "OMG – Oh My God!", "year": 2012, "genre": "Comedy-Drama", "rating": 8.1},
    {"id": 29, "title": "A Wednesday!", "year": 2008, "genre": "Thriller", "rating": 8.1},
    {"id": 30, "title": "Udaan", "year": 2010, "genre": "Drama", "rating": 8.1},
]


@app.get("/items")
def get_items(
    page: int = Query(1, ge=1, description="1-indexed page number"),
    limit: int = Query(10, ge=1, le=100, description="items per page"),
):
    total = len(MOVIES)
    total_pages = max(1, ceil(total / limit))

    start = (page - 1) * limit
    end = start + limit
    page_items = MOVIES[start:end]

    return {
        "items": page_items,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages,
    }


@app.get("/")
def root():
    return {"status": "ok", "docs": "/docs"}
