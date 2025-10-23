import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import type { CourseDto, CreateCourseDto, UpdateCourseDto } from '@repo/api';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto): Promise<CourseDto> {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll(): Promise<CourseDto[]> {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CourseDto | null> {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto): Promise<CourseDto> {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.coursesService.remove(id);
  }
}
