import { Injectable } from '@nestjs/common';
import { Prisma } from '@repo/database';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CoursesService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createCourseDto: Prisma.CourseCreateInput) {
    return this.prisma.course.create({ data: createCourseDto });
  }

  async findAll() {
    return this.prisma.course.findMany();
  }

  async findOne(id: string) {
    return this.prisma.course.findUnique({ where: { id } });
  }

  async update(id: string, updateCourseDto: Prisma.CourseUpdateInput) {
    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: string) {
    return this.prisma.course.delete({ where: { id } });
  }
}
