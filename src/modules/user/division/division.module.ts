import { Module } from '@nestjs/common';
import { DivisionService } from './division.service';
import { DivisionController } from './division.controller';
import { AuthModule } from '../auth/auth.module';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [AuthModule, TeacherModule],
  controllers: [DivisionController],
  providers: [DivisionService],
})
export class DivisionModule {}
