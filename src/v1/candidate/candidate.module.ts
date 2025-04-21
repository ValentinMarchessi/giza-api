import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Candidate } from './entities/candidate.model';

@Module({
  imports: [SequelizeModule.forFeature([Candidate])],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
