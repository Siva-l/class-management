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
import { Body, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateStudentDTO,
  GetStudentsQueryDTO,
  UpdateStudentDTO,
} from '../dto/student.dto';
import { ResponseTransformInterceptor } from 'src/injectors/response.injectors';
import { UserAuthGuard } from 'src/guards/user_auth.guards';

@Controller('students')
// @UseGuards(UserAuthGuard)
@UseInterceptors(ResponseTransformInterceptor)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async getAllStudents(@Query() query: GetStudentsQueryDTO) {
    return this.studentService.getAllStudents(query);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  async createStudent(
    @Body() payload: CreateStudentDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.studentService.createStudent(payload, file);
  }

  @Get(':studentId')
  async getStudentById(@Param('studentId') studentId: string) {
    return this.studentService.getStudentById(studentId);
  }

  @Put(':studentId')
  @UseInterceptors(FileInterceptor('file'))
  async updateStudent(
    @Param('studentId') studentId: string,
    @Body() payload: UpdateStudentDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.studentService.updateStudent(studentId, payload, file);
  }

  @Delete(':studentId')
  async deleteStudent(@Param('studentId') studentId: string) {
    return this.studentService.deleteStudent(studentId);
  }

  @Post('upload-image/:studentId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadStudentProfileImage(
    @Param('studentId') studentId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.studentService.uploadStudentProfileImage(studentId, file);
  }
}
