import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  ParseUUIDPipe,
  HttpStatus,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { AuthUser } from '../auth/auth.decorator';
import { AuthUserJWT } from '../auth/jwt.strategy';
import { UserEntity } from './entities/user.entity';

const { CREATED, BAD_REQUEST } = HttpStatus;

const UUIDV4 = new ParseUUIDPipe({ version: '4' });
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findOne(@AuthUser() { id }: AuthUserJWT) {
    const user = await this.userService.byId(id);
    if (!user) throw new HttpException('User not found', BAD_REQUEST);
    return new UserEntity(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch()
  async update(
    @AuthUser() { id }: AuthUserJWT,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new UserEntity(await this.userService.update(id, updateUserDto));
  }

  @Delete()
  remove(@AuthUser() { id }: AuthUserJWT) {
    return this.userService.remove(id);
  }
}
