import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const registeredEntities = [];

@Global()
@Module({
  imports: [TypeOrmModule.forFeature(registeredEntities)],
  exports: [TypeOrmModule.forFeature(registeredEntities)],
})
export class EntityModule {}
