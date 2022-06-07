import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../core/prisma.service';

@Module({
  providers: [UserService, PrismaService],
  imports: [],
  controllers: [UserController],
})
export class UserModule {}
