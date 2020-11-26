import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { LabService } from './lab.service';
import { repositoryMockFactory } from '../shared/mocks/repository-mock.factory';
import { LabEntity } from './lab.entity';

describe('LabService', () => {
  let service: LabService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LabService, { provide: getRepositoryToken(LabEntity), useFactory: repositoryMockFactory }],
    }).compile();

    service = module.get<LabService>(LabService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
