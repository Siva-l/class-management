import { AuthGuard } from '@nestjs/passport';

export class localUserGuard extends AuthGuard('local') {}
