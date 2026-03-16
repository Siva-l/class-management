import { Transform } from 'class-transformer';
import { IsPositive } from 'class-validator';

export class PaginationDTO {
  @IsPositive()
  @Transform(({ value }) => Number(value))
  page: number;

  @IsPositive()
  @Transform(({ value }) => Number(value))
  size: number;
}
