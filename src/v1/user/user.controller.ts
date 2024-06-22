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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { AuthUser } from '../auth/auth.decorator';

const { CREATED } = HttpStatus;

const UUIDV4 = new ParseUUIDPipe({ version: '4' });
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findOne(@AuthUser() user: any) {
    console.log(user);
    return this.userService.findOne(+user.id);
  }

  @Patch(':id')
  update(
    @Param('id', UUIDV4) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', UUIDV4) id: string) {
    return this.userService.remove(+id);
  }
}
