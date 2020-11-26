import { IsOptional, IsString } from 'class-validator';

import { CourseEntity } from '../course/course.entity';

export class PathDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsOptional({ each: true })
  courses?: CourseEntity[];
}
