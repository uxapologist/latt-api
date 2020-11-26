import { IsNotEmpty, IsString } from 'class-validator';

import { ID } from '../shared/models/id.model';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  code?: string;
}

export class UserRo {
  userId: ID;
  userName: string;
  token?: string;
}
