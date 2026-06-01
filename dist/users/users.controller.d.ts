import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/restapidto/user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(data: any, file?: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(id: string, data: UpdateUserDto, file?: Express.Multer.File): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/user.schema").User, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/user.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
