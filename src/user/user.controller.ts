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

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get one user' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 3,
        name: 'Ivan',
        email: 'ivan@gmail.com',
        age: 22,
        city: 'Lviv',
        password: 'abcde12345',
        status: false,
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getOneUserById(@Param('id') id: string) {
    return this.userService.getOneById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Put('/:id')
  updateUser(@Body() userData: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateById(userData, id);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  deleteUserById(@Param('id') id: string) {
    return this.userService.deleteById(id);
  }
}
