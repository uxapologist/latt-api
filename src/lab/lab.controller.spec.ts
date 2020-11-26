import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { LabController } from './lab.controller';
import { LabService } from './lab.service';
import { LabEntity } from './lab.entity';
import { repositoryMockFactory } from '../shared/mocks/repository-mock.factory';

describe('Lab Controller', () => {
  let controller: LabController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabController],
      providers: [LabService, { provide: getRepositoryToken(LabEntity), useFactory: repositoryMockFactory }],
    }).compile();

    controller = module.get<LabController>(LabController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
