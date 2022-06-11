import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({ example: 'Text1', description: 'text' })
  @IsString()
  @IsOptional()
  public text: string;

  @ApiProperty({ example: false, description: 'published' })
  @IsBoolean()
  @IsOptional()
  public published: boolean;
}
