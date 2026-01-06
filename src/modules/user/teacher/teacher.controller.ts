import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { ResponseTransformInterceptor } from 'src/injectors/response.injectors';
import { CreateTeacherDTO } from '../dto/teacher.dto';
import { UserAuthGuard } from 'src/guards/user_auth.guards';

@Controller('teachers')
@UseGuards(UserAuthGuard)
@UseInterceptors(ResponseTransformInterceptor)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  async getAllTeachers() {
    return this.teacherService.getAllTeachers();
  }

  @Get(':teacherId')
  async getTeacherById(@Param('teacherId') teacherId: string) {
    return this.teacherService.getTeacherById(teacherId);
  }

  @Post('create-teacher')
  async createTeacher(@Body() payload: CreateTeacherDTO) {
    return this.teacherService.createTeacher(payload);
  }

  @Put(':teacherId')
  async updateTeacher(
    @Param('teacherId') teacherId: string,
    @Body() payload: CreateTeacherDTO,
  ) {
    return this.teacherService.updateTeacher(teacherId, payload);
  }

  @Delete(':teacherId')
  async deleteTeacher(@Param('teacherId') teacherId: string) {
    return this.teacherService.deleteTeacher(teacherId);
  }
}
