import { Injectable } from '@nestjs/common';
import { Prisma } from '@repo/database';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createEnrollmentDto: Prisma.EnrollmentCreateInput) {
    return this.prisma.enrollment.create({ data: createEnrollmentDto });
  }

  async findAll() {
    return this.prisma.enrollment.findMany();
  }

  async findOne(id: string) {
    return this.prisma.enrollment.findUnique({ where: { id } });
  }

  async update(id: string, updateEnrollmentDto: Prisma.EnrollmentUpdateInput) {
    return this.prisma.enrollment.update({
      where: { id },
      data: updateEnrollmentDto,
    });
  }

  async remove(id: string) {
    return this.prisma.enrollment.delete({ where: { id } });
  }
}
