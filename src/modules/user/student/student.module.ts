import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { AuthModule } from '../auth/auth.module';
import { TeacherModule } from '../teacher/teacher.module';
import { FileService } from 'src/services/file.service';

@Module({
  imports: [AuthModule, TeacherModule],
  controllers: [StudentController],
  providers: [StudentService, FileService],
  exports: [StudentService],
})
export class StudentModule {}
