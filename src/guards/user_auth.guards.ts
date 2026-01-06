import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../modules/user/users/users.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
  // This is a mock implementation for demonstration purposes
  // In a real application, you would inject services like JwtService

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    try {
      // 1. Extract the token from the Authorization header
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('No authorization token provided');
      }

      // 2. Validate the token (mock implementation)
      const user = await this.validateToken(token);

      // 3. Attach the user to the request object for controllers to use
      request['user'] = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Unauthorized access');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async validateToken(token: string) {
    // This is a mock implementation
    // In a real application, you would verify the JWT token using a service

    // For demonstration, we'll validate a mock user token
    const tokenPayload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET'),
    });

    //   const user = await this.userService.getUserById(tokenPayload['userId']);

    //   if (!user) {
    //     throw new UnauthorizedException('Invalid token');
    //   }
    //   return user;
    // }
    return tokenPayload;
  }
}
