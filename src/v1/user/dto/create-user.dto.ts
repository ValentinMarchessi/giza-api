import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/v1/auth/roles.enum';
import { hash } from 'src/v1/auth/utils/encrypt';

export class CreateUserDto {
  @ApiProperty({ example: 'John_doe@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'p@ssw0rd' })
  @IsNotEmpty()
  @Transform(({ value }) => hash(value))
  password: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ enum: [Role.Candidate, Role.Company] })
  @IsEnum(Role)
  role: Role;
}
