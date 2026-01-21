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
import { ExamService } from './exam.service';
import { UserAuthGuard } from 'src/guards/user_auth.guards';
import { ResponseTransformInterceptor } from 'src/injectors/response.injectors';
import {
  CreateExamDTO,
  GetExamsQueryDTO,
  UpdateExamDTO,
} from '../dto/exam.dto';

@Controller('exam')
@UseGuards(UserAuthGuard)
@UseInterceptors(ResponseTransformInterceptor)
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  async getExams(@Query() query: GetExamsQueryDTO) {
    return this.examService.getExams(query);
  }

  @Post('/create')
  async createExam(@Body() payload: CreateExamDTO) {
    return this.examService.createExam(payload);
  }

  @Put(':examId')
  async updateExam(
    @Param('examId') examId: string,
    @Body() payload: UpdateExamDTO,
  ) {
    return this.examService.updateExam(examId, payload);
  }

  @Delete(':examId')
  async deleteExam(@Param('examId') examId: string) {
    return this.examService.deleteExam(examId);
  }
}
