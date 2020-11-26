import { IsOptional, IsString } from 'class-validator';

export class CourseDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  objective?: string;
}
