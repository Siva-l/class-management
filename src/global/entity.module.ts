import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsEntity } from 'src/db/entities/students.entity';
import { TeachersEntity } from 'src/db/entities/teachers.entity';
import { SubjectsEntity } from 'src/db/entities/subjects.entity';
import { DivisionsEntity } from 'src/db/entities/divisions.entity';
import { ClassEntity } from 'src/db/entities/class.entity';
import { StudentEnrollmentsEntity } from 'src/db/entities/student_enrollments.entity';
import { MarksEntity } from 'src/db/entities/marks.entity';
import { ExamEntity } from 'src/db/entities/exams.entity';
import { ClassTeachersEntity } from 'src/db/entities/class_teachers.entity';

const registeredEntities = [
  StudentsEntity,
  TeachersEntity,
  SubjectsEntity,
  DivisionsEntity,
  ClassEntity,
  StudentEnrollmentsEntity,
  MarksEntity,
  ExamEntity,
  ClassTeachersEntity,
];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(registeredEntities)],
  exports: [TypeOrmModule.forFeature(registeredEntities)],
})
export class EntityModule {}
