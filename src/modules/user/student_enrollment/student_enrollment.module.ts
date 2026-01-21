import { Module } from '@nestjs/common';
import { StudentEnrollmentService } from './student_enrollment.service';
import { StudentEnrollmentController } from './student_enrollment.controller';
import { AuthModule } from '../auth/auth.module';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [AuthModule, TeacherModule],
  controllers: [StudentEnrollmentController],
  providers: [StudentEnrollmentService],
})
export class StudentEnrollmentModule {}
