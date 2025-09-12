import Link from 'next/link';

interface CourseCardProps {
  id: string;
  name: string;
  color: string;
}

const CourseCard = ({ id, name, color }: CourseCardProps) => {
  return (
    <article className="course-card" style={{ backgroundColor: color }}>
      <div>{name}</div>
      <div>
        <Link href="/courses" className="w-full">
          <button className="btn-primary w-full justify-center">
            Go to course
          </button>
        </Link>
      </div>
    </article>
  );
};

export default CourseCard;
