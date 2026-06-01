import { Controller , Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto'
import * as fs from 'fs';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    @UseInterceptors(FileInterceptor('profilePhoto', {
        storage: memoryStorage(),
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
    async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
        if (data.profilePhoto) {
            const result = await this.usersService.findOne(id);
            const user = result

            if (user?.profilePhoto && fs.existsSync(user.profilePhoto)) {
                fs.unlinkSync(user.profilePhoto);
            }
        }

        return this.usersService.update(id, data);
    }



    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }

}
