import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateExamDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateExamDTO extends PartialType(CreateExamDTO) {}

export class GetExamsQueryDTO {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['name'])
  sortBy?: 'name';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
