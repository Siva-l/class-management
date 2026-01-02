import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface MResponse<T> {
  statusCode: number;
  timestamp: Date;
  data: T;
  success: boolean;
}

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<
  T,
  MResponse<T>
> {
  private readonly logger = new Logger();

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<MResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          timestamp: new Date(),
          statusCode: context.switchToHttp().getResponse().statusCode,
          success: true,
          data,
        };
      }),
      catchError((err: HttpException) =>
        throwError(() => this.errorResponse(err, context)),
      ),
    );
  }

  errorResponse(exception: HttpException, context: ExecutionContext) {
    console.log('exception :>> ', exception);
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage = exception['response']
      ? exception['response']['message']
      : exception.message;
    this.logger.error(errorMessage);
    response.status(status).json({
      success: false,
      statusCode: status,
      message: errorMessage,
    });
  }
}
