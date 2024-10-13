import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './entities/candidate.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CandidateService {
  constructor(
    @InjectModel(Candidate)
    private candidateModel: typeof Candidate,
  ) {}

  create(createCandidateDto: CreateCandidateDto) {
    return 'This action adds a new candidate';
    this.candidateModel
  }

  findAll() {
    return `This action returns all candidate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candidate`;
  }

  update(id: number, updateCandidateDto: UpdateCandidateDto) {
    return `This action updates a #${id} candidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} candidate`;
  }
}
