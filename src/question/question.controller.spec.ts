import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QuestionEntity } from './question.entity';
import { repositoryMockFactory } from '../shared/mocks/repository-mock.factory';

describe('Question Controller', () => {
  let controller: QuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [QuestionService, { provide: getRepositoryToken(QuestionEntity), useFactory: repositoryMockFactory }],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
