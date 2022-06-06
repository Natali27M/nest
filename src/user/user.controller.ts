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

import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getAll() {
    // return 'Hello world!';
    return this.userService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getOneUserById(@Param('id') id: string) {
    // return `Get one user : ${id}`;
    return this.userService.getOneUserById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    // return userDto;
    return this.userService.createUser(userDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/:id')
  updateUser(@Body() userDto: CreateUserDto, @Param('id') id: string) {
    // return userDto;
    return this.userService.updateUserById(id, userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }
}
