import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateStudentDTO,
  GetStudentsQueryDTO,
  UpdateStudentDTO,
} from '../dto/student.dto';
import { StudentsEntity } from 'src/db/entities/students.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, PaginationResult } from 'src/types/utils/paginate.utils';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentsEntity)
    private readonly studentsRepository: Repository<StudentsEntity>,
  ) {}

  async getAllStudents(
    query: GetStudentsQueryDTO,
  ): Promise<PaginationResult<StudentsEntity>> {
    const qb = this.studentsRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.studentEnrollments', 'enrollment')
      .leftJoinAndSelect('enrollment.division', 'division')
      .leftJoinAndSelect('division.class', 'class')
      .select([
        'student.id',
        'student.name',
        'student.admissionNo',
        'student.dob',
        'student.gender',
        'student.phone',
        'student.createdAt',
        'student.updatedAt',
      ]);
    if (query.search) {
      qb.where('student.name ILIKE :search', {
        search: `%${query.search}%`,
      });
    }

    qb.orderBy(
      `student.${query.sortBy || 'admissionNo'}`,
      query.sortOrder ?? 'ASC',
    );

    return paginate(qb, query);
  }

  async createStudent(payload: CreateStudentDTO): Promise<StudentsEntity> {
    const existingUser = await this.studentsRepository.exists({
      where: { admissionNo: payload.admissionNo },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const student = this.studentsRepository.save(payload);

    return student;
  }

  async getStudentById(studentId: string): Promise<StudentsEntity> {
    const qb = this.studentsRepository
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.studentEnrollments', 'enrollment')
      .leftJoinAndSelect('enrollment.division', 'division')
      .leftJoinAndSelect('division.class', 'class')
      .leftJoinAndSelect('student.marks', 'marks')
      .leftJoinAndSelect('marks.exam', 'exam')
      .where('student.id = :studentId', { studentId })
      .select([
        'student.id',
        'student.name',
        'student.admissionNo',
        'student.dob',
        'student.gender',
        'student.phone',
        'student.createdAt',
        'student.updatedAt',
      ]);

    const student = await qb.getOne();

    if (!student) {
      throw new BadRequestException('Student not found');
    }

    return student;
  }

  async updateStudent(
    studentId: string,
    payload: UpdateStudentDTO,
  ): Promise<StudentsEntity> {
    const student = await this.studentsRepository.findOne({
      where: { id: studentId },
    });

    if (!student) {
      throw new BadRequestException('Student not found');
    }

    const updatedStudent = await this.studentsRepository.save({
      ...student,
      ...payload,
    });

    return updatedStudent;
  }

  async deleteStudent(studentId: string): Promise<{ message: string }> {
    const student = await this.studentsRepository.findOne({
      where: { id: studentId },
    });

    if (!student) {
      throw new BadRequestException('Student not found');
    }

    await this.studentsRepository.delete({ id: studentId });

    return { message: 'Student deleted successfully.' };
  }
}
