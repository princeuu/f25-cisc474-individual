import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { backendFetcher, mutateBackend } from '../integrations/fetcher';
import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import type { CourseDto, CreateCourseDto, UpdateCourseDto } from '@repo/api';

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
  return useSuspenseQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: backendFetcher<Course[]>('/api/courses'),
  });
}

// --- Main List ---
function CoursesList() {
  const { data } = useCourses();
  const courses = Array.isArray(data) ? data : [];
  const queryClient = useQueryClient();
  const [editingCourse, setEditingCourse] = React.useState<CourseDto | null>(null);

  const editFormRef = React.useRef<HTMLDivElement>(null);

  // Scroll to edit form when editing starts provided by copilot
  React.useEffect(() => {
    if (editingCourse && editFormRef.current) {
      editFormRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      // Optional: add a brief highlight effect
      editFormRef.current.classList.add('ring-4', 'ring-yellow-400');
      setTimeout(() => {
        editFormRef.current?.classList.remove('ring-4', 'ring-yellow-400');
      }, 2000);
    }
  }, [editingCourse]);

// Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: CreateCourseDto) => {
      return mutateBackend<CreateCourseDto, Course>(`/api/courses`, 'POST', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
  
  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCourseDto }) => {
      return mutateBackend<UpdateCourseDto, Course>(`/api/courses/${id}`, 'PATCH', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      setEditingCourse(null);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return mutateBackend<undefined, void>(`/api/courses/${id}`, 'DELETE');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  // Handle create form submission
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: CreateCourseDto = {
      title: formData.get('title') as string,
      code: formData.get('code') as string,
      term: formData.get('term') as string || undefined,
      year: formData.get('year') ? Number(formData.get('year')) : undefined,
    };
    createMutation.mutate(data);
    e.currentTarget.reset();
  };

  // Handle update form submission
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCourse) return;
    
    const formData = new FormData(e.currentTarget);
    const data: UpdateCourseDto = {
      id: editingCourse.id,
      title: formData.get('title') as string || undefined,
      code: formData.get('code') as string || undefined,
      term: formData.get('term') as string || undefined,
      year: formData.get('year') ? Number(formData.get('year')) : undefined,
    };
    updateMutation.mutate({ id: editingCourse.id, data });
  };

  // Handle delete
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      deleteMutation.mutate(id);
    }
  };


  return (
   <div className="p-8 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Courses Management</h1>

      {/* Create Form */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              name="title"
              placeholder="Course Title *"
              required
              className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="code"
              placeholder="Course Code (e.g., CISC-474) *"
              required
              className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="term"
              placeholder="Term (optional)"
              className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="year"
              type="number"
              placeholder="Year (optional)"
              className="px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {createMutation.isPending ? 'Creating...' : '➕ Create Course'}
          </button>
          {createMutation.isError && (
            <p className="text-red-600 text-sm">Failed to create course</p>
          )}
        </form>
      </div>

      {/* Edit Form (only shown when editing) */}
      {editingCourse && (
        <div ref={editFormRef} className="mb-8 p-6 bg-yellow-50 rounded-lg shadow border-2 border-yellow-300">
          <h2 className="text-xl font-semibold mb-4">✏️ Edit Course</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                name="title"
                placeholder="Course Title"
                defaultValue={editingCourse.title}
                className="px-4 py-2 border rounded focus:ring-2 focus:ring-yellow-500"
              />
              <input
                name="code"
                placeholder="Course Code"
                defaultValue={editingCourse.code}
                className="px-4 py-2 border rounded focus:ring-2 focus:ring-yellow-500"
              />
              <input
                name="term"
                placeholder="Term"
                defaultValue={editingCourse.term || ''}
                className="px-4 py-2 border rounded focus:ring-2 focus:ring-yellow-500"
              />
              <input
                name="year"
                type="number"
                placeholder="Year"
                defaultValue={editingCourse.year || ''}
                className="px-4 py-2 border rounded focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 transition"
              >
                {updateMutation.isPending ? 'Updating...' : '✅ Update Course'}
              </button>
              <button
                type="button"
                onClick={() => setEditingCourse(null)}
                className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
              >
                ❌ Cancel
              </button>
            </div>
            {updateMutation.isError && (
              <p className="text-red-600 text-sm">Failed to update course</p>
            )}
          </form>
        </div>
      )}

      {/* Courses List */}
      <div className="bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold p-6 border-b">📚 All Courses</h2>
        <div className="divide-y">
          {courses.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">No courses yet. Create one above!</p>
          ) : (
            courses.map((course) => (
              <div key={course.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                    <p className="text-gray-600">📘 Code: {course.code}</p>
                    {course.term && <p className="text-gray-600">🗓️ Term: {course.term}</p>}
                    {course.year && <p className="text-gray-600">📅 Year: {course.year}</p>}
                    <p className="text-xs text-gray-400 mt-2">ID: {course.id}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingCourse(course)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      disabled={deleteMutation.isPending}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400 transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
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