import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDivisionDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  classId: string;
}

export class UpdateDivisionDTO extends PartialType(CreateDivisionDTO) {}

export class GetDivisionsQueryDTO {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['name', 'classId'])
  sortBy?: 'name' | 'classId';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
