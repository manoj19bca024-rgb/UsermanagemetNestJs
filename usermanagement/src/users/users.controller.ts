import { Controller , Get, Post, Put, Delete, Param, Body, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './users.service';
import { CreateUserDto} from '../dto/create-user.dto';
import { UpdateUserDto} from '../dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    @UseInterceptors(FileInterceptor('profilePhoto', {
        storage: diskStorage({
            destination: './uploads/profiles',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
                cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
    }))
    async create(@Body() data: CreateUserDto, @UploadedFile() file?: Express.Multer.File) {
        return this.usersService.create(data, file);
    }

    @Get()
    async findAll(){
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id')id: string){
        return this.usersService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() data:UpdateUserDto){
        return this.usersService.update(id,data)
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }

}
