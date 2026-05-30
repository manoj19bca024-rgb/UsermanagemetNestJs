import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { UsersService } from './users.service';
import { UserModel } from './dto/user.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { UploadResponse } from './dto/upload-response.model';
import { UploadScalar } from '../graphql/scalars/upload.scalar';

interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => NodeJS.ReadableStream;
}

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
      dto.profilePhoto = await this.saveFile(upload);
    }

    const result = await this.usersService.create(dto);
    return result.data;
  }

  @Mutation(() => UploadResponse)
  async uploadImage(
    @Args({ name: 'file', type: () => UploadScalar })
    file: any,
  ) {
    const upload = await (typeof file.then === 'function' ? file : file);
    const url = await this.saveFile(upload);
    return { url };
  }

  private async saveFile(file: FileUpload): Promise<string> {
    const uploadDir = join(process.cwd(), 'uploads', 'profiles');

    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `${Date.now()}-${file.filename}`;
    const filePath = join(uploadDir, filename);

    await new Promise<void>((resolve, reject) => {
      file.createReadStream()
        .pipe(createWriteStream(filePath))
        .on('finish', resolve)
        .on('error', reject);
    });

    return filePath;
  }
}
