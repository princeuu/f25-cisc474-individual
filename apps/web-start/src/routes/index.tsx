import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent, 
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center bg-gray-50">
  <h1 className="text-3xl font-bold text-gray-800">Hello World!</h1>

  <div className="flex flex-col gap-4">
    <Link
      to="/courses"
      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
    >
      📘 Courses (GET /api/courses)
    </Link>

    <Link
      to="/account"
      className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow hover:bg-green-700 transition"
    >
      👤 Accounts (GET /api/users)
    </Link>
  </div>
</div>
  );
}

