import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeachersEntity } from 'src/db/entities/teachers.entity';
import { CreateTeacherDTO, UpdateTeacherDTO } from '../dto/teacher.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(TeachersEntity)
    private readonly teachersRepository: Repository<TeachersEntity>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async getAllTeachers(): Promise<TeachersEntity[]> {
    return this.teachersRepository.find();
  }

  async getTeacherById(teacherId: string): Promise<TeachersEntity> {
    const teacher = await this.teachersRepository.findOne({
      where: { id: teacherId },
    });
    if (!teacher) {
      throw new BadRequestException('Teacher not found');
    }
    return teacher;
  }

  async createTeacher(payload: CreateTeacherDTO): Promise<TeachersEntity> {
    const teacherExist = await this.teachersRepository.findOne({
      where: { phone: payload.phone },
    });

    if (teacherExist) {
      throw new BadRequestException('Teacher already exists');
    }

    const teacher = await this.teachersRepository.save({
      ...payload,
    });

    const { encryptedPassword: _, password: __, ...teacherInfo } = teacher;

    return teacherInfo;
  }

  async updateTeacher(
    teacherId: string,
    payload: UpdateTeacherDTO,
  ): Promise<TeachersEntity> {
    const teacher = await this.teachersRepository.findOne({
      where: { id: teacherId },
    });
    if (!teacher) {
      throw new BadRequestException('Teacher not found');
    }

    const updatedTeacher = await this.teachersRepository.save({
      ...teacher,
      ...payload,
    });

    const {
      encryptedPassword: _,
      password: __,
      ...teacherInfo
    } = updatedTeacher;

    return teacherInfo;
  }

  async deleteTeacher(teacherId: string): Promise<{ message: string }> {
    const teacher = await this.teachersRepository.findOne({
      where: { id: teacherId },
    });
    if (!teacher) {
      throw new BadRequestException('Teacher not found');
    }
    await this.teachersRepository.delete({ id: teacherId });
    return { message: 'Teacher deleted successfully.' };
  }
}
