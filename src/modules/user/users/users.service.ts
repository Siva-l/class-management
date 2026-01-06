import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDTO, UpdateStudentDTO } from '../dto/user.dto';
import { StudentsEntity } from 'src/db/entities/students.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnumGender } from 'src/types/enum/app_enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(StudentsEntity)
    private readonly studentsRepository: Repository<StudentsEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async getAllStudents(): Promise<StudentsEntity[]> {
    return this.studentsRepository.find();
  }

  async createStudent(payload: CreateStudentDTO): Promise<StudentsEntity> {
    const userExists = await this.studentsRepository.findOne({
      where: { phone: payload.phone, admission_no: payload.admissionNumber },
    });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const student = this.studentsRepository.save({
      name: payload.name,
      admission_no: payload.admissionNumber,
      dob: payload.dob,
      gender: payload.gender as EnumGender,
      phone: payload.phone,
    });

    return student;
  }

  async getStudentById(studentId: string): Promise<StudentsEntity> {
    const student = await this.studentsRepository.findOne({
      where: { id: studentId },
    });

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

    if (payload.phone || payload.admissionNumber) {
      const existingStudent = await this.studentsRepository.findOne({
        where: {
          phone: payload.phone ?? student.phone,
          admission_no: payload.admissionNumber ?? student.admission_no,
        },
      });

      if (existingStudent && existingStudent.id !== studentId) {
        throw new BadRequestException('Student already exists');
      }
    }

    const updatedStudent = this.studentsRepository.merge(student, {
      name: payload.name,
      admission_no: payload.admissionNumber,
      dob: payload.dob,
      gender: payload.gender as EnumGender,
      phone: payload.phone,
    });

    return this.studentsRepository.save(updatedStudent);
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
