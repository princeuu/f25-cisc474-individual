import { Injectable } from '@nestjs/common';
import { Prisma } from '@repo/database';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: createUserDto });
  }

  async findAll() {
    return this.prisma.user.findMany({});
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
