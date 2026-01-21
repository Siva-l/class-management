import { PartialType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { EnumStatus } from 'src/types/enum/app_enum';

export class CreateStudentEnrollmentDTO {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  divisionId: string;

  @IsEnum(EnumStatus)
  @IsNotEmpty()
  status: EnumStatus;
}

export class UpdateStudentEnrollmentDTO extends PartialType(
  CreateStudentEnrollmentDTO,
) {}

export class GetStudentEnrollmentsQueryDTO {
  @IsOptional()
  @IsIn(['studentId', 'divisionId', 'status'])
  sortBy?: 'studentId' | 'divisionId' | 'status';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
