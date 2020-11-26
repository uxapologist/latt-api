import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { ArticleDto } from './article.dto';
import { ID } from '../shared/models/id.model';
import { DeleteResponse } from '../shared/models/delete-response.model';

@Injectable()
export class ArticleService {
  constructor(@InjectRepository(ArticleEntity) private articleRepository: Repository<ArticleEntity>) {}

  async getArticles(): Promise<ArticleEntity[]> {
    return this.articleRepository.find({ relations: ['course'] });
  }

  async createArticle(data: ArticleDto): Promise<ArticleEntity> {
    const article = this.articleRepository.create(data);
    await this.articleRepository.save(article);
    return article;
  }

  async getArticle(articleId: ID): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({ where: { articleId }, relations: ['course'] });
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    return article;
  }

  async updateArticle(articleId: ID, data: ArticleDto): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOne({ where: { articleId } });
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    await this.articleRepository.update({ articleId }, data);
    return this.articleRepository.findOne({ where: { articleId }, relations: ['course'] });
  }

  async deleteArticle(articleId: ID): Promise<DeleteResponse> {
    const article = await this.articleRepository.findOne({ where: { articleId } });
    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }
    await this.articleRepository.delete({ articleId });
    return { deleted: true, id: articleId };
  }
}
