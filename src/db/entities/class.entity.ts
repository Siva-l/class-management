import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DivisionsEntity } from './divisions.entity';

@Entity('class')
export class ClassEntity extends BaseEntity {
  @Column({ name: 'grade', type: 'int', unique: true })
  grade: number;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description: string;

  @OneToMany(() => DivisionsEntity, (division) => division.class)
  divisions: DivisionsEntity[];
}
