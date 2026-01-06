import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseInterceptors } from '@nestjs/common';
import { ResponseTransformInterceptor } from 'src/injectors/response.injectors';
import { LoginTeacherDTO } from '../dto/auth.dto';

@Controller('auth')
@UseInterceptors(ResponseTransformInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() payload: LoginTeacherDTO) {
    return this.authService.login(payload.email, payload.password);
  }
}
