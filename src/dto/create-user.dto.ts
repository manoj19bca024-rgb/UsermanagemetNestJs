import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
    @IsNotEmpty()
    name!: string;

    @IsEmail()
    email!: string;

    @IsNotEmpty()
    password!: string;

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return parseInt(value, 10);
        }
        return value;
    })
    @IsNumber()
    age!: number;

    @IsOptional()
    profilePhoto?: string;
}