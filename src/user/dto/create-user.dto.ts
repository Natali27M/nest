import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Katya', description: 'name' })
  @IsString()
  @Length(2, 10)
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'email' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ example: 20, description: 'age' })
  @IsNumber()
  public age: number;

  @ApiProperty({ example: 'Lviv', description: 'city' })
  @IsString()
  public city: string;

  @ApiProperty({ example: 'abc123', description: 'password' })
  @IsString()
  @Length(2, 10)
  readonly password: string;

  @ApiProperty({ example: true, description: 'status' })
  @IsBoolean()
  public status: boolean;
}
