import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseEntity } from './course.entity';
import { repositoryMockFactory } from '../shared/mocks/repository-mock.factory';

describe('Course Controller', () => {
  let controller: CourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [CourseService, { provide: getRepositoryToken(CourseEntity), useFactory: repositoryMockFactory }],
    }).compile();

    controller = module.get<CourseController>(CourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
