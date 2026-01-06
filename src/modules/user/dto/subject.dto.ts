import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateSubjectDTO {
  @IsString()
  name: string;

  @IsString()
  code: string;
}

export class UpdateSubjectDTO extends PartialType(CreateSubjectDTO) {}
