import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@repo/database';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
      .then(() => console.log('Connected to DB yo!'))
      .catch((err) => console.log(err));
  }
}
