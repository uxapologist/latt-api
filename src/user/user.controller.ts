import { Body, Controller, Delete, Get, Logger, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { UserDto, UserRo } from './user.dto';
import { ValidationPipe } from '../shared/util/validation.pipe';
import { AuthGuard } from '../shared/util/auth.guard';
import { ID } from '../shared/models/id.model';
import { DeleteResponse } from '../shared/models/delete-response.model';

@ApiTags('users')
@Controller('users')
export class UserController {
  private logger = new Logger('UserController');

  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of users' })
  @ApiResponse({
    status: 200,
    description: 'The list of Latt app users',
  })
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  getUsers(): Promise<UserRo[]> {
    return this.userService.getUsers();
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign existing user in' })
  @ApiResponse({
    status: 200,
    description: 'Is the user signed in successfully',
  })
  @UsePipes(ValidationPipe)
  logIn(@Body() userData: UserDto): Promise<UserRo> {
    this.logger.log(JSON.stringify(userData));
    return this.userService.signIn(userData);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Sign new user up' })
  @ApiResponse({
    status: 200,
    description: 'Is the user signed up successfully',
  })
  @UsePipes(ValidationPipe)
  signUp(@Body() userData: UserDto): Promise<UserRo> {
    this.logger.log(JSON.stringify(userData));
    return this.userService.signUp(userData);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete specific user' })
  @ApiResponse({
    status: 200,
    description: 'Is the specified user deleted successfully',
  })
  @ApiBearerAuth()
  @UseGuards(new AuthGuard())
  deletePath(@Param('userId') userId: ID): Promise<DeleteResponse> {
    return this.userService.deleteUser(userId);
  }
}
