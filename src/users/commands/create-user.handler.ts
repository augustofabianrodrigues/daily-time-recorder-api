import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "./create-user.command";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { BaseCommandHandler } from "../../common/commands";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler extends BaseCommandHandler<CreateUserCommand> {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super();
  }

  async executeCommand(command: CreateUserCommand) {
    const user = { ...command, createDate: new Date() };
    const insertResult = await this.userRepository.insert({ ...user });

    return Object.assign({ id: insertResult.identifiers[0].id }, user);
  }
}