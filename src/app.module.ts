import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './v1/user/user.module';
import { CandidateModule } from './v1/candidate/candidate.module';
import DatabaseModule from './v1/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { AuthModule } from './v1/auth/auth.module';
import { AuthController } from './v1/auth/auth.controller';
import jwtConfig from './v1/auth/config/jwt';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate, load: [jwtConfig] }),
    DatabaseModule,
    UserModule,
    AuthModule,
    CandidateModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
