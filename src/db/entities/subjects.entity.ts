import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MarksEntity } from './marks.entity';

@Entity('subjects')
export class SubjectsEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'code', type: 'varchar' })
  code: string;

  @OneToMany(() => MarksEntity, (marks) => marks.subject)
  marks: MarksEntity[];
}
