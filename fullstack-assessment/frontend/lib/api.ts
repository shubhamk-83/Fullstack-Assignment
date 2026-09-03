export type Movie = {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
};

export type ItemsResponse = {
  items: Movie[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
};

// The backend runs on a different origin than the frontend during dev
// (localhost:8000 vs localhost:3000). Point this at wherever the API
// is actually deployed via an env var in production.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export async function fetchItems(
  page: number,
  limit: number
): Promise<ItemsResponse> {
  const res = await fetch(
    `${API_BASE_URL}/items?page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch items: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
