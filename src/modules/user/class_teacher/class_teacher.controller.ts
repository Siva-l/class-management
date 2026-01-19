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
import { ClassTeacherService } from './class_teacher.service';
import {
  CreateClassTeacherDTO,
  GetClassTeachersQueryDTO,
  UpdateClassTeacherDTO,
} from '../dto/class-teacher.dto';
import { UserAuthGuard } from 'src/guards/user_auth.guards';
import { ResponseTransformInterceptor } from 'src/injectors/response.injectors';

@Controller('class-teacher')
@UseGuards(UserAuthGuard)
@UseInterceptors(ResponseTransformInterceptor)
export class ClassTeacherController {
  constructor(private readonly classTeacherService: ClassTeacherService) {}

  @Get()
  async getAllClassTeachers(@Query() query: GetClassTeachersQueryDTO) {
    return this.classTeacherService.getAllClassTeachers(query);
  }

  @Post('/create')
  async createClassTeacher(@Body() payload: CreateClassTeacherDTO) {
    return this.classTeacherService.createClassTeacher(payload);
  }

  @Put(':classTeacherId')
  async updateClassTeacher(
    @Param('classTeacherId') classTeacherId: string,
    @Body() payload: UpdateClassTeacherDTO,
  ) {
    return this.classTeacherService.updateClassTeacher(classTeacherId, payload);
  }

  @Delete(':classTeacherId')
  async deleteClassTeacher(@Param('classTeacherId') classTeacherId: string) {
    return this.classTeacherService.deleteClassTeacher(classTeacherId);
  }
}
