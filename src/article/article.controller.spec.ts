import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { repositoryMockFactory } from '../shared/mocks/repository-mock.factory';
import { ArticleEntity } from './article.entity';

describe('Article Controller', () => {
  let controller: ArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [ArticleService, { provide: getRepositoryToken(ArticleEntity), useFactory: repositoryMockFactory }],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
