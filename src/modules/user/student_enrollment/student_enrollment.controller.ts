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
import { StudentEnrollmentService } from './student_enrollment.service';
import { UserAuthGuard } from 'src/guards/user_auth.guards';
import { ResponseTransformInterceptor } from 'src/injectors/response.injectors';
import {
  CreateStudentEnrollmentDTO,
  GetStudentEnrollmentsQueryDTO,
  UpdateStudentEnrollmentDTO,
} from '../dto/student-enrollment.dto';

@Controller('student-enrollment')
@UseGuards(UserAuthGuard)
@UseInterceptors(ResponseTransformInterceptor)
export class StudentEnrollmentController {
  constructor(
    private readonly studentEnrollmentService: StudentEnrollmentService,
  ) {}

  @Get()
  async getAllStudentEnrollments(
    @Query() query: GetStudentEnrollmentsQueryDTO,
  ) {
    return this.studentEnrollmentService.getAllStudentEnrollments(query);
  }

  @Post('/create')
  async createStudentEnrollment(@Body() payload: CreateStudentEnrollmentDTO) {
    return this.studentEnrollmentService.createStudentEnrollment(payload);
  }

  @Put(':studentEnrollmentId')
  async updateStudentEnrollment(
    @Param('studentEnrollmentId') studentEnrollmentId: string,
    @Body() payload: UpdateStudentEnrollmentDTO,
  ) {
    return this.studentEnrollmentService.updateStudentEnrollment(
      studentEnrollmentId,
      payload,
    );
  }

  @Delete(':studentEnrollmentId')
  async deleteStudentEnrollment(
    @Param('studentEnrollmentId') studentEnrollmentId: string,
  ) {
    return this.studentEnrollmentService.deleteStudentEnrollment(
      studentEnrollmentId,
    );
  }
}
