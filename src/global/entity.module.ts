import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsEntity } from 'src/db/entities/students.entity';
import { TeachersEntity } from 'src/db/entities/teachers.entity';

const registeredEntities = [StudentsEntity, TeachersEntity];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(registeredEntities)],
  exports: [TypeOrmModule.forFeature(registeredEntities)],
})
export class EntityModule {}
