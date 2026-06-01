export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    age: number;
    profilePhoto?: any;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    id: string;
}
export declare class DeleteUserDto {
    id: string;
}
export {};
