import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
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
  @JoinColumn({ name: 'student_id' })
  student: StudentsEntity;

  @ManyToOne(() => SubjectsEntity, (subject) => subject.marks)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectsEntity;

  @ManyToOne(() => ExamEntity, (exam) => exam.marks)
  @JoinColumn({ name: 'exam_id' })
  exam: ExamEntity;

  @BeforeInsert()
  @BeforeUpdate()
  calculateGrade() {
    if (this.isAbsent) {
      this.grade = EnumGrade.F;
      this.marksObtained = 0;
      return;
    }

    if (this.marksObtained >= 90) this.grade = EnumGrade.S;
    else if (this.marksObtained >= 80) this.grade = EnumGrade.A;
    else if (this.marksObtained >= 70) this.grade = EnumGrade.B;
    else if (this.marksObtained >= 60) this.grade = EnumGrade.C;
    else if (this.marksObtained >= 50) this.grade = EnumGrade.D;
    else this.grade = EnumGrade.F;
  }
}
