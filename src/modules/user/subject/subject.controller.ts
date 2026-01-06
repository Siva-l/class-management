import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDTO, UpdateSubjectDTO } from '../dto/subject.dto';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  async getAllSubjects() {
    return this.subjectService.getAllSubjects();
  }

  @Post('create-subject')
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
