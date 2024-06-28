import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { APP_GUARD } from '@nestjs/core';
import { Auth, User, Candidate, Database } from './v1';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [Auth.Config.jwt],
    }),
    Database.Module,
    User.Module,
    Auth.Module,
    Candidate.Module,
  ],
  controllers: [AppController, Auth.Controller],
  providers: [
    AppService,
    Auth.Strategies.Local,
    Auth.Strategies.Jwt,
    { provide: APP_GUARD, useClass: Auth.Guards.Jwt },
    { provide: APP_GUARD, useClass: Auth.Guards.Roles },
  ],
})
export class AppModule {}
