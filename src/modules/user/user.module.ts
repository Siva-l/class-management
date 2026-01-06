import { Module } from '@nestjs/common';
import { TeacherModule } from './teacher/teacher.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, TeacherModule, AuthModule],
  controllers: [],
  providers: [],
})
export class UserModule {}
