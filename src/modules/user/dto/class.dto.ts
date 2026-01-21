import { PartialType } from '@nestjs/mapped-types';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateClassDTO {
  @IsNumber()
  @IsNotEmpty()
  grade: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateClassDTO extends PartialType(CreateClassDTO) {}

export class GetClassesQueryDTO {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['grade', 'description'])
  sortBy?: 'grade' | 'description';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
