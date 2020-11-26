import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PathService } from './path.service';
import { repositoryMockFactory } from '../shared/mocks/repository-mock.factory';
import { PathEntity } from './path.entity';

describe('PathService', () => {
  let service: PathService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PathService, { provide: getRepositoryToken(PathEntity), useFactory: repositoryMockFactory }],
    }).compile();

    service = module.get<PathService>(PathService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
