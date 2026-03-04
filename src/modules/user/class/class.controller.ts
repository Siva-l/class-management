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
import { ClassService } from './class.service';
import {
  CreateClassDTO,
  CreateClassWithSubjectsDTO,
  GetClassesQueryDTO,
  UpdateClassDTO,
} from '../dto/class.dto';
import { UserAuthGuard } from 'src/guards/user_auth.guards';
import { ResponseTransformInterceptor } from 'src/injectors/response.injectors';

@Controller('class')
@UseGuards(UserAuthGuard)
@UseInterceptors(ResponseTransformInterceptor)
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  async getAllClasses(@Query() query: GetClassesQueryDTO) {
    return this.classService.getAllClasses(query);
  }

  @Post('/create')
  async createClass(@Body() payload: CreateClassDTO) {
    return this.classService.createClass(payload);
  }

  @Post('/class-with-subjects')
  async createClassWithSubjects(@Body() payload: CreateClassWithSubjectsDTO) {
    return this.classService.createClassWithSubjects(payload);
  }

  @Put(':classId')
  async updateClass(
    @Param('classId') classId: string,
    @Body() payload: UpdateClassDTO,
  ) {
    return this.classService.updateClass(classId, payload);
  }

  @Delete(':classId')
  async deleteClass(@Param('classId') classId: string) {
    return this.classService.deleteClass(classId);
  }
}
