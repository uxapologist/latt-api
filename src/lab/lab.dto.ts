import { IsString } from 'class-validator';

import { CourseEntity } from '../course/course.entity';

export class LabDto {
  @IsString()
  url: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  duration: string;

  course: CourseEntity;
}
