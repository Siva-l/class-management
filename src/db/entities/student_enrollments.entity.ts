import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { StudentsEntity } from './students.entity';
import { DivisionsEntity } from './divisions.entity';
import { EnumStatus } from '../../types/enum/app_enum';

@Entity('student_enrollments')
export class StudentEnrollmentsEntity extends BaseEntity {
  @Column({ name: 'student_id', type: 'uuid' })
  studentId: string;

  @Column({ name: 'division_id', type: 'uuid' })
  divisionId: string;

  @Column({ name: 'status', type: 'enum', enum: EnumStatus })
  status: EnumStatus;

  @ManyToOne(() => StudentsEntity, (student) => student.studentEnrollments)
  @JoinColumn({ name: 'student_id' })
  student: StudentsEntity;

  @ManyToOne(() => DivisionsEntity, (division) => division.studentEnrollments)
  @JoinColumn({ name: 'division_id' })
  division: DivisionsEntity;
}
