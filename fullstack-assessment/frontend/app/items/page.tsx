"use client";

import { useEffect, useState } from "react";
import { fetchItems, Movie } from "@/lib/api";

const LIMIT = 8;

export default function ItemsPage() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchItems(page, LIMIT);
        if (cancelled) return;
        setMovies(data.items);
        setTotalPages(data.total_pages);
        setTotal(data.total);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [page]);

  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-1">Movies</h1>
      <p className="text-sm text-gray-500 mb-6">
        {total > 0 ? `${total} total movies` : "\u00A0"}
      </p>

      {/* Error state */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          Couldn&apos;t load movies: {error}
          <button
            onClick={() => setPage((p) => p)} // trigger a retry by re-running effect
            className="ml-3 underline hover:no-underline">
            Retry
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && !error && (
        <div className="space-y-2 mb-6">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <div
              key={i}
              className="h-12 rounded-lg bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Data */}
      {!loading && !error && (
        <>
          <div className="overflow-hidden rounded-lg border border-gray-200 mb-6">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2 font-medium">Title</th>
                  <th className="px-4 py-2 font-medium">Year</th>
                  <th className="px-4 py-2 font-medium">Genre</th>
                  <th className="px-4 py-2 font-medium">Rating</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.id} className="border-t border-gray-200">
                    <td className="px-4 py-2">{movie.title}</td>
                    <td className="px-4 py-2">{movie.year}</td>
                    <td className="px-4 py-2">{movie.genre}</td>
                    <td className="px-4 py-2">{movie.rating.toFixed(1)}</td>
                  </tr>
                ))}
                {movies.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center text-gray-400">
                      No movies found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={isFirstPage}
              className="px-3 py-1.5 rounded-md border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition">
              ← Prev
            </button>

            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={isLastPage}
              className="px-3 py-1.5 rounded-md border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition">
              Next →
            </button>
          </div>
        </>
      )}
    </main>
  );
}
