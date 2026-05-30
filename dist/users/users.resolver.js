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
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const fs_1 = require("fs");
const path_1 = require("path");
const users_service_1 = require("./users.service");
const user_model_1 = require("./dto/user.model");
const upload_response_model_1 = require("./dto/upload-response.model");
const upload_scalar_1 = require("../graphql/scalars/upload.scalar");
let UsersResolver = class UsersResolver {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async users() {
        const result = await this.usersService.findAll();
        return result.data;
    }
    async user(id) {
        const result = await this.usersService.findOne(id);
        return result.data;
    }
    async createUser(name, email, password, age, profilePhoto) {
        const dto = { name, email, password, age };
        if (profilePhoto) {
            const upload = await (typeof profilePhoto.then === 'function' ? profilePhoto : profilePhoto);
            dto.profilePhoto = await this.saveFile(upload);
        }
        const result = await this.usersService.create(dto);
        return result.data;
    }
    async uploadImage(file) {
        const upload = await (typeof file.then === 'function' ? file : file);
        const url = await this.saveFile(upload);
        return { url };
    }
    async saveFile(file) {
        const uploadDir = (0, path_1.join)(process.cwd(), 'uploads', 'profiles');
        if (!(0, fs_1.existsSync)(uploadDir)) {
            (0, fs_1.mkdirSync)(uploadDir, { recursive: true });
        }
        const filename = `${Date.now()}-${file.filename}`;
        const filePath = (0, path_1.join)(uploadDir, filename);
        await new Promise((resolve, reject) => {
            file.createReadStream()
                .pipe((0, fs_1.createWriteStream)(filePath))
                .on('finish', resolve)
                .on('error', reject);
        });
        return filePath;
    }
};
exports.UsersResolver = UsersResolver;
__decorate([
    (0, graphql_1.Query)(() => [user_model_1.UserModel]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "users", null);
__decorate([
    (0, graphql_1.Query)(() => user_model_1.UserModel),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "user", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_model_1.UserModel),
    __param(0, (0, graphql_1.Args)('name')),
    __param(1, (0, graphql_1.Args)('email')),
    __param(2, (0, graphql_1.Args)('password')),
    __param(3, (0, graphql_1.Args)({ name: 'age', type: () => graphql_1.Int })),
    __param(4, (0, graphql_1.Args)({ name: 'profilePhoto', type: () => upload_scalar_1.UploadScalar, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => upload_response_model_1.UploadResponse),
    __param(0, (0, graphql_1.Args)({ name: 'file', type: () => upload_scalar_1.UploadScalar })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "uploadImage", null);
exports.UsersResolver = UsersResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_model_1.UserModel),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
//# sourceMappingURL=users.resolver.js.map