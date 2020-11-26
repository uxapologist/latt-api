import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CourseService } from './course.service';
import { repositoryMockFactory } from '../shared/mocks/repository-mock.factory';
import { CourseEntity } from './course.entity';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseService, { provide: getRepositoryToken(CourseEntity), useFactory: repositoryMockFactory }],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
