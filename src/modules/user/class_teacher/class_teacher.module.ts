import { Module } from '@nestjs/common';
import { ClassTeacherService } from './class_teacher.service';
import { ClassTeacherController } from './class_teacher.controller';
import { AuthModule } from '../auth/auth.module';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [AuthModule, TeacherModule],
  controllers: [ClassTeacherController],
  providers: [ClassTeacherService],
})
export class ClassTeacherModule {}
