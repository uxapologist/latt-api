import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PathEntity } from './path.entity';
import { PathDto } from './path.dto';
import { DeleteResponse } from '../shared/models/delete-response.model';
import { ID } from '../shared/models/id.model';

@Injectable()
export class PathService {
  constructor(@InjectRepository(PathEntity) private pathRepository: Repository<PathEntity>) {}

  async getPaths(): Promise<PathEntity[]> {
    return this.pathRepository.find({ relations: ['courses'] });
  }

  async createPath(data: PathDto): Promise<PathEntity> {
    const path = this.pathRepository.create(data);
    await this.pathRepository.save(path);
    return path;
  }

  async getPath(pathId: ID): Promise<PathEntity> {
    const path = await this.pathRepository.findOne({ where: { pathId }, relations: ['courses'] });
    if (!path) {
      throw new HttpException('Path not found', HttpStatus.NOT_FOUND);
    }
    return path;
  }

  async updatePath(pathId: ID, data: PathDto): Promise<PathEntity> {
    const path = await this.pathRepository.findOne({ where: { pathId }, relations: ['courses'] });
    if (!path) {
      throw new HttpException('Path not found', HttpStatus.NOT_FOUND);
    }
    await this.pathRepository.save({ ...data, pathId });
    return this.pathRepository.findOne({ where: { pathId }, relations: ['courses'] });
  }

  async deletePath(pathId: ID): Promise<DeleteResponse> {
    const path = await this.pathRepository.findOne({ where: { pathId } });
    if (!path) {
      throw new HttpException('Path not found', HttpStatus.NOT_FOUND);
    }
    await this.pathRepository.delete({ pathId });
    return { deleted: true, id: pathId };
  }
}
