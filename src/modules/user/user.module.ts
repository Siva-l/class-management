import { Module } from '@nestjs/common';
import { TeacherModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';
import { SubjectModule } from './subject/subject.module';
import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';
import { DivisionModule } from './division/division.module';
import { ClassTeacherModule } from './class_teacher/class_teacher.module';
import { StudentEnrollmentModule } from './student_enrollment/student_enrollment.module';
import { MarksModule } from './marks/marks.module';
import { ExamModule } from './exam/exam.module';

@Module({
  imports: [
    StudentModule,
    TeacherModule,
    AuthModule,
    SubjectModule,
    ClassModule,
    DivisionModule,
    ClassTeacherModule,
    StudentEnrollmentModule,
    MarksModule,
    ExamModule,
  ],
  controllers: [],
  providers: [],
})
export class UserModule {}
