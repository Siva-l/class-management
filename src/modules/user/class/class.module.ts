import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { TeacherModule } from '../teacher/teacher.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TeacherModule],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
