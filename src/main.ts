import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not defined in DTOs
      transform: true, // Transform payloads to DTO instances
      forbidNonWhitelisted: true, // Throw errors for non-whitelisted properties
      transformOptions: {
        enableImplicitConversion: true, // Automatically convert primitive types
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on port ${process.env.PORT}`);
}
bootstrap().catch((err) => {
  if (err) {
    console.log('hit error');
    console.error(err);
    process.exit(1);
  }
});
