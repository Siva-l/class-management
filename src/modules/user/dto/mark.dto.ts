import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMarkDTO {
  @IsString()
  @IsNotEmpty()
  examId: string;

  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @IsNumber()
  @IsNotEmpty()
  marksObtained: number;

  @IsBoolean()
  @IsNotEmpty()
  isAbsent: boolean;

  @IsString()
  @IsOptional()
  remarks?: string;
}

export class UpdateMarkDTO extends PartialType(CreateMarkDTO) {}

export class GetMarksQueryDTO {
  @IsOptional()
  sortBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
