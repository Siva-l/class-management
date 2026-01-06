import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsEntity } from 'src/db/entities/students.entity';
import { TeachersEntity } from 'src/db/entities/teachers.entity';
import { SubjectsEntity } from 'src/db/entities/subjects.entity';

const registeredEntities = [StudentsEntity, TeachersEntity, SubjectsEntity];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(registeredEntities)],
  exports: [TypeOrmModule.forFeature(registeredEntities)],
})
export class EntityModule {}
