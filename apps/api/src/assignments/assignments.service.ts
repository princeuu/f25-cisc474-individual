import { Injectable } from '@nestjs/common';
import { Prisma } from '@repo/database';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class AssignmentsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createAssignmentDto: Prisma.AssignmentCreateInput) {
    return this.prisma.assignment.create({ data: createAssignmentDto, });
  }

  async findAll() {
    return this.prisma.assignment.findMany();
  }

  async findOne(id: string) {
    return this.prisma.assignment.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateAssignmentDto: Prisma.AssignmentUpdateInput) {
    return this.prisma.assignment.update({ where: { id }, data: updateAssignmentDto, });
  }

  async remove(id: string) {
    return this.prisma.assignment.delete({ where: { id }, });
  }
}
