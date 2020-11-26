import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { QuestionService } from './question.service';
import { repositoryMockFactory } from '../shared/mocks/repository-mock.factory';
import { QuestionEntity } from './question.entity';

describe('QuestionService', () => {
  let service: QuestionService;
  {
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionService, { provide: getRepositoryToken(QuestionEntity), useFactory: repositoryMockFactory }],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
