import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { AuthModule } from '../auth/auth.module';
import { EmailService } from 'src/services/email.service';

@Module({
  imports: [AuthModule],
  controllers: [TeacherController],
  providers: [TeacherService, EmailService],
  exports: [TeacherService],
})
export class TeacherModule {}
