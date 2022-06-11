import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../core/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UserService, PrismaService, JwtService],
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
})
export class UserModule {}
