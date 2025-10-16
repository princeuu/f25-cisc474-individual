import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { backendFetcher } from '../integrations/fetcher';
import { useQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

interface Course {
  id: string;
  title: string;
  code?: string;
  term?: string;
  year?: number;
}

export const Route = createFileRoute('/courses')({
  component: CoursesPage,
});

function CoursesPage() {
  return (
    <ErrorBoundary FallbackComponent={CoursesError}>
      <React.Suspense fallback={<CoursesLoading />}>
        <CoursesList />
      </React.Suspense>
    </ErrorBoundary>
  );
}

// // --- useQuery hook (Suspense enabled) ---
function useCourses() {
  return useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: backendFetcher<Course[]>('/api/courses'),
    suspense: true, // Suspense handles loading state
  });
}

// --- Main List ---
function CoursesList() {
  const { data } = useCourses();
  const courses = Array.isArray(data) ? data : [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>

      <ul className="w-full max-w-2xl space-y-4">
        {courses.map((course: Course) => (
          <li
            key={course.id}
            className="bg-white shadow-sm rounded-lg p-4 border border-gray-200 hover:shadow-md transition"
          >
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">
                {course.title}
              </h3>
              {course.code && (
                <p className="text-gray-600 text-sm">📘 Code: {course.code}</p>
              )}
              {course.term && (
                <p className="text-gray-600 text-sm">🗓️ Term: {course.term}</p>
              )}
              {course.year && (
                <p className="text-gray-600 text-sm">📅 Year: {course.year}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Visual Loading Fallback ---
function CoursesLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-600 bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
      <p className="text-lg font-medium">Loading courses…</p>
    </div>
  );
}

// --- Error Boundary Fallback ---
function CoursesError({
  error,
  resetErrorBoundary,
}: {
  error: unknown;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-red-700 bg-gray-50">
      <p className="font-semibold text-lg mb-2">Failed to load courses.</p>
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