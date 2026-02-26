import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarksEntity } from 'src/db/entities/marks.entity';
import { Repository } from 'typeorm';
import {
  AverageMarksDTO,
  CreateMarkDTO,
  GetMarksQueryDTO,
  UpdateMarkDTO,
} from '../dto/mark.dto';
import { ClassEntity } from 'src/db/entities/class.entity';
import { EnumStatus } from 'src/types/enum/app_enum';

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(MarksEntity)
    private readonly marksRepository: Repository<MarksEntity>,
    @InjectRepository(ClassEntity)
    private readonly classRepository: Repository<ClassEntity>,
  ) {}

  async getAllMarks(query: GetMarksQueryDTO) {
    const qb = this.marksRepository.createQueryBuilder('mark');

    qb.orderBy(`mark.${query.sortBy || 'examId'}`, query.sortOrder || 'ASC');

    return qb.getMany();
  }

  async listGenderByGrade() {
    const qb = await this.classRepository
      .createQueryBuilder('class')
      .leftJoin('class.divisions', 'division')
      .leftJoin('division.studentEnrollments', 'enrollment')
      .leftJoin('enrollment.student', 'student')
      .select('class.grade', 'grade')
      .addSelect("COUNT(CASE WHEN student.gender = 'MALE' THEN 1 END)", 'MALE')
      .addSelect(
        "COUNT(CASE WHEN student.gender = 'FEMALE' THEN 1 END)",
        'FEMALE',
      )
      .groupBy('class.grade')
      .orderBy('class.grade', 'ASC')
      .getRawMany();

    return qb;
  }

  async calculateAverageMarks(payload: AverageMarksDTO) {
    const qb = await this.classRepository
      .createQueryBuilder('class')
      .leftJoin('class.divisions', 'division')
      .leftJoin('division.studentEnrollments', 'enrollment')
      .leftJoin('enrollment.student', 'student')
      .innerJoin('student.marks', 'mark')
      .innerJoin('mark.subject', 'subject')
      .where('class.grade = :grade', { grade: Number(payload.grade) })
      .andWhere('division.name = :division', { division: payload.division })
      .andWhere('enrollment.status = :status', { status: EnumStatus.ACTIVE })
      .select('subject.name', 'subject')
      .addSelect('AVG(mark.marks_obtained)', 'average')
      .groupBy('subject.id')
      .addGroupBy('subject.name')
      .getRawMany();

    return qb.map((item) => ({
      subject: item.subject,
      average: parseFloat(item.average) || 0,
    }));
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
