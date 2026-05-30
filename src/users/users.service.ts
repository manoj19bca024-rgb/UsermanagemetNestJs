import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';


@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async create(data: CreateUserDto, file?: Express.Multer.File) {
        try {
            const existingUser = await this.userModel.findOne({ email: data.email });
            if (existingUser) {
                throw new ConflictException('User already exists with this email');
            }

            const userData = { ...data };
            if (file) {
                userData.profilePhoto = file.path;
            }

            const user = await this.userModel.create(userData);
            return {
                message: 'User created successfully',
                data: user,
            };
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }   

            throw new InternalServerErrorException('Something went wrong');
        }
    }

    async findAll() {
        try {
            const users = await this.userModel.find();
            if (!users || users.length === 0) {
                throw new NotFoundException('No users found');
            }

            return {
                message: 'Users fetched successfully',
                data: users,
            };
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

            return {
                message: 'User found successfully',
                data: user,
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to fetch user');
        }
    }

    async update(id: string, data: any,  file?: Express.Multer.File) {
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, data, { new: true });
            if (!updatedUser) {
                throw new NotFoundException('User not found');
            }
            if(file){
                updatedUser.profilePhoto = file.path;
                await updatedUser.save();
            }
            
            return {
                message: 'User updated successfully',
                data: updatedUser,
            };
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

            return {
                message: 'User deleted successfully',
                data: removedUser,
            };
        } catch (err) {
            throw new InternalServerErrorException('Failed to delete user');
        }
    }
   


}
