import Link from 'next/link';
import CourseCard from '../components/CourseCard';

export default function Dashboard() {
  return (
    <main>
      <div>this is where the dashboard will be</div>

      <section>
        <CourseCard id="123" name="Course 1" color="#ffda6e" />
      </section>
    </main>
  );
}
