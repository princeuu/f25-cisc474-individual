import { Injectable } from '@nestjs/common';
import { Prisma } from '@repo/database';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class SubmissionsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createSubmissionDto: Prisma.SubmissionCreateInput) {
    return this.prisma.submission.create({ data: createSubmissionDto });
  }

  async findAll() {
    return this.prisma.submission.findMany({});
  }

  async findOne(id: string) {
    return this.prisma.submission.findUnique({ where: { id } });
  }

  async update(id: string, updateSubmissionDto: Prisma.SubmissionUpdateInput) {
    return this.prisma.submission.update({
      where: { id },
      data: updateSubmissionDto,
    });
  }

  async remove(id: string) {
    return this.prisma.submission.delete({ where: { id } });
  }
}
