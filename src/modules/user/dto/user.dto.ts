import { EnumGender } from 'src/types/enum/app_enum';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateStudentDTO {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  admissionNumber?: string;

  @IsString()
  @IsNotEmpty()
  dob?: string;

  @IsString()
  @IsEnum(EnumGender)
  @IsNotEmpty()
  gender?: EnumGender;

  @IsString()
  @IsNotEmpty()
  phone?: string;
}

export class UpdateStudentDTO extends PartialType(CreateStudentDTO) {}
