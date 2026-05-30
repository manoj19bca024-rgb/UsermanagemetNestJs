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
const fs_1 = require("fs");
const win32_1 = require("path/win32");
let UsersService = class UsersService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(data, file) {
        try {
            const existingUser = await this.userModel.findOne({ email: data.email });
            if (existingUser) {
                throw new common_1.ConflictException('User already exists with this email');
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
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
    async findAll() {
        try {
            const users = await this.userModel.find();
            if (!users || users.length === 0) {
                throw new common_1.NotFoundException('No users found');
            }
            return {
                message: 'Users fetched successfully',
                data: users,
            };
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
            return {
                message: 'User found successfully',
                data: user,
            };
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
            const updatedUser = await this.userModel.findByIdAndUpdate(id, data, { new: true });
            if (!updatedUser) {
                throw new common_1.NotFoundException('User not found');
            }
            if (file) {
                updatedUser.profilePhoto = file.path;
                await updatedUser.save();
            }
            return {
                message: 'User updated successfully',
                data: updatedUser,
            };
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
            return {
                message: 'User deleted successfully',
                data: removedUser,
            };
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Failed to delete user');
        }
    }
    async saveFile(file) {
        const uploadDir = (0, win32_1.join)(process.cwd(), 'uploads', 'profiles');
        if (!(0, fs_1.existsSync)(uploadDir)) {
            (0, fs_1.mkdirSync)(uploadDir, { recursive: true });
        }
        const filename = `${Date.now()}-${file.filename}`;
        const filePath = (0, win32_1.join)(uploadDir, filename);
        await new Promise((resolve, reject) => {
            file.createReadStream()
                .pipe((0, fs_1.createWriteStream)(filePath))
                .on('finish', resolve)
                .on('error', reject);
        });
        return filePath;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map