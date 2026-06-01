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
const users_service_1 = require("./users.service");
const user_model_1 = require("./dto/user.model");
const user_dto_1 = require("./dto/user.dto");
const upload_response_model_1 = require("./dto/upload-response.model");
const upload_scalar_1 = require("../graphql/scalars/upload.scalar");
let UsersResolver = class UsersResolver {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async users() {
        const result = await this.usersService.findAll();
        return result;
    }
    async user(id) {
        const result = await this.usersService.findOne(id);
        return result;
    }
    async createUser(createUserInput) {
        const { name, email, password, age, profilePhoto } = createUserInput;
        const dto = { name, email, password, age };
        const result = await this.usersService.create(dto, profilePhoto);
        return result;
    }
    async updateUser(updateUserDto) {
        const { id, name, email, password, age, profilePhoto } = updateUserDto;
        const updateData = {};
        if (name)
            updateData.name = name;
        if (email)
            updateData.email = email;
        if (password)
            updateData.password = password;
        if (age)
            updateData.age = age;
        const result = await this.usersService.update(id, updateData, profilePhoto);
        return result;
    }
    async deleteUser(deleteUserDto) {
        await this.usersService.remove(deleteUserDto.id);
        return true;
    }
    async uploadImage(file) {
        const upload = await (typeof file.then === 'function' ? file : file);
        const url = await this.usersService.saveFile(upload);
        return { url };
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
    __param(0, (0, graphql_1.Args)({ name: 'input', type: () => user_dto_1.CreateUserDto })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_model_1.UserModel),
    __param(0, (0, graphql_1.Args)({ name: 'input', type: () => user_dto_1.UpdateUserDto })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)({ name: 'input', type: () => user_dto_1.DeleteUserDto })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.DeleteUserDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "deleteUser", null);
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