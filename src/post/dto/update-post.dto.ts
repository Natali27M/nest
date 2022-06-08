import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({ example: 'Title1', description: 'title' })
  public title: string;

  @ApiProperty({ example: 'Content1', description: 'content' })
  @IsString()
  public content: string;

  @ApiProperty({ example: true, description: 'published' })
  public published: boolean;
}
