import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Katya', description: 'name' })
  @IsString()
  @Length(2, 10)
  public name: string;

  @ApiProperty({ example: 20, description: 'age' })
  @IsNumber()
  @IsOptional()
  public age: number;

  @ApiProperty({ example: 'Lviv', description: 'city' })
  @IsString()
  @IsOptional()
  public city: string;

  @ApiProperty({
    example: 'avatar/e09abe5d3b94999bb54b67211bd278f31809.jpg',
    description: 'avatar',
  })
  @IsString()
  @IsOptional()
  public avatar: string;
}
