import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LabController } from './lab.controller';
import { LabService } from './lab.service';
import { LabEntity } from './lab.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LabEntity])],
  controllers: [LabController],
  providers: [LabService],
})
export class LabModule {}
