import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DivisionsEntity } from './divisions.entity';
import { TeachersEntity } from './teachers.entity';
import { SubjectsEntity } from './subjects.entity';

@Entity('class_teachers')
export class ClassTeachersEntity extends BaseEntity {
  @Column({ name: 'division_id', type: 'uuid' })
  divisionId: string;

  @Column({ name: 'teacher_id', type: 'uuid' })
  teacherId: string;

  @Column({ name: 'subject_id', type: 'uuid' })
  subjectId: string;

  @ManyToOne(() => DivisionsEntity, (division) => division.classTeachers)
  @JoinColumn({ name: 'division_id' })
  division: DivisionsEntity;

  @ManyToOne(() => TeachersEntity, (teacher) => teacher.classTeachers)
  @JoinColumn({ name: 'teacher_id' })
  teacher: TeachersEntity;

  @ManyToOne(() => SubjectsEntity, (subject) => subject.classTeachers)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectsEntity;
}
