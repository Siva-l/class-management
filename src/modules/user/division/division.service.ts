import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DivisionsEntity } from 'src/db/entities/divisions.entity';
import { Repository } from 'typeorm';
import {
  CreateDivisionDTO,
  GetDivisionsQueryDTO,
  UpdateDivisionDTO,
} from '../dto/division.dto';

@Injectable()
export class DivisionService {
  constructor(
    @InjectRepository(DivisionsEntity)
    private readonly divisionRepository: Repository<DivisionsEntity>,
  ) {}

  async getAllDivisions(query: GetDivisionsQueryDTO) {
    const qb = this.divisionRepository.createQueryBuilder('division');
    if (query.search) {
      qb.where('division.name ILIKE :search', {
        search: `%${query.search}%`,
      });
    }

    qb.orderBy(`division.${query.sortBy || 'name'}`, query.sortOrder || 'ASC');

    return qb.getMany();
  }

  async createDivision(payload: CreateDivisionDTO) {
    const existingDivision = await this.divisionRepository.exists({
      where: { name: payload.name },
    });

    if (existingDivision) {
      throw new BadRequestException('Division already exists');
    }

    const createdDivision = await this.divisionRepository.save(payload);

    return createdDivision;
  }

  async updateDivision(
    divisionId: string,
    payload: UpdateDivisionDTO,
  ): Promise<DivisionsEntity> {
    const division = await this.divisionRepository.findOne({
      where: { id: divisionId },
    });

    if (!division) {
      throw new BadRequestException('Division not found');
    }

    const updatedDivision = await this.divisionRepository.save({
      ...division,
      ...payload,
    });

    return updatedDivision;
  }

  async deleteDivision(divisionId: string): Promise<{ message: string }> {
    const division = await this.divisionRepository.findOne({
      where: { id: divisionId },
    });

    if (!division) {
      throw new BadRequestException('Division not found');
    }

    await this.divisionRepository.delete({ id: divisionId });

    return { message: 'Division deleted successfully.' };
  }
}
