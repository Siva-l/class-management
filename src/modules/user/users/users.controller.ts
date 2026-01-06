import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { CreateStudentDTO, UpdateStudentDTO } from '../dto/user.dto';
import { ResponseTransformInterceptor } from 'src/injectors/response.injectors';
import { UserAuthGuard } from 'src/guards/user_auth.guards';

@Controller('users')
@UseGuards(UserAuthGuard)
@UseInterceptors(ResponseTransformInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllStudents() {
    return this.usersService.getAllStudents();
  }

  @Post('create-student')
  async createStudent(@Body() payload: CreateStudentDTO) {
    return this.usersService.createStudent(payload);
  }

  @Get(':studentId')
  async getStudentById(@Param('studentId') studentId: string) {
    return this.usersService.getStudentById(studentId);
  }

  @Put(':studentId')
  async updateStudent(
    @Param('studentId') studentId: string,
    @Body() payload: UpdateStudentDTO,
  ) {
    return this.usersService.updateStudent(studentId, payload);
  }

  @Delete(':studentId')
  async deleteStudent(@Param('studentId') studentId: string) {
    return this.usersService.deleteStudent(studentId);
  }
}
