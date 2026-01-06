import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectsEntity } from 'src/db/entities/subjects.entity';
import { CreateSubjectDTO, UpdateSubjectDTO } from '../dto/subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectsEntity)
    private readonly subjectsRepository: Repository<SubjectsEntity>,
  ) {}

  async getAllSubjects(): Promise<SubjectsEntity[]> {
    return this.subjectsRepository.find();
  }

  async createSubject(payload: CreateSubjectDTO): Promise<SubjectsEntity> {
    const subjectExist = await this.subjectsRepository.findOne({
      where: { name: payload.name },
    });

    if (subjectExist) {
      throw new BadRequestException('Subject already exists');
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
