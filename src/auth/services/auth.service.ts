import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';
import { AuthSuccessResponse } from '../responses/auth-success.response';
import { UserLoginRequest } from '../requests/user-login.request';
import { JWT_SECRET } from '../constants';
import { UsersService } from '../../users/services/users.service';
import { ClientUserInformation } from '../interfaces/client-user-information';
import { CommandBus } from '@nestjs/cqrs';
import { ValidateUserCommand } from '../commands/validate-user.command';
import { CreateTokenCommand } from '../commands/create-token.command';
import { User } from '../../users/entities/user.entity';
import { RegisterUserRequest } from '../requests/register-user.request';
import { CreateUserCommand } from '../../users/commands/create-user.command';
import { BaseService } from '../../common/services/base.service';

@Component()
export class AuthService extends BaseService {
  constructor (commandBus: CommandBus) {
    super(commandBus);
  }

  async register(request: RegisterUserRequest) {
    const { username, password, email, firstName, lastName } = request;
    const createdUser = await this.executeCommand(
      new CreateUserCommand(username, password, email, firstName, lastName)
    );
    return await this.createToken(createdUser);
  }

  async createToken(user: User): Promise<AuthSuccessResponse> {
    return await this.executeCommand(
      new CreateTokenCommand(user.id, user.username, user.email)
    );
  }

  async validateUser(signedUser): Promise<boolean> {
    return Boolean(await this.executeCommand(
      new ValidateUserCommand(signedUser.id)
    ));
  }
}