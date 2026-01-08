import { Injectable, NotFoundException } from '@nestjs/common';
import { TeachersEntity } from 'src/db/entities/teachers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TeachersEntity)
    private readonly teacherRepo: Repository<TeachersEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const teacher = await this.teacherRepo.findOne({
      where: { email },
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    if (!teacher.encryptedPassword) {
      throw new UnauthorizedException('Password not set for this account');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      teacher.encryptedPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      teacherId: teacher.id,
      email: teacher.email,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      teacher: {
        teacherId: teacher.id,
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone,
      },
    };
  }
}
