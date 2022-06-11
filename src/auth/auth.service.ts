import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { CreateUserDto } from '../user/dto';
import { User } from '@prisma/client';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(authUserDto: AuthUserDto) {
    const user = await this.validatorUser(authUserDto);
    return this.generateToken(user);
  }

  async registration(createUserDto: CreateUserDto) {
    const findUser = await this.userService.getByEmail(createUserDto.email);
    if (findUser) {
      throw new HttpException('User is already exist', HttpStatus.BAD_REQUEST);
    }
    const hashPass = await bcrypt.hash(createUserDto.password, 7);
    const user = await this.userService.create({
      ...createUserDto,
      password: hashPass,
    });
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { email: user.email, id: user.id, name: user.name };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validatorUser(user: AuthUserDto) {
    const userDB = await this.userService.getByEmail(user.email);
    const passEqual = await bcrypt.compare(user.password, userDB.password);
    if (userDB && passEqual) {
      return userDB;
    }
    throw new UnauthorizedException({ message: 'Wrong email or password' });
  }
}
