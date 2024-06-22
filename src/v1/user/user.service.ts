import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.model';
const bcrypt = require('bcrypt') as typeof import('bcrypt');

const HASH_SALT_ROUNDS = 5;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    return this.userModel.create({
      ...rest,
      password: await bcrypt.hash(password, HASH_SALT_ROUNDS),
    });
  }

  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userModel.findByPk(id).then((user) => {
      if (!user) {
        throw new HttpException(
          `User id ${id} not found`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return user.update(updateUserDto);
    });
  }

  async remove(id: number) {
    return this.userModel.findByPk(id).then((user) => {});
  }
}
