import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.postService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getOneById(@Param('id') id: string) {
    return this.postService.getOneById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() postDto: CreatePostDto) {
    return this.postService.create(postDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/:id')
  update(@Body() postDto: CreatePostDto, @Param('id') id: string) {
    return this.postService.updateById(id, postDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  deletePostById(@Param('id') id: string) {
    return this.postService.deleteById(id);
  }
}
