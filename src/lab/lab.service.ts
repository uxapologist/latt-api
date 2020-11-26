import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LabEntity } from './lab.entity';
import { LabDto } from './lab.dto';
import { ID } from '../shared/models/id.model';
import { DeleteResponse } from '../shared/models/delete-response.model';

@Injectable()
export class LabService {
  constructor(@InjectRepository(LabEntity) private labRepository: Repository<LabEntity>) {}

  async getLabs(): Promise<LabEntity[]> {
    return this.labRepository.find({ relations: ['course'] });
  }

  async createLab(data: LabDto): Promise<LabEntity> {
    const lab = this.labRepository.create(data);
    await this.labRepository.save(lab);
    return lab;
  }

  async getLab(labId: ID): Promise<LabEntity> {
    const lab = await this.labRepository.findOne({ where: { labId }, relations: ['course'] });
    if (!lab) {
      throw new HttpException('Lab not found', HttpStatus.NOT_FOUND);
    }
    return lab;
  }

  async updateLab(labId: ID, data: LabDto): Promise<LabEntity> {
    const lab = await this.labRepository.findOne({ where: { labId } });
    if (!lab) {
      throw new HttpException('Lab not found', HttpStatus.NOT_FOUND);
    }
    await this.labRepository.update({ labId }, data);
    return this.labRepository.findOne({ where: { labId }, relations: ['course'] });
  }

  async deleteLab(labId: ID): Promise<DeleteResponse> {
    const lab = await this.labRepository.findOne({ where: { labId } });
    if (!lab) {
      throw new HttpException('Lab not found', HttpStatus.NOT_FOUND);
    }
    await this.labRepository.delete({ labId });
    return { deleted: true, id: labId };
  }
}
