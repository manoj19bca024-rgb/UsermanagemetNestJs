import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { UsersService } from './users.service';
import { UserModel } from './dto/user.model';
import { CreateUserDto } from '../dto/create-user.dto';
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
    @Args('name') name: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args({ name: 'age', type: () => Int }) age: number,
    @Args({ name: 'profilePhoto', type: () => UploadScalar, nullable: true })
    profilePhoto?: any,
  ) {
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
    @Args('id') id: string,
    @Args('name',{nullable: true}) name?:string,
    @Args('email',{nullable: true}) email?:string,
    @Args('password',{nullable: true}) password?:string,
    @Args({ name: 'age', type: () => Int, nullable:true }) age?:number,
    @Args({ name: 'profilePhoto', type: () => UploadScalar, nullable: true })
    profilePhoto?: any,
  ){
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
    async deleteUser(@Args('id') id: string) {
      await this.usersService.remove(id);
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
