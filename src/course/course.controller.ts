import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CourseService } from './course.service';
import { CourseEntity } from './course.entity';
import { ID } from '../shared/models/id.model';
import { ValidationPipe } from '../shared/util/validation.pipe';
import { AuthGuard } from '../shared/util/auth.guard';
import { CourseDto } from './course.dto';

@ApiTags('courses')
@Controller('courses')
export class CourseController {
  private logger = new Logger('CourseController');

  constructor(private courseService: CourseService) {}

  @Get()
  @ApiOperation({ summary: 'Get available learning courses' })
  @ApiResponse({
    status: 200,
    description: 'The list of available learning courses with corresponding data (articles, labs, questions)',
  })
  getCourses(): Promise<CourseEntity[]> {
    return this.courseService.getCourses();
  }

  @Get(':courseId')
  @ApiOperation({ summary: 'Get specific learning course data by its id' })
  @ApiResponse({
    status: 200,
    description: 'The learning course with corresponding data (articles, labs, questions)',
  })
  getCourse(@Param('courseId') courseId: ID): Promise<CourseEntity> {
    return this.courseService.getCourse(courseId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a learning course' })
  @ApiResponse({
    status: 200,
    description: 'The learning course with corresponding data (articles, labs, questions)',
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(new AuthGuard())
  createCourse(@Body() courseData: CourseDto): Promise<CourseEntity> {
    this.logger.log(JSON.stringify(courseData));
    return this.courseService.createCourse(courseData);
  }

  @Patch(':courseId')
  @ApiOperation({ summary: 'Update specific learning course data' })
  @ApiResponse({
    status: 200,
    description: 'The learning course with corresponding data (articles, labs, questions)',
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(new AuthGuard())
  updateCourse(@Param('courseId') courseId: ID, @Body() courseData: CourseDto): Promise<CourseEntity> {
    this.logger.log(JSON.stringify(courseData));
    return this.courseService.updateCourse(courseId, courseData);
  }

  @Delete(':courseId')
  @ApiOperation({ summary: 'Delete specific learning course' })
  @ApiResponse({
    status: 200,
    description: 'Is the specified learning course deleted successfully',
  })
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  deleteCourse(@Param('courseId') courseId: ID) {
    return this.courseService.deleteCourse(courseId);
  }
}
