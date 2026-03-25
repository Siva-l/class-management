import { EnumGender } from 'src/types/enum/app_enum';
import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { PaginationDTO } from './pagination.dto';

export class CreateStudentDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  admissionNo: string;

  @IsString()
  @IsNotEmpty()
  dob: string;

  @IsString()
  @IsEnum(EnumGender)
  @IsNotEmpty()
  gender: EnumGender;

  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class UpdateStudentDTO extends PartialType(CreateStudentDTO) {}

export class GetStudentsQueryDTO extends PaginationDTO {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(EnumGender)
  gender?: EnumGender;

  @IsOptional()
  @IsIn(['name', 'admissionNo', 'gender'])
  sortBy?: 'name' | 'admissionNo' | 'gender';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
