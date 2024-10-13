import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.model';

@Injectable()
export class UserService {
  static readonly EXCEPTIONS = {
    NOT_FOUND: new BadRequestException('User not found'),
    UNAUTHORIZED: new UnauthorizedException(),
  };

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw UserService.EXCEPTIONS.NOT_FOUND;
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw UserService.EXCEPTIONS.NOT_FOUND;
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.findById(id).then((user) => user.update(updateUserDto));
  }

  async remove(id: string) {
    return this.findById(id).then((user) => user.destroy());
  }
}
