import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Candidate } from './entities/candidate.model';

@Injectable()
export class CandidateService {
  constructor(
    @InjectModel(Candidate)
    private candidateModel: typeof Candidate,
  ) {}

  create(createCandidateDto: CreateCandidateDto) {
    console.log('Creating Candidate: ', createCandidateDto);
    return 'This action adds a new candidate';
  }

  findAll() {
    return `This action returns all candidate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} candidate`;
  }

  update(id: number, updateCandidateDto: UpdateCandidateDto) {
    console.log('Updating Candidate: ', updateCandidateDto);
    return `This action updates a #${id} candidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} candidate`;
  }
}
