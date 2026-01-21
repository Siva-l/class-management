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
import { SubjectService } from './subject.service';
import {
  CreateSubjectDTO,
  GetSubjectsQueryDTO,
  UpdateSubjectDTO,
} from '../dto/subject.dto';
import { UserAuthGuard } from 'src/guards/user_auth.guards';
import { ResponseTransformInterceptor } from 'src/injectors/response.injectors';

@Controller('subjects')
@UseGuards(UserAuthGuard)
@UseInterceptors(ResponseTransformInterceptor)
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  async getAllSubjects(@Query() query: GetSubjectsQueryDTO) {
    return this.subjectService.getAllSubjects(query);
  }

  @Post('/create')
  async createSubject(@Body() payload: CreateSubjectDTO) {
    return this.subjectService.createSubject(payload);
  }

  @Get(':subjectId')
  async getSubjectById(@Param('subjectId') subjectId: string) {
    return this.subjectService.getSubjectById(subjectId);
  }

  @Put(':subjectId')
  async updateSubject(
    @Param('subjectId') subjectId: string,
    @Body() payload: UpdateSubjectDTO,
  ) {
    return this.subjectService.updateSubject(subjectId, payload);
  }

  @Delete(':subjectId')
  async deleteSubject(@Param('subjectId') subjectId: string) {
    return this.subjectService.deleteSubject(subjectId);
  }
}
