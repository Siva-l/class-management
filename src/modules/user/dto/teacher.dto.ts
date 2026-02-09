import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { PaginationDTO } from './pagination.dto';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/;
const passwordMessage =
  'Password must be at least 7 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.';

export class CreateTeacherDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Matches(passwordRegex, { message: passwordMessage })
  @IsNotEmpty()
  password: string;
}

export class UpdateTeacherDTO extends PartialType(CreateTeacherDTO) {}

export class GetTeachersQueryDTO extends PaginationDTO {
  @IsOptional()
  @IsIn(['name'])
  sortBy?: 'name';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';

  @IsString()
  @IsOptional()
  search?: string;
}
