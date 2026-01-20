import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectsEntity } from 'src/db/entities/subjects.entity';
import {
  CreateSubjectDTO,
  GetSubjectsQueryDTO,
  UpdateSubjectDTO,
} from '../dto/subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectsEntity)
    private readonly subjectsRepository: Repository<SubjectsEntity>,
  ) {}

  async getAllSubjects(query: GetSubjectsQueryDTO): Promise<SubjectsEntity[]> {
    const qb = this.subjectsRepository.createQueryBuilder('subject');

    if (query.search) {
      qb.where('subject.name ILIKE :search', {
        search: `%${query.search}%`,
      });
    }

    qb.orderBy(`subject.${query.sortBy || 'name'}`, query.sortOrder || 'ASC');

    return qb.getMany();
  }

  async createSubject(payload: CreateSubjectDTO): Promise<SubjectsEntity> {
    const subjectExist = await this.subjectsRepository.exists({
      where: [{ name: payload.name }, { code: payload.code }],
    });

    if (subjectExist) {
      throw new BadRequestException(
        `${payload.name} already exists with code ${payload.code}`,
      );
    }

    const subject = await this.subjectsRepository.save({
      name: payload.name,
      code: payload.code,
    });

    return subject;
  }

  async updateSubject(
    subjectId: string,
    payload: UpdateSubjectDTO,
  ): Promise<SubjectsEntity> {
    const subject = await this.subjectsRepository.findOne({
      where: { id: subjectId },
    });

    if (!subject) {
      throw new BadRequestException('Subject not found');
    }

    const updateSubject = Object.assign(subject, payload);

    return await this.subjectsRepository.save(updateSubject);
  }

  async getSubjectById(subjectId: string): Promise<SubjectsEntity> {
    const subject = await this.subjectsRepository.findOne({
      where: { id: subjectId },
    });

    if (!subject) {
      throw new BadRequestException('Subject not found');
    }

    return subject;
  }

  async deleteSubject(subjectId: string): Promise<{ message: string }> {
    const subject = await this.subjectsRepository.findOne({
      where: { id: subjectId },
    });

    if (!subject) {
      throw new BadRequestException('Subject not found');
    }

    await this.subjectsRepository.delete({ id: subjectId });

    return { message: 'Subject deleted successfully.' };
  }
}
