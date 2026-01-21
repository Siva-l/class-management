import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassTeachersEntity } from 'src/db/entities/class_teachers.entity';
import { Repository } from 'typeorm';
import {
  CreateClassTeacherDTO,
  GetClassTeachersQueryDTO,
  UpdateClassTeacherDTO,
} from '../dto/class-teacher.dto';

@Injectable()
export class ClassTeacherService {
  constructor(
    @InjectRepository(ClassTeachersEntity)
    private readonly classTeacherRepository: Repository<ClassTeachersEntity>,
  ) {}

  async getAllClassTeachers(query: GetClassTeachersQueryDTO) {
    const qb = this.classTeacherRepository.createQueryBuilder('classTeacher');

    qb.orderBy(
      `classTeacher.${query.sortBy || 'divisionId'}`,
      query.sortOrder || 'ASC',
    );

    return qb.getMany();
  }

  async createClassTeacher(payload: CreateClassTeacherDTO) {
    const classTeacherExist = await this.classTeacherRepository.exists({
      where: { divisionId: payload.divisionId, teacherId: payload.teacherId },
    });

    if (classTeacherExist) {
      throw new BadRequestException('Class teacher already exists');
    }

    const createClassTeacher = await this.classTeacherRepository.save(payload);

    return createClassTeacher;
  }

  async updateClassTeacher(
    classTeacherId: string,
    payload: UpdateClassTeacherDTO,
  ) {
    const classTeacher = await this.classTeacherRepository.findOne({
      where: { id: classTeacherId },
    });

    if (!classTeacher) {
      throw new BadRequestException('Class teacher not found');
    }

    const updatedClassTeacher = await this.classTeacherRepository.save({
      ...classTeacher,
      ...payload,
    });

    return updatedClassTeacher;
  }

  async deleteClassTeacher(classTeacherId: string) {
    const classTeacher = await this.classTeacherRepository.findOne({
      where: { id: classTeacherId },
    });

    if (!classTeacher) {
      throw new BadRequestException('Class teacher not found');
    }

    await this.classTeacherRepository.delete({ id: classTeacherId });

    return { message: 'Class teacher deleted successfully.' };
  }
}
