import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-white-100 text-center">
      <div>
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-xl text-gray-800 mt-2">Oops! The page you are looking for does not exist.</p>
        <p className="text-gray-600 mt-2">It might have been moved or deleted.</p>
        <p className="mt-4 text-lg text-blue-500">This page is coming soon!</p>
        <Link href="/">
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-green-700">
            Return to Tovu Sacco Home
          </button>
        </Link>
      </div>
    </div>
  );
}
