import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Link
        href="/items"
        className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition"
      >
        View Movies →
      </Link>
    </main>
  );
}
