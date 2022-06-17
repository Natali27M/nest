import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const swaggerDescription = await fs.readFileSync(
      join(__dirname, '..', 'description.markdown')
  )
  const config = new DocumentBuilder()
    .setTitle('Nest')
    .setDescription(swaggerDescription.toString())
    .setVersion('1.0')
    .addTag('Okten')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap().then((r) => console.log(r));
