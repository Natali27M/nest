import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({ example: 'Text1', description: 'text' })
  @IsString()
  public text: string;

  @ApiProperty({ example: false, description: 'published' })
  public published: boolean;
}
