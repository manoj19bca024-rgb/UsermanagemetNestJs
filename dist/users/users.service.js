"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = require("mongoose");
const file_storage_service_1 = require("../file-storage.service");
let UsersService = class UsersService {
    userModel;
    fileStorageService;
    constructor(userModel, fileStorageService) {
        this.userModel = userModel;
        this.fileStorageService = fileStorageService;
    }
    async create(data, file) {
        try {
            const existingUser = await this.userModel.findOne({ email: data.email });
            if (existingUser) {
                throw new common_1.ConflictException('User already exists with this email');
            }
            const userData = { ...data };
            if (file) {
                userData.profilePhoto = await this.fileStorageService.saveFile(file);
            }
            const user = await this.userModel.create(userData);
            return user;
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            if (process.env.NODE_ENV === 'development') {
                throw new common_1.InternalServerErrorException(`Failed to create user: ${error}`);
            }
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async findAll() {
        try {
            const users = await this.userModel.find();
            return users;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to fetch users');
        }
    }
    async findOne(id) {
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return user;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to fetch user');
        }
    }
    async update(id, data, file) {
        try {
            if (file) {
                const existingUser = await this.userModel.findById(id);
                if (!existingUser) {
                    throw new common_1.NotFoundException('User not found');
                }
                if (existingUser.profilePhoto) {
                    await this.fileStorageService.deleteFile(existingUser.profilePhoto);
                }
                data.profilePhoto = await this.fileStorageService.saveFile(file);
            }
            const updatedUser = await this.userModel.findByIdAndUpdate(id, data, { new: true });
            if (!updatedUser) {
                throw new common_1.NotFoundException('User not found');
            }
            return updatedUser;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Failed to update user');
        }
    }
    async remove(id) {
        try {
            const removedUser = await this.userModel.findByIdAndDelete(id);
            if (!removedUser) {
                throw new common_1.NotFoundException('User not found');
            }
            return removedUser;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Failed to delete user');
        }
    }
    async saveFile(file) {
        return this.fileStorageService.saveFile(file);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        file_storage_service_1.FileStorageService])
], UsersService);
//# sourceMappingURL=users.service.js.map