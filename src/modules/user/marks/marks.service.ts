import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarksEntity } from 'src/db/entities/marks.entity';
import { Repository } from 'typeorm';
import {
  CreateMarkDTO,
  GetMarksQueryDTO,
  UpdateMarkDTO,
} from '../dto/mark.dto';

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(MarksEntity)
    private readonly marksRepository: Repository<MarksEntity>,
  ) {}

  async getAllMarks(query: GetMarksQueryDTO) {
    const qb = this.marksRepository.createQueryBuilder('mark');

    qb.orderBy(`mark.${query.sortBy || 'examId'}`, query.sortOrder || 'ASC');

    return qb.getMany();
  }

  async createMark(payload: CreateMarkDTO) {
    const existingMark = await this.marksRepository.exists({
      where: {
        examId: payload.examId,
        studentId: payload.studentId,
        subjectId: payload.subjectId,
      },
    });

    if (existingMark) {
      throw new BadRequestException('Mark already exists');
    }

    const mark = this.marksRepository.create(payload);

    return this.marksRepository.save(mark);
  }

  async updateMark(markId: string, payload: UpdateMarkDTO) {
    const mark = await this.marksRepository.findOne({
      where: { id: markId },
    });

    if (!mark) {
      throw new BadRequestException('Mark not found');
    }

    Object.assign(mark, payload);

    const savedMark = await this.marksRepository.save(mark);

    return savedMark;
  }

  async deleteMark(markId: string) {
    const mark = await this.marksRepository.findOne({
      where: { id: markId },
    });

    if (!mark) {
      throw new BadRequestException('Mark not found');
    }

    await this.marksRepository.delete({ id: markId });

    return { message: 'Mark deleted successfully.' };
  }
}
