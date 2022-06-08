import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'Title1', description: 'title' })
  @IsString()
  public title: string;

  @ApiProperty({ example: 'Content1', description: 'content' })
  @IsString()
  public content: string;

  @ApiProperty({ example: true, description: 'published' })
  @IsBoolean()
  public published: boolean;

  @ApiProperty({ example: 1, description: 'authorId' })
  @IsNumber()
  public authorId: number;
}
