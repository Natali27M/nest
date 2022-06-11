import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'email' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ example: 'abc123', description: 'password' })
  @IsString()
  @Length(2, 10)
  @IsNotEmpty()
  readonly password: string;
}
