import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import {
  CreateStudentDTO,
  GetStudentsQueryDTO,
  UpdateStudentDTO,
} from '../dto/student.dto';
import { ResponseTransformInterceptor } from 'src/injectors/response.injectors';
import { UserAuthGuard } from 'src/guards/user_auth.guards';

@Controller('students')
@UseGuards(UserAuthGuard)
@UseInterceptors(ResponseTransformInterceptor)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async getAllStudents(@Query() query: GetStudentsQueryDTO) {
    return this.studentService.getAllStudents(query);
  }

  @Post('create-student')
  async createStudent(@Body() payload: CreateStudentDTO) {
    return this.studentService.createStudent(payload);
  }

  @Get(':studentId')
  async getStudentById(@Param('studentId') studentId: string) {
    return this.studentService.getStudentById(studentId);
  }

  @Put(':studentId')
  async updateStudent(
    @Param('studentId') studentId: string,
    @Body() payload: UpdateStudentDTO,
  ) {
    return this.studentService.updateStudent(studentId, payload);
  }

  @Delete(':studentId')
  async deleteStudent(@Param('studentId') studentId: string) {
    return this.studentService.deleteStudent(studentId);
  }
}
