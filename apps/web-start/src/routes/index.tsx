import { createFileRoute, Link } from '@tanstack/react-router';
import { LoginButton } from '../components/LoginButton';
import { LogoutButton } from '../components/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

export const Route = createFileRoute('/')({
  component: RouteComponent, 
});

function RouteComponent() {

  const { user, isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Home</h1>
            <LogoutButton />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Welcome back, {user?.name || 'User'}!</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
              <p><strong>User ID:</strong> {user?.sub || 'N/A'}</p>
            </div>
          </div>

          <Link
            to="/courses"
            className="block w-full p-6 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors text-center"
          >
            <h3 className="text-xl font-semibold mb-2">📘 View Courses</h3>
            <p className="text-gray-700">Manage your courses</p>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to your Dashboard!</h1>
      <p className="text-gray-600">Please log in to continue</p>
      <LoginButton />
    </div>
  );
}

