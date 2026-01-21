import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { AuthModule } from '../auth/auth.module';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [AuthModule, TeacherModule],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
