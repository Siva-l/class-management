import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/;
const passwordMessage =
  'Password must be at least 7 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.';

export class CreateTeacherDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @Matches(passwordRegex, { message: passwordMessage })
  password?: string;
}

export class UpdateTeacherDTO extends PartialType(CreateTeacherDTO) {}
