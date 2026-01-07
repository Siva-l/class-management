import { Module } from '@nestjs/common';
import { TeacherModule } from './teacher/teacher.module';
import { AuthModule } from './auth/auth.module';
import { SubjectModule } from './subject/subject.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [StudentModule, TeacherModule, AuthModule, SubjectModule],
  controllers: [],
  providers: [],
})
export class UserModule {}
