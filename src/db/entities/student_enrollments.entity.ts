import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { StudentsEntity } from './students.entity';
import { DivisionsEntity } from './divisions.entity';

@Entity('student_enrollments')
export class StudentEnrollmentsEntity extends BaseEntity {
  @Column({ name: 'student_id', type: 'uuid' })
  studentId: string;

  @Column({ name: 'division_id', type: 'uuid' })
  divisionId: string;

  @ManyToOne(() => StudentsEntity, (student) => student.studentEnrollments)
  student: StudentsEntity;

  @ManyToOne(() => DivisionsEntity, (division) => division.studentEnrollments)
  division: DivisionsEntity;
}
