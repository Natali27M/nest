import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Text1', description: 'text' })
  @IsString()
  public text: string;

  @ApiProperty({ example: false, description: 'published' })
  @IsBoolean()
  public published: boolean;
}
