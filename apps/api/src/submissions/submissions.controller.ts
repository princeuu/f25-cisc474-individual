import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { Prisma } from '@repo/database';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) { }

  @Post()
  create(@Body() createSubmissionDto: Prisma.SubmissionCreateInput) {
    return this.submissionsService.create(createSubmissionDto);
  }

  @Get()
  findAll() {
    return this.submissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submissionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubmissionDto: Prisma.SubmissionUpdateInput) {
    return this.submissionsService.update(id, updateSubmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submissionsService.remove(id);
  }
}
