import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from 'src/db/entities/class.entity';
import { Repository } from 'typeorm';
import {
  CreateClassDTO,
  GetClassesQueryDTO,
  UpdateClassDTO,
} from '../dto/class.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly classRepository: Repository<ClassEntity>,
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
