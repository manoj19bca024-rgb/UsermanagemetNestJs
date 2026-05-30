import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { UsersService } from './users.service';
import { UserModel } from './dto/user.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserInput } from './dto/create-user.input';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { UpdateUserInput } from './dto/update-user.input';
import { UploadResponse } from './dto/upload-response.model';
import { UploadScalar } from '../graphql/scalars/upload.scalar';



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
    @Args({ name: 'input', type: () => CreateUserInput }) createUserInput: CreateUserInput,
  ) {
    const { name, email, password, age, profilePhoto } = createUserInput;
    const dto: CreateUserDto = { name, email, password, age } as CreateUserDto;

    if (profilePhoto) {
      const upload = await (typeof profilePhoto.then === 'function' ? profilePhoto : profilePhoto);
      dto.profilePhoto = await this.usersService.saveFile(upload);
    }

    const result = await this.usersService.create(dto);
    return result.data;
  }

  @Mutation(()=> UserModel)
  async updateUser(
    @Args({ name: 'input', type: () => UpdateUserInput }) updateUserInput: UpdateUserInput,
  ){
    const { id, name, email, password, age, profilePhoto } = updateUserInput;
    const updateData: any = {};
    if(name) updateData.name = name;
    if(email) updateData.email = email;
    if(password) updateData.password = password;
    if(age) updateData.age = age;
    if (profilePhoto) {
      const upload = await (typeof profilePhoto.then === 'function' ? profilePhoto : profilePhoto);
      updateData.profilePhoto = await this.usersService.saveFile(upload);
    }
    const result = await this.usersService.update(id, updateData);
    return result.data;
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args({ name: 'input', type: () => DeleteUserDto }) deleteUserDto: DeleteUserDto,
  ) {
    await this.usersService.remove(deleteUserDto.id);
    return true;
  }

  


  @Mutation(() => UploadResponse)
  async uploadImage(
    @Args({ name: 'file', type: () => UploadScalar })
    file: any,
  ) {
    const upload = await (typeof file.then === 'function' ? file : file);
    const url = await this.usersService.saveFile(upload);
    return { url };
  }

  
}
