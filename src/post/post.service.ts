import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';

import { PrismaService } from '../core/prisma.service';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<Post[]> {
    return this.prismaService.post.findMany();
  }

  getOneById(postId: string): Promise<Post> {
    return this.prismaService.post.findUnique({
      where: { id: Number(postId) },
      include: { comments: true },
    });
  }

  create(data: Prisma.PostCreateInput) {
    return this.prismaService.post.create({ data });
  }

  updateById(postData: Prisma.PostUpdateInput, postId: string): Promise<Post> {
    return this.prismaService.post.update({
      where: { id: Number(postId) },
      data: {
        title: postData.title,
        content: postData.content,
        published: postData.published,
      },
    });
  }

  deleteById(postId: string) {
    return this.prismaService.post.delete({ where: { id: Number(postId) } });
  }
}
