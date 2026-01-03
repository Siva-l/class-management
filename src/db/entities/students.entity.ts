import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { EnumGender } from '../../types/enum/app_enum';
import { MarksEntity } from './marks.entity';
import { StudentEnrollmentsEntity } from './student_enrollments.entity';

@Entity()
export class StudentsEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'admission_no', type: 'varchar', unique: true })
  admission_no: string;

  @Column({ name: 'dob', type: 'date' })
  dob: Date;

  @Column({ name: 'gender', type: 'enum', enum: EnumGender })
  gender: EnumGender;

  @Column({ name: 'phone', type: 'varchar', unique: true })
  phone: string;

  @OneToMany(() => MarksEntity, (marks) => marks.student)
  marks: MarksEntity[];

  @OneToMany(
    () => StudentEnrollmentsEntity,
    (studentEnrollments) => studentEnrollments.student,
  )
  studentEnrollments: StudentEnrollmentsEntity[];
}
