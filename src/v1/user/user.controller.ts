import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUser } from '../auth/decorators/auth.decorator';
import { AuthUserJWT } from '../auth/strategies/jwt.strategy';
import { UserEntity } from './entities/user.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';

const { BAD_REQUEST } = HttpStatus;
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Candidate)
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
