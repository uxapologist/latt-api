import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ArticleService } from './article.service';
import { ArticleEntity } from '../article/article.entity';
import { ID } from '../shared/models/id.model';
import { ValidationPipe } from '../shared/util/validation.pipe';
import { AuthGuard } from '../shared/util/auth.guard';
import { ArticleDto } from '../article/article.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  private logger = new Logger('ArticleController');

  constructor(private articleService: ArticleService) {}

  @Get()
  @ApiOperation({ summary: 'Get available articles' })
  @ApiResponse({
    status: 200,
    description: 'The list of available articles',
  })
  getArticles(): Promise<ArticleEntity[]> {
    return this.articleService.getArticles();
  }

  @Get(':articleId')
  @ApiOperation({ summary: 'Get specific article data by its id' })
  @ApiResponse({
    status: 200,
    description: 'The article data',
  })
  getArticle(@Param('articleId') articleId: ID): Promise<ArticleEntity> {
    return this.articleService.getArticle(articleId);
  }

  @Post()
  @ApiOperation({ summary: 'Create an article' })
  @ApiResponse({
    status: 200,
    description: 'The article data',
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(new AuthGuard())
  createArticle(@Body() articleData: ArticleDto): Promise<ArticleEntity> {
    this.logger.log(JSON.stringify(articleData));
    return this.articleService.createArticle(articleData);
  }

  @Patch(':articleId')
  @ApiOperation({ summary: 'Update specific article data' })
  @ApiResponse({
    status: 200,
    description: 'The article data',
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(new AuthGuard())
  updateArticle(@Param('articleId') articleId: ID, @Body() articleData: ArticleDto): Promise<ArticleEntity> {
    this.logger.log(JSON.stringify(articleData));
    return this.articleService.updateArticle(articleId, articleData);
  }

  @Delete(':articleId')
  @ApiOperation({ summary: 'Delete specific article' })
  @ApiResponse({
    status: 200,
    description: 'Is the specified article deleted successfully',
  })
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  deleteArticle(@Param('articleId') articleId: ID) {
    return this.articleService.deleteArticle(articleId);
  }
}
