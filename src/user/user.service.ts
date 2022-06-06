import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private users = [];

  getAll() {
    return this.users;
  }

  getOneById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  create(userDto: CreateUserDto) {
    this.users.push({
      ...userDto,
      id: new Date().valueOf(),
    });
    return userDto;
  }

  updateById(id: string, userDto: CreateUserDto) {
    const index = this.users.findIndex((user) => user.id == id);
    this.users.splice(index, 1);
    this.users.push(userDto);
    return userDto;
  }

  deleteById(id: string) {
    const index = this.users.findIndex((user) => user.id == id);
    this.users.splice(index, 1);
  }
}
