import { Injectable } from '@nestjs/common';
import { Prisma } from '@repo/database';
import { PrismaService } from 'src/prisma.service';
import { 
  CourseDto, 
  CreateCourseDto, 
  UpdateCourseDto} from '@repo/api';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) { }

  private toCourseDto(course: any): CourseDto {
    return {
      id: String(course.id),
      title: course.title,
      code: course.code,
      term: course.term ?? null,
      year: course.year ?? null,
      createdAt: course.createdAt ? course.createdAt.toISOString() : null,
      updatedAt: course.updatedAt ? course.updatedAt.toISOString() : null,
    };
  }


  async create(createCourseDto: CreateCourseDto): Promise<CourseDto> {
    const data = {
      title: createCourseDto.title,
      code: createCourseDto.code,
      term: createCourseDto.term ?? null,
      year: createCourseDto.year ?? null,
    } as unknown as Prisma.CourseCreateInput;

    const created = await this.prisma.course.create({ data });
    return this.toCourseDto(created);
  }

  async findAll(): Promise<CourseDto[]> {
    const rows = await this.prisma.course.findMany();
    return rows.map(row => this.toCourseDto(row));
  }

  async findOne(id: string): Promise<CourseDto | null> {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) return null;
    return this.toCourseDto(course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<CourseDto> {
    const updated = await this.prisma.course.update({
      where: { id },
      data: {
        ...(updateCourseDto.title !== undefined ? { title: updateCourseDto.title } : {}),
        ...(updateCourseDto.code !== undefined ? { code: updateCourseDto.code } : {}),
        ...(updateCourseDto.term !== undefined ? { term: updateCourseDto.term } : {}),
        ...(updateCourseDto.year !== undefined ? { year: updateCourseDto.year } : {}),
      },
    });
    return this.toCourseDto(updated);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.course.delete({ where: { id } });
  }
}
