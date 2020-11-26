import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ID } from '../shared/models/id.model';
import { CourseEntity } from '../course/course.entity';

@Entity()
export class PathEntity {
  @PrimaryGeneratedColumn('uuid')
  pathId: ID;

  @Column('text')
  name: string;

  @Column('text')
  icon: string;

  @ManyToMany((type) => CourseEntity, { cascade: true })
  @JoinTable()
  courses: CourseEntity[];
}
