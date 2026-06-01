import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from "./dto/graphqlDto/user.dto";
import { FileStorageService, UploadFile } from '../file-storage.service';
export declare class UsersService {
    private userModel;
    private readonly fileStorageService;
    constructor(userModel: Model<User>, fileStorageService: FileStorageService);
    create(data: CreateUserDto, file?: UploadFile): Promise<import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, data: any, file?: UploadFile): Promise<(import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    saveFile(file: UploadFile): Promise<string>;
}
