import { Global, Module } from '@nestjs/common';

import { LinksService } from './links.service';
import { LinksController } from './links.controller';

@Global()
@Module({
  controllers: [LinksController],
  providers: [LinksService],
  exports: [LinksService],
})
export class LinksModule { }
