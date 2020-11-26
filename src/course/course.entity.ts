import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ID } from '../shared/models/id.model';
import { ArticleEntity } from '../article/article.entity';
import { LabEntity } from '../lab/lab.entity';
import { QuestionEntity } from '../question/question.entity';
import { PathEntity } from '../path/path.entity';

@Entity()
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  courseId: string;

  @Column('text')
  name: string;

  @Column('text')
  icon: string;

  @Column('text')
  objective: string; // i.e. description

  @OneToMany((type) => QuestionEntity, (question) => question.course, { cascade: true })
  questions: QuestionEntity[];

  @OneToMany((type) => ArticleEntity, (article) => article.course, { cascade: true })
  articles: ArticleEntity[];

  @OneToMany((type) => LabEntity, (lab) => lab.course, { cascade: true })
  labs: LabEntity[];
}
