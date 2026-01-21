import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamEntity } from 'src/db/entities/exams.entity';
import { Repository } from 'typeorm';
import {
  CreateExamDTO,
  GetExamsQueryDTO,
  UpdateExamDTO,
} from '../dto/exam.dto';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,
  ) {}

  async getExams(query: GetExamsQueryDTO): Promise<ExamEntity[]> {
    const qb = this.examRepository.createQueryBuilder('exam');

    if (query.search) {
      qb.where('exam.name ILIKE :search', {
        search: `%${query.search}%`,
      });
    }

    qb.orderBy(`exam.${query.sortBy || 'name'}`, query.sortOrder || 'ASC');

    return qb.getMany();
  }

  async createExam(payload: CreateExamDTO) {
    const existingExam = await this.examRepository.exists({
      where: {
        name: payload.name,
      },
    });

    if (existingExam) {
      throw new BadRequestException('Exam already exists');
    }

    const exam = this.examRepository.save(payload);

    return exam;
  }

  async updateExam(examId: string, payload: UpdateExamDTO) {
    const exam = await this.examRepository.findOne({
      where: { id: examId },
    });

    if (!exam) {
      throw new BadRequestException('Exam not found');
    }

    const savedExam = await this.examRepository.save({
      ...exam,
      ...payload,
    });

    return savedExam;
  }

  async deleteExam(examId: string) {
    const exam = await this.examRepository.findOne({
      where: { id: examId },
    });

    if (!exam) {
      throw new BadRequestException('Exam not found');
    }

    await this.examRepository.delete({ id: examId });

    return { message: 'Exam deleted successfully.' };
  }
}
