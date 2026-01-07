import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateSubjectDTO {
  @IsString()
  name: string;

  @IsString()
  code: string;
}

export class UpdateSubjectDTO extends PartialType(CreateSubjectDTO) {}

export class GetSubjectsQueryDTO {
  @IsOptional()
  @IsIn(['name', 'code'])
  sortBy?: 'name' | 'code';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';

  @IsOptional()
  search?: string;
}
