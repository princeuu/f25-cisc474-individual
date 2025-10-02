import { Module } from '@nestjs/common';

import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';

@Module({
  imports: [LinksModule, UsersModule, CoursesModule, AssignmentsModule, SubmissionsModule, EnrollmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
