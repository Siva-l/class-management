import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { EnumGrade } from '../../types/enum/app_enum';
import { StudentsEntity } from './students.entity';
import { SubjectsEntity } from './subjects.entity';
import { ExamEntity } from './exams.entity';

@Entity('marks')
export class MarksEntity extends BaseEntity {
  @Column({ name: 'exam_id', type: 'uuid' })
  examId: string;

  @Column({ name: 'subject_id', type: 'uuid' })
  subjectId: string;

  @Column({ name: 'student_id', type: 'uuid' })
  studentId: string;

  @Column({ name: 'marks_obtained', type: 'int' })
  marksObtained: number;

  @Column({ name: 'is_absent', type: 'boolean' })
  isAbsent: boolean;

  @Column({ name: 'grade', type: 'enum', enum: EnumGrade })
  grade: EnumGrade;

  @Column({ name: 'remarks', type: 'varchar', nullable: true })
  remarks: string;

  @ManyToOne(() => StudentsEntity, (student) => student.marks)
  student: StudentsEntity;

  @ManyToOne(() => SubjectsEntity, (subject) => subject.marks)
  subject: SubjectsEntity;

  @ManyToOne(() => ExamEntity, (exam) => exam.marks)
  exam: ExamEntity;
}
