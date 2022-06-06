import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private users = [];
  private user = CreateUserDto;
  private updateUser = CreateUserDto;
  private userDto: CreateUserDto;

  getAll() {
    return this.users;
  }

  getOneUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  createUser(userDto: CreateUserDto) {
    this.users.push({
      ...userDto,
      id: new Date().valueOf(),
    });
    return userDto;
  }

  updateUserById(id: string, userDto: CreateUserDto) {
    const index = this.users.findIndex((user) => user.id == id);
    this.users.splice(index, 1);
    this.users.push(userDto);
    return userDto;
  }

  deleteUserById(id: string) {
    const index = this.users.findIndex((user) => user.id == id);
    this.users.splice(index, 1);
  }
}
