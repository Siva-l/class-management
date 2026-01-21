import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DivisionService } from './division.service';
import { ResponseTransformInterceptor } from 'src/injectors/response.injectors';
import {
  CreateDivisionDTO,
  GetDivisionsQueryDTO,
  UpdateDivisionDTO,
} from '../dto/division.dto';
import { UserAuthGuard } from 'src/guards/user_auth.guards';

@Controller('division')
@UseGuards(UserAuthGuard)
@UseInterceptors(ResponseTransformInterceptor)
export class DivisionController {
  constructor(private readonly divisionService: DivisionService) {}

  @Get()
  async getAllDivisions(@Query() query: GetDivisionsQueryDTO) {
    return this.divisionService.getAllDivisions(query);
  }

  @Post('/create')
  async createDivision(@Body() payload: CreateDivisionDTO) {
    return this.divisionService.createDivision(payload);
  }

  @Put(':divisionId')
  async updateDivision(
    @Param('divisionId') divisionId: string,
    @Body() payload: UpdateDivisionDTO,
  ) {
    return this.divisionService.updateDivision(divisionId, payload);
  }

  @Delete(':divisionId')
  async deleteDivision(@Param('divisionId') divisionId: string) {
    return this.divisionService.deleteDivision(divisionId);
  }
}
