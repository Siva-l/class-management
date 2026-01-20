import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { TeacherModule } from '../teacher/teacher.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TeacherModule],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
