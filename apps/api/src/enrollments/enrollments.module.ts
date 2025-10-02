import { Module } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { EnrollmentsController } from './enrollments.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService, PrismaService],
})
export class EnrollmentsModule { }
