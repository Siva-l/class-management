import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DivisionsEntity } from './divisions.entity';
import { TeachersEntity } from './teachers.entity';

@Entity()
export class ClassTeachersEntity extends BaseEntity {
  @Column({ name: 'division_id', type: 'uuid' })
  divisionId: string;

  @Column({ name: 'teacher_id', type: 'uuid' })
  teacherId: string;

  @ManyToOne(() => DivisionsEntity, (division) => division.classTeachers)
  @JoinColumn({ name: 'division_id' })
  division: DivisionsEntity;

  @ManyToOne(() => TeachersEntity, (teacher) => teacher.classTeachers)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeachersEntity;
}
