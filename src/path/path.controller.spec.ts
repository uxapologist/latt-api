import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PathController } from './path.controller';
import { PathService } from './path.service';
import { PathEntity } from './path.entity';
import { repositoryMockFactory } from '../shared/mocks/repository-mock.factory';

describe('Path Controller', () => {
  let controller: PathController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PathController],
      providers: [PathService, { provide: getRepositoryToken(PathEntity), useFactory: repositoryMockFactory }],
    }).compile();

    controller = module.get<PathController>(PathController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
