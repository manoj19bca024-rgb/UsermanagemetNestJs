import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from "./dto/user.dto";
import { FileStorageService, UploadFile } from '../file-storage.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly fileStorageService: FileStorageService,
    ) { }

    async create(data: CreateUserDto, file?: UploadFile) {
        try {
            const existingUser = await this.userModel.findOne({ email: data.email });
            if (existingUser) {
                throw new ConflictException('User already exists with this email');
            }

            const userData = { ...data };
            if (file) {
                userData.profilePhoto = await this.fileStorageService.saveFile(file);
            }

            const user = await this.userModel.create(userData);
            return user
        } catch (error) {

            if (error instanceof ConflictException) {
                throw error;
            }
            if ( process.env.NODE_ENV === 'development'){
                throw new InternalServerErrorException(`Failed to create user: ${error}`);
            }

            throw new InternalServerErrorException('Something went wrong');
        }
    }

    async findAll() {
        try {
            const users = await this.userModel.find();
            return users;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to fetch users');
        }
    }

    

    async findOne(id: string) {
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                throw new NotFoundException('User not found');
            }

            return user;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to fetch user');
        }
    }



    async update(id: string, data: any, file?: UploadFile) {
        try {
            if (file) {
                const existingUser = await this.userModel.findById(id);
                if (!existingUser) {
                    throw new NotFoundException('User not found');
                }

                if (existingUser.profilePhoto) {
                    await this.fileStorageService.deleteFile(existingUser.profilePhoto);
                }

                data.profilePhoto = await this.fileStorageService.saveFile(file);
            }

            const updatedUser = await this.userModel.findByIdAndUpdate(id, data, { new: true });
            if (!updatedUser) {
                throw new NotFoundException('User not found');
            }

            return updatedUser;
        } catch (err) {
            throw new InternalServerErrorException('Failed to update user');
        }
    }


    async remove(id: string) {
        try {
            const removedUser = await this.userModel.findByIdAndDelete(id);
            if (!removedUser) {
                throw new NotFoundException('User not found');
            }

            return removedUser;
        } catch (err) {
            throw new InternalServerErrorException('Failed to delete user');
        }
    }

    async saveFile(file: UploadFile): Promise<string> {
        return this.fileStorageService.saveFile(file);
    }

}
