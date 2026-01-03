import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MarksEntity } from './marks.entity';

@Entity()
export class ExamEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @OneToMany(() => MarksEntity, (marks) => marks.exam)
  marks: MarksEntity[];
}
