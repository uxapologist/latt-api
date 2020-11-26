import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { QuestionService } from './question.service';
import { QuestionEntity } from './question.entity';
import { ID } from '../shared/models/id.model';
import { ValidationPipe } from '../shared/util/validation.pipe';
import { AuthGuard } from '../shared/util/auth.guard';
import { QuestionDto } from './question.dto';

@ApiTags('questions')
@Controller('questions')
export class QuestionController {
  private logger = new Logger('QuestionController');

  constructor(private questionService: QuestionService) {}

  @Get()
  @ApiOperation({ summary: 'Get available skill test questions' })
  @ApiResponse({
    status: 200,
    description: 'The list of available skill test questions',
  })
  getQuestions(): Promise<QuestionEntity[]> {
    return this.questionService.getQuestions();
  }

  @Get(':questionId')
  @ApiOperation({ summary: 'Get specific skill test question data by its id' })
  @ApiResponse({
    status: 200,
    description: 'The skill test question',
  })
  getQuestion(@Param('questionId') questionId: ID): Promise<QuestionEntity> {
    return this.questionService.getQuestion(questionId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a skill test question' })
  @ApiResponse({
    status: 200,
    description: 'The skill test question',
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(new AuthGuard())
  createQuestion(@Body() questionData: QuestionDto): Promise<QuestionEntity> {
    this.logger.log(JSON.stringify(questionData));
    return this.questionService.createQuestion(questionData);
  }

  @Patch(':questionId')
  @ApiOperation({ summary: 'Update specific skill test question data' })
  @ApiResponse({
    status: 200,
    description: 'The skill test question',
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(new AuthGuard())
  updateQuestion(@Param('questionId') questionId: ID, @Body() questionData: QuestionDto): Promise<QuestionEntity> {
    this.logger.log(JSON.stringify(questionData));
    return this.questionService.updateQuestion(questionId, questionData);
  }

  @Delete(':questionId')
  @ApiOperation({ summary: 'Delete specific skill test question' })
  @ApiResponse({
    status: 200,
    description: 'Is the specified skill test question deleted successfully',
  })
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  deleteQuestion(@Param('questionId') questionId: ID) {
    return this.questionService.deleteQuestion(questionId);
  }
}
