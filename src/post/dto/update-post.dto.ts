import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({ example: 'Title1', description: 'title' })
  @IsString()
  @IsOptional()
  public title: string;

  @ApiProperty({ example: 'Content1', description: 'content' })
  @IsString()
  @IsOptional()
  public content: string;

  @ApiProperty({ example: true, description: 'published' })
  @IsBoolean()
  @IsOptional()
  public published: boolean;
}
