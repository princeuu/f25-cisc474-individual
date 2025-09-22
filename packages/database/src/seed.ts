import { prisma } from "./client";
import { faker } from "@faker-js/faker";
// import type { User } from "../generated/client";

// const DEFAULT_USERS = [
//   // Add your own user to pre-populate the database with
//   {
//     name: "Prince Clark",
//     email: "prince@apple.com",

//   },
// ] as Array<Partial<User>>;

(async () => {
  try {

    const users = await Promise.all(                      // Create Users
      Array.from({ length: 10 }).map(() =>
        prisma.user.create({
          data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
          },
        })
      )
    );

    const courses = await Promise.all(                     // Create Courses
      Array.from({ length: 3 }).map(() =>
        prisma.course.create({
          data: {
            title: faker.word.words({ count: 3 }),
            code: "CISC-" + faker.number.int({ min: 100, max: 499 }),
            term: faker.helpers.arrayElement(["Spring", "Summer", "Fall"]),
            year: faker.number.int({ min: 2020, max: 2025 }),
          },
        })
      )
    );

    await Promise.all(                          // Enroll users randomly in courses
      users.map((user) =>
        prisma.enrollment.create({
          data: {
            userId: user.id,
            courseID: faker.helpers.arrayElement(courses).id,
            role: faker.helpers.arrayElement(["STUDENT", "INSTRUCTOR"]),
          },
        })
      )
    );

    const assignments = await Promise.all(             // Add assignments
      courses.flatMap((course) =>
        Array.from({ length: 2 }).map(() =>
          prisma.assignment.create({
            data: {
              courseId: course.id,
              title: faker.word.words({ count: 4 }),
              points: faker.number.int({ min: 10, max: 100 }),
            },
          })
        )
      )
    );

    const students = await prisma.enrollment.findMany({        // Add submissions for some students
      where: { role: "STUDENT" },
      include: { user: true },
    });

    await Promise.all(
      assignments.flatMap((assignment) =>
        students.map((student) =>
          prisma.submission.create({
            data: {
              assignmentId: assignment.id,
              userId: student.user.id,
              submittedAt: faker.datatype.boolean()
                ? faker.date.recent()
                : null,
            },
          })
        )
      )
    );

    console.log("Fake data seeded!");

  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();




// async function main() {
//   // Add one user
//   const user = await prisma.user.deleteMany()

// }


// main()
//   .catch((e) => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect()
//   });
