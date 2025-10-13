import { createFileRoute } from '@tanstack/react-router';
import { backendFetcher } from '../integrations/fetcher';

interface Course {
  id: string;
  title: string;
  code?: string; term?: string; year?: number; // add if your API returns these
}

export const Route = createFileRoute('/courses')({
  loader: async ({ context }) => {
    // Use queryClient from context (provided by root-provider)
    return context.queryClient.ensureQueryData({
      queryKey: ['courses'],
      queryFn: backendFetcher<Course[]>('/api/courses'),
    });
  },
  component: CoursesList,
});


function CoursesList() {
  const courses = Route.useLoaderData() as Course[];
  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {Array.isArray(courses) && courses.map((course) => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <h3>{course.code}</h3>
            <h3>{course.term}</h3>
            <h3>{course.year}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}