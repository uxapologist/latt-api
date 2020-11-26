import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { UserDto, UserRo } from './user.dto';
import { UserEntity } from './user.entity';
import { DeleteResponse } from '../shared/models/delete-response.model';
import { ID } from '../shared/models/id.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private configService: ConfigService
  ) {}

  async getUsers(): Promise<UserRo[]> {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponseObject(false));
  }

  async signIn(userData: UserDto): Promise<UserRo> {
    const { userName, password } = userData;
    const user = await this.userRepository.findOne({ where: { userName } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
    }
    return user.toResponseObject();
  }

  async signUp(userData: UserDto): Promise<UserRo> {
    const { userName, code } = userData;
    if (code !== this.configService.get('LATT_ADMIN_CODE')) {
      throw new HttpException('The entered secret code is not correct', HttpStatus.BAD_REQUEST);
    }
    let user = await this.userRepository.findOne({ where: { userName } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = this.userRepository.create(userData);
    await this.userRepository.save(user);
    return user.toResponseObject();
  }

  async deleteUser(userId: ID): Promise<DeleteResponse> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new HttpException('Path not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.delete({ userId });
    return { deleted: true, id: userId };
  }
}
