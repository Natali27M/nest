import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateCommentDto } from './dto';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({
    status: 200,
    schema: {
      example: [
        {
          id: 1,
          text: 'Text1',
          published: false,
          authorId: 1,
          postId: 1,
        },
        {
          id: 2,
          text: 'Text2',
          published: false,
          authorId: 1,
          postId: 1,
        },
        {
          id: 3,
          text: 'Text3',
          published: false,
          authorId: 1,
          postId: 2,
        },
      ],
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.commentService.getAll();
  }

  @ApiOperation({ summary: 'Get one comment' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        text: 'Text1',
        published: false,
        authorId: 1,
        postId: 1,
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getOneCommentById(@Param('id') id: string) {
    return this.commentService.getOneById(id);
  }

  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        id: 1,
        text: 'Text1',
        published: false,
        authorId: 1,
        postId: 1,
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createComment(@Body() commentDto: CreateCommentDto) {
    return this.commentService.create(commentDto);
  }

  @ApiOperation({ summary: 'Update comment' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        text: 'Text1',
        published: false,
        authorId: 1,
        postId: 1,
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Put('/:id')
  updateComment(
    @Body() commentData: UpdateCommentDto,
    @Param('id') id: string,
  ) {
    return this.commentService.updateById(commentData, id);
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        text: 'Text1',
        published: false,
        authorId: 1,
        postId: 1,
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  deleteCommentById(@Param('id') id: string) {
    return this.commentService.deleteById(id);
  }
}
