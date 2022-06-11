import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from '../user/dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() authUserDto: AuthUserDto) {
    return this.authService.login(authUserDto);
  }

  @ApiOperation({ summary: 'Create user and get token' })
  @ApiResponse({
    status: 201,
    schema: {
      example: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld0BnbWFpbC5jb20iLCJpZCI6NywibmFtZSI6IkV2YSIsImlhdCI6MTY' +
          '1NDk2NDgwMSwiZXhwIjoxNjU1MDUxMjAxfQ.8CFHYmx5UrUg2Rf4cTdBtU7YYhzza0vgzPnJQinq9_E',
      },
    },
  })
  @Post('/registration')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }
}
