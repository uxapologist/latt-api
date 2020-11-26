import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ArticleService } from './article.service';
import { repositoryMockFactory } from '../shared/mocks/repository-mock.factory';
import { ArticleEntity } from './article.entity';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleService, { provide: getRepositoryToken(ArticleEntity), useFactory: repositoryMockFactory }],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
