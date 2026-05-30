import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserModel } from './dto/user.model';
import { CreateUserDto } from '../dto/create-user.dto';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserModel])
  async users() {
    const result = await this.usersService.findAll();
    return result.data;
  }

  @Query(() => UserModel)
  async user(@Args('id') id: string) {
    const result = await this.usersService.findOne(id);
    return result.data;
  }

  @Mutation(() => UserModel)
  async createUser(
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('age') age: number,
  ) {
    const dto: CreateUserDto = { name, email, password, age } as CreateUserDto;
    const result = await this.usersService.create(dto);
    return result.data;
  }
}
