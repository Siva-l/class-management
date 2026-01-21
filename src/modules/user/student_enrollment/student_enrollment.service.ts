import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEnrollmentsEntity } from 'src/db/entities/student_enrollments.entity';
import { Repository } from 'typeorm';
import {
  CreateStudentEnrollmentDTO,
  GetStudentEnrollmentsQueryDTO,
  UpdateStudentEnrollmentDTO,
} from '../dto/student-enrollment.dto';
import { EnumStatus } from 'src/types/enum/app_enum';

@Injectable()
export class StudentEnrollmentService {
  constructor(
    @InjectRepository(StudentEnrollmentsEntity)
    private readonly studentEnrollmentsRepository: Repository<StudentEnrollmentsEntity>,
  ) {}

  async getAllStudentEnrollments(query: GetStudentEnrollmentsQueryDTO) {
    const qb =
      this.studentEnrollmentsRepository.createQueryBuilder('studentEnrollment');

    qb.orderBy(
      `studentEnrollment.${query.sortBy || 'studentId'}`,
      query.sortOrder || 'ASC',
    );

    return qb.getMany();
  }

  async createStudentEnrollment(payload: CreateStudentEnrollmentDTO) {
    const existingStudentEnrollment =
      await this.studentEnrollmentsRepository.exists({
        where: { studentId: payload.studentId, divisionId: payload.divisionId },
      });

    if (existingStudentEnrollment) {
      throw new BadRequestException(
        'Student already enrolled in this division',
      );
    }

    const savedStudentEnrollment =
      this.studentEnrollmentsRepository.save(payload);

    return savedStudentEnrollment;
  }

  async updateStudentEnrollment(
    studentEnrollmentId: string,
    payload: UpdateStudentEnrollmentDTO,
  ) {
    const studentEnrollment = await this.studentEnrollmentsRepository.findOne({
      where: { id: studentEnrollmentId },
    });

    if (!studentEnrollment) {
      throw new BadRequestException('Student enrollment not found');
    }

    const updatedStudentEnrollment =
      await this.studentEnrollmentsRepository.save({
        ...studentEnrollment,
        ...payload,
      });

    return updatedStudentEnrollment;
  }

  async deleteStudentEnrollment(studentEnrollmentId: string) {
    const studentEnrollment = await this.studentEnrollmentsRepository.findOne({
      where: { id: studentEnrollmentId },
    });

    if (!studentEnrollment) {
      throw new BadRequestException('Student enrollment not found');
    }

    await this.studentEnrollmentsRepository.delete({ id: studentEnrollmentId });

    return { message: 'Student enrollment deleted successfully.' };
  }
}
