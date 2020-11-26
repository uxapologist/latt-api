import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QuestionEntity } from './question.entity';
import { QuestionDto } from './question.dto';
import { ID } from '../shared/models/id.model';
import { DeleteResponse } from '../shared/models/delete-response.model';

@Injectable()
export class QuestionService {
  constructor(@InjectRepository(QuestionEntity) private questionRepository: Repository<QuestionEntity>) {}

  async getQuestions(): Promise<QuestionEntity[]> {
    return this.questionRepository.find({ relations: ['course'] });
  }

  async createQuestion(data: QuestionDto): Promise<QuestionEntity> {
    const question = this.questionRepository.create(data);
    await this.questionRepository.save(question);
    return question;
  }

  async getQuestion(questionId: ID): Promise<QuestionEntity> {
    const question = await this.questionRepository.findOne({ where: { questionId }, relations: ['course'] });
    if (!question) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }
    return question;
  }

  async updateQuestion(questionId: ID, data: QuestionDto): Promise<QuestionEntity> {
    const question = await this.questionRepository.findOne({ where: { questionId } });
    if (!question) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }
    await this.questionRepository.update({ questionId }, data);
    return this.questionRepository.findOne({ where: { questionId }, relations: ['course'] });
  }

  async deleteQuestion(questionId: ID): Promise<DeleteResponse> {
    const question = await this.questionRepository.findOne({ where: { questionId } });
    if (!question) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }
    await this.questionRepository.delete({ questionId });
    return { deleted: true, id: questionId };
  }
}
