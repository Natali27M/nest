import { Injectable } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  private posts = [];

  getAll() {
    return this.posts;
  }

  getOneById(id: string) {
    return this.posts.find((post) => post.id === id);
  }

  create(postDto: CreatePostDto) {
    this.posts.push({
      ...postDto,
      id: new Date().valueOf(),
    });
    return postDto;
  }

  updateById(id: string, postDto: CreatePostDto) {
    const index = this.posts.findIndex((post) => post.id == id);
    this.posts.splice(index, 1);
    this.posts.push(postDto);
    return postDto;
  }

  deleteById(id: string) {
    const index = this.posts.findIndex((post) => post.id == id);
    this.posts.splice(index, 1);
  }
}
