import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { stringify } from 'yaml';

import { AppModule } from './app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Adding Swagger documentation for endpoints
   */
  const options = new DocumentBuilder()
    .setTitle('Latt REST API')
    .setDescription('REST API for Latt application')
    .setVersion('1.0')
    .addTag('paths')
    .addBearerAuth()
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  fs.writeFileSync('./resources/latt-oas.json', JSON.stringify(document, null, 2));
  const yamlString: string = stringify(document, {});
  fs.writeFileSync('./resources/latt-oas.yaml', yamlString);

  SwaggerModule.setup('/api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  // TODO disable or limit allowed origins eventually https://docs.nestjs.com/security/cors
  app.enableCors();

  await app.listen(process.env.PORT || 3000);

  Logger.log(`Latt API Server is running on http://localhost:${port}`, 'App Bootstrap');
}

bootstrap();
