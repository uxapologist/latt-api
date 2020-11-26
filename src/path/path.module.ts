import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PathService } from './path.service';
import { PathEntity } from './path.entity';
import { PathController } from './path.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PathEntity])],
  controllers: [PathController],
  providers: [PathService],
})
export class PathModule {}
