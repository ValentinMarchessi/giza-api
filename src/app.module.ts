import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './v1/user/user.module';
import { CandidateModule } from './v1/candidate/candidate.module';

@Module({
  imports: [UserModule, CandidateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
