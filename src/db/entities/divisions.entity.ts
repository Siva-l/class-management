import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ClassEntity } from './class.entity';
import { ClassTeachersEntity } from './class_teachers.entity';
import { StudentsEntity } from './students.entity';
import { StudentEnrollmentsEntity } from './student_enrollments.entity';

@Entity()
export class DivisionsEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'class_id', type: 'uuid' })
  classId: string;

  @ManyToOne(() => ClassEntity, (cls) => cls.divisions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'class_id' })
  class: ClassEntity;

  @OneToMany(() => ClassTeachersEntity, (classTeacher) => classTeacher.division)
  classTeachers: ClassTeachersEntity[];

  @OneToMany(
    () => StudentEnrollmentsEntity,
    (studentEnrollments) => studentEnrollments.division,
  )
  studentEnrollments: StudentEnrollmentsEntity[];
}
