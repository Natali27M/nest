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
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { IMiddlewareRequest } from 'src/auth/interfaces/middleware-request.interface';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    schema: {
      example: [
        {
          id: 1,
          title: 'Post1',
          content: 'Text1',
          published: false,
          authorId: 1,
        },
        {
          id: 2,
          title: 'Post2',
          content: 'Text2',
          published: true,
          authorId: 1,
        },
        {
          id: 3,
          title: 'NewPost',
          content: 'NewText',
          published: true,
          authorId: 2,
        },
      ],
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.postService.getAll();
  }

  @ApiOperation({ summary: 'Get one post' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        title: 'Post1',
        content: 'Text1',
        published: false,
        authorId: 1,
        comments: [
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
        ],
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getOneById(@Param('id') id: string) {
    return this.postService.getOneById(id);
  }

  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        id: 5,
        title: 'Post4',
        content: 'Text4',
        published: false,
        authorId: 2,
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Req() req: IMiddlewareRequest, @Body() postDto: CreatePostDto) {
    const user = req.user;
    console.log(user);
    return this.postService.create(postDto);
  }

  @ApiOperation({ summary: 'Update post' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 5,
        title: 'Post4',
        content: 'Text4',
        published: false,
        authorId: 2,
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  @Put('/:id')
  update(@Body() postData: UpdatePostDto, @Param('id') id: string) {
    return this.postService.updateById(postData, id);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 5,
        title: 'Post4',
        content: 'Text4',
        published: false,
        authorId: 2,
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  deletePostById(@Param('id') id: string) {
    return this.postService.deleteById(id);
  }
}
