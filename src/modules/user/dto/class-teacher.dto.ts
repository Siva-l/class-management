import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClassTeacherDTO {
  @IsString()
  @IsNotEmpty()
  divisionId: string;

  @IsString()
  @IsNotEmpty()
  teacherId: string;
}

export class UpdateClassTeacherDTO extends PartialType(CreateClassTeacherDTO) {}

export class GetClassTeachersQueryDTO {
  @IsOptional()
  @IsIn(['divisionId', 'teacherId'])
  sortBy?: 'divisionId' | 'teacherId';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}
