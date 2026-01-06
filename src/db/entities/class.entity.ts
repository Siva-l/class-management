import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DivisionsEntity } from './divisions.entity';

@Entity('classes')
export class ClassEntity extends BaseEntity {
  @Column({ name: 'grade', type: 'int' })
  grade: number;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description: string;

  @OneToMany(() => DivisionsEntity, (division) => division.class)
  divisions: DivisionsEntity[];
}
