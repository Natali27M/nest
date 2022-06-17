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
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { CreateUserDto } from './dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { imageFileFilter } from '../utils/image.filter';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    schema: {
      example: [
        {
          id: 1,
          name: 'Tanya',
          email: 'tanya@gmail.com',
          age: 30,
          city: 'Kyiv',
          password: 'ab12',
          status: true,
        },
        {
          id: 2,
          name: 'Katya',
          email: 'Katya@gmail.com',
          age: 35,
          city: 'Lviv',
          password: 'abc123',
          status: true,
        },
        {
          id: 3,
          name: 'Ivan',
          email: 'Ivan@gmail.com',
          age: 25,
          city: 'Lviv',
          password: 'abcd1234',
          status: false,
        },
      ],
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get('/')
  @UseGuards(AuthGuard)
  getAll() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Get one user' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        name: 'Tanya',
        email: 'tanya@gmail.com',
        age: 30,
        city: 'Kyiv',
        password: 'ab12',
        status: true,
        posts: [
          {
            id: 1,
            title: 'Post1',
            content: 'Text1',
            published: false,
            authorId: 1,
          },
          {
            id: 2,
            title: 'Post2',
            content: 'Text2',
            published: true,
            authorId: 1,
          },
        ],
        comments: [
          {
            id: 1,
            text: 'Text1',
            published: false,
            authorId: 1,
            postId: 1,
          },
          {
            id: 2,
            text: 'Text2',
            published: false,
            authorId: 1,
            postId: 1,
          },
          {
            id: 3,
            text: 'Text3',
            published: false,
            authorId: 1,
            postId: 2,
          },
        ],
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getOneUserById(@Param('id') id: string) {
    return this.userService.getOneById(id)
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
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
  @HttpCode(HttpStatus.CREATED)
  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @ApiOperation({ summary: 'Update user' })
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
  @HttpCode(HttpStatus.CREATED)
  @Put('/:id')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './avatar',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          return cb(null, `${randomName}${file.originalname}`);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  updateUser(
    @Body() userData: UpdateUserDto,
    @Param('id') id: string,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    let newAvatarPath: string = null;
    try {
      if (avatar) {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');

        newAvatarPath = `avatar/${randomName}${avatar.originalname}`;
      }

      userData.avatar = newAvatarPath;
      return this.userService.updateById(userData, id);
    } catch (e) {
      console.log(e);
    }
  }

  @Get('avatar/:image')
  watchFile(@Param('image') image, @Res() res) {
    return res.sendFile(image, { root: './avatar' });
  }

  @ApiOperation({ summary: 'Delete user' })
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
  @Delete(':id')
  deleteUserById(@Param('id') id: string) {
    return this.userService.deleteById(id);
  }
}
