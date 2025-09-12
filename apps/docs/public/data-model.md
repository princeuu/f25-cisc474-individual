# Basic Data Model (Major Nouns)

```mermaid
erDiagram
  USER ||--o{ ENROLLMENT : enrolls
  COURSE ||--o{ ENROLLMENT : has
  COURSE ||--o{ ASSIGNMENT : contains
  ASSIGNMENT ||--o{ SUBMISSION : receives
  USER ||--o{ SUBMISSION : creates
  SUBMISSION ||--o{ FEEDBACK : has

  USER {
    string id PK
    string name
    string email
    enum role "LEARNER|INSTRUCTOR|ADMIN"
  }

  COURSE {
    string id PK
    string title
    string code
    string term
  }

  ENROLLMENT {
    string id PK
    string userId FK -> USER.id
    string courseId FK -> COURSE.id
    enum role "LEARNER|TA|INSTRUCTOR"
    string status "active|invited|dropped"
  }

  ASSIGNMENT {
    string id PK
    string courseId FK -> COURSE.id
    string title
    datetime dueAt
  }

  SUBMISSION {
    string id PK
    string assignmentId FK -> ASSIGNMENT.id
    string userId FK -> USER.id
    enum type "file|link|audio|Video"
    string status "submitted|graded"
  }

  FEEDBACK {
    string id PK
    string submissionId FK -> SUBMISSION.id
    string graderId FK -> USER.id
    float score
    string comment
  }