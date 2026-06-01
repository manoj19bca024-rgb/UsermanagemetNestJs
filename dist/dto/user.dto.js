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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserDto = exports.UpdateUserDto = exports.CreateUserDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const upload_scalar_1 = require("../graphql/scalars/upload.scalar");
let CreateUserDto = class CreateUserDto {
    name;
    email;
    password;
    age;
    profilePhoto;
};
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string')
            return parseInt(value, 10);
        return value;
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "age", void 0);
__decorate([
    (0, graphql_1.Field)(() => upload_scalar_1.UploadScalar, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "profilePhoto", void 0);
exports.CreateUserDto = CreateUserDto = __decorate([
    (0, graphql_1.InputType)()
], CreateUserDto);
let UpdateUserDto = class UpdateUserDto extends (0, graphql_1.PartialType)(CreateUserDto) {
    id;
};
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "id", void 0);
exports.UpdateUserDto = UpdateUserDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateUserDto);
let DeleteUserDto = class DeleteUserDto {
    id;
};
exports.DeleteUserDto = DeleteUserDto;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DeleteUserDto.prototype, "id", void 0);
exports.DeleteUserDto = DeleteUserDto = __decorate([
    (0, graphql_1.InputType)()
], DeleteUserDto);
//# sourceMappingURL=user.dto.js.map