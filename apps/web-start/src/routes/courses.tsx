import { createFileRoute } from '@tanstack/react-router';
import { backendFetcher } from '../integrations/fetcher';
import { useQuery } from '@tanstack/react-query';

interface Course {
  id: string;
  title: string;
  code?: string;
  term?: string;
  year?: number;
}

export const Route = createFileRoute('/courses')({
  component: CoursesList,
});

function CoursesList() {
  const { data: courses = [], isFetching, error } = useQuery({
    queryKey: ['courses'],
    queryFn: backendFetcher<Course[]>('/api/courses'),
  });

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {Array.isArray(courses) &&
          courses.map((course) => (
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