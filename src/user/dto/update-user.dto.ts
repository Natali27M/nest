import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Katya', description: 'name' })
  @IsString()
  @Length(2, 10)
  public name: string;

  @ApiProperty({ example: 20, description: 'age' })
  public age: number;

  @ApiProperty({ example: 'Lviv', description: 'city' })
  public city: string;
}
