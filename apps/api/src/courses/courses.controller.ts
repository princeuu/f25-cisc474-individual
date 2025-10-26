import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import type { CourseDto, CreateCourseDto, UpdateCourseDto } from '@repo/api';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { JwtUser } from 'src/auth/jwt.strategy';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @CurrentUser() user: JwtUser, 
    @Body() createCourseDto: CreateCourseDto): Promise<CourseDto> {
    return this.coursesService.create(createCourseDto);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@CurrentUser() user: JwtUser): Promise<CourseDto[]> {
    console.log('User accessed:', user);
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CourseDto | null> {
    return this.coursesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@CurrentUser() user: JwtUser, @Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto): Promise<CourseDto> {
    return this.coursesService.update(id, updateCourseDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@CurrentUser() user: JwtUser, @Param('id') id: string): Promise<void> {
    return this.coursesService.remove(id);
  }
}
