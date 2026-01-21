import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { ResponseTransformInterceptor } from 'src/injectors/response.injectors';
import { CreateTeacherDTO, GetTeachersQueryDTO } from '../dto/teacher.dto';
import { UserAuthGuard } from 'src/guards/user_auth.guards';

@Controller('teachers')
@UseGuards(UserAuthGuard)
@UseInterceptors(ResponseTransformInterceptor)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Get()
  async getAllTeachers(@Query() query: GetTeachersQueryDTO) {
    return this.teacherService.getAllTeachers(query);
  }

  @Get(':teacherId')
  async getTeacherById(@Param('teacherId') teacherId: string) {
    return this.teacherService.getTeacherById(teacherId);
  }

  @Post('/create')
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
