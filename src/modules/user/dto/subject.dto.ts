import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDTO } from './pagination.dto';

export class CreateSubjectDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}

export class UpdateSubjectDTO extends PartialType(CreateSubjectDTO) {}

export class GetSubjectsQueryDTO extends PaginationDTO {
  @IsOptional()
  @IsIn(['name', 'code'])
  sortBy?: 'name' | 'code';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';

  @IsString()
  @IsOptional()
  search?: string;
}
