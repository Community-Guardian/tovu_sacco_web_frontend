import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold text-yellow-600">403</h1>
      <p className="text-xl text-gray-700 mt-2">Access Denied!</p>
      <p className="text-gray-600">You do not have permission to access this page.</p>
      <Link href="/">
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-green-700">
          Return to Dashboard
        </button>
      </Link>
    </div>
  );
}
