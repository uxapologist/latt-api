import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * add Swagger documentation for endpoints
   */
  const options = new DocumentBuilder()
    .setTitle('Distilled Paths API')
    .setDescription('REST API for Distilled Paths application')
    .setVersion('1.0')
    .addTag('paths')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(process.env.PORT || 3000);

  Logger.log(`Distilled Paths API Server is running on http://localhost:${port}`, 'App Bootstrap');
}
bootstrap();
