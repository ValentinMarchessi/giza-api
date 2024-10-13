import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../auth/decorators/auth.decorator';
import { UserEntity } from './entities/user.entity';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { AuthUserJWT } from '../auth/types/jwt';

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Candidate, Role.Company)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findOne(@User() { id }: AuthUserJWT) {
    return new UserEntity(await this.userService.findById(id));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch()
  async update(
    @User() { id }: AuthUserJWT,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new UserEntity(await this.userService.update(id, updateUserDto));
  }

  @Delete()
  remove(@User() { id }: AuthUserJWT) {
    return this.userService.remove(id);
  }
}
