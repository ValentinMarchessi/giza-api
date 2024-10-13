import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigModule } from '@nestjs/config';

const app_config = {
  port: process.env.PORT ?? 3000,
  env: process.env.NODE_ENV ?? 'development',
  prefix: 'v1',
  swagger: {
    path: 'api',
    title: 'Giza',
    version: '1.0',
    tag: 'giza',
  },
};

async function bootstrap() {
  await ConfigModule.envVariablesLoaded;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(app_config.prefix);
  app.useGlobalPipes(new ValidationPipe());
  const swaggerConfig = new DocumentBuilder()
    .setTitle(app_config.swagger.title)
    .setVersion(app_config.swagger.version)
    .addTag(app_config.swagger.tag)
    .build();
  SwaggerModule.setup(
    app_config.swagger.path,
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );

  await app.listen(app_config.port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
