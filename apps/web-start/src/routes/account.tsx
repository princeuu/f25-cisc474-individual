import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { backendFetcher } from '../integrations/fetcher';
import { useQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

////// THIS IS TEMPORARY IMPLEMENTATION JUST TO SHOW DATA //////

interface User { 
  id: string;
  name: string;
  email?: string;
  role?: string;
} 

export const Route = createFileRoute('/account')({
  component: AccountPage,
})

function AccountPage() {
  return (
    <ErrorBoundary FallbackComponent={AccountError}>
      <React.Suspense fallback={<AccountLoading />}>
        <AccountList />
      </React.Suspense>
    </ErrorBoundary>
  );
}

// --- useQuery hook (Suspense enabled) ---
function useAccounts() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: backendFetcher<User[]>('/api/users'),
    suspense: true, // Suspense handles loading state
  });
}

// --- Main List ---
function AccountList() {
  const { data } = useAccounts();
  const users = Array.isArray(data) ? data : [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Accounts</h1>
      <ul className="w-full max-w-2xl space-y-4">
        {users.map((user: User) => (
          <li
            key={user.id}
            className="bg-white shadow-sm rounded-lg p-4 border border-gray-200 hover:shadow-md transition"
          >
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
              {user.email && (
                <p className="text-gray-600 text-sm">📧 {user.email}</p>
              )}
              {user.role && (
                <p className="text-gray-600 text-sm">🧑‍💼 Role: {user.role}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Visual Loading Fallback ---
function AccountLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-600 bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
      <p className="text-lg font-medium">Loading accounts…</p>
    </div>
  );
}

// --- Error Boundary Fallback ---
function AccountError({
  error,
  resetErrorBoundary,
}: {
  error: unknown;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-red-700 bg-gray-50">
      <p className="font-semibold text-lg mb-2">Failed to load accounts.</p>
      <p className="text-sm mb-4">{String(error)}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Retry
      </button>
    </div>
  );
}