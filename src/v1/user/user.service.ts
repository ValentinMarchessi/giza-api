import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  byId(id: string) {
    return this.userModel.findByPk(id);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByPk(id).then((user) => {
      if (!user) {
        throw new HttpException(
          `User id ${id} not found`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return user.update(updateUserDto);
    });
  }

  async remove(id: string) {
    return this.userModel.findByPk(id).then(async (user) => {
      if (!user) throw new BadRequestException();

      await user.destroy();
    });
  }
}
