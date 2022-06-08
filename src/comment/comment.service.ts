import { Injectable } from '@nestjs/common';
import { Prisma, Comment } from '@prisma/client';

import { PrismaService } from '../core/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  getAll(): Promise<Comment[]> {
    return this.prismaService.comment.findMany();
  }

  getOneById(commentId: string): Promise<Comment> {
    return this.prismaService.comment.findUnique({
      where: { id: Number(commentId) },
    });
  }

  create(data: Prisma.CommentCreateInput) {
    return this.prismaService.comment.create({ data });
  }

  updateById(
    commentData: Prisma.CommentUpdateInput,
    commentId: string,
  ): Promise<Comment> {
    return this.prismaService.comment.update({
      where: { id: Number(commentId) },
      data: { text: commentData.text, published: commentData.published },
    });
  }

  deleteById(commentId: string) {
    return this.prismaService.comment.delete({
      where: { id: Number(commentId) },
    });
  }
}
