import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from 'src/db/entities/class.entity';
import { DataSource, Repository } from 'typeorm';
import { SubjectsEntity } from 'src/db/entities/subjects.entity';
import {
  CreateClassDTO,
  CreateClassWithSubjectsDTO,
  GetClassesQueryDTO,
  UpdateClassDTO,
} from '../dto/class.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classRepository: Repository<ClassEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async getAllClasses(query: GetClassesQueryDTO): Promise<ClassEntity[]> {
    const qb = this.classRepository.createQueryBuilder('class');
    if (query.search) {
      qb.where(
        '(CAST(class.grade AS TEXT) ILIKE :search OR class.description ILIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    qb.orderBy(`class.${query.sortBy || 'grade'}`, query.sortOrder || 'ASC');

    return qb.getMany();
  }

  async createClass(payload: CreateClassDTO): Promise<ClassEntity> {
    const existingClass = await this.classRepository.exists({
      where: { grade: payload.grade },
    });

    if (existingClass) {
      throw new BadRequestException('Class already exists');
    }

    const createClass = await this.classRepository.save(payload);

    return createClass;
  }

  async createClassWithSubjects(payload: CreateClassWithSubjectsDTO) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingClass = await queryRunner.manager.exists(ClassEntity, {
        where: { grade: payload.grade },
      });

      if (existingClass) {
        throw new BadRequestException('Class already exists');
      }

      const classEntity = queryRunner.manager.create(ClassEntity, {
        grade: payload.grade,
        description: payload.description,
      });

      const savedClass = await queryRunner.manager.save(classEntity);

      const subjectEntity = queryRunner.manager.create(SubjectsEntity, {
        name: payload.name,
        code: payload.code,
      });

      const savedSubject = await queryRunner.manager.save(subjectEntity);

      await queryRunner.commitTransaction();

      return {
        class: savedClass,
        subject: savedSubject,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async updateClass(
    classId: string,
    payload: UpdateClassDTO,
  ): Promise<ClassEntity> {
    const existingClass = await this.classRepository.findOne({
      where: { id: classId },
    });

    if (!existingClass) {
      throw new BadRequestException('Class not found');
    }

    const updatedClass = await this.classRepository.save({
      ...existingClass,
      ...payload,
    });

    return updatedClass;
  }

  async deleteClass(classId: string): Promise<{ message: string }> {
    const existingClass = await this.classRepository.findOne({
      where: { id: classId },
    });

    if (!existingClass) {
      throw new BadRequestException('Class not found');
    }

    await this.classRepository.delete({ id: classId });

    return { message: 'Class deleted successfully.' };
  }
}
