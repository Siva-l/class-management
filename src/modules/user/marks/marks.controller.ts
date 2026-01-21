import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MarksService } from './marks.service';
import {
  CreateMarkDTO,
  GetMarksQueryDTO,
  UpdateMarkDTO,
} from '../dto/mark.dto';
import { UserAuthGuard } from 'src/guards/user_auth.guards';
import { ResponseTransformInterceptor } from 'src/injectors/response.injectors';

@Controller('marks')
@UseGuards(UserAuthGuard)
@UseInterceptors(ResponseTransformInterceptor)
export class MarksController {
  constructor(private readonly marksService: MarksService) {}

  @Get()
  async getAllMarks(query: GetMarksQueryDTO) {
    return this.marksService.getAllMarks(query);
  }

  @Post('/create')
  async createMark(@Body() payload: CreateMarkDTO) {
    return this.marksService.createMark(payload);
  }

  @Put(':markId')
  async updateMark(
    @Param('markId') markId: string,
    @Body() payload: UpdateMarkDTO,
  ) {
    return this.marksService.updateMark(markId, payload);
  }

  @Delete(':markId')
  async deleteMark(@Param('markId') markId: string) {
    return this.marksService.deleteMark(markId);
  }
}
