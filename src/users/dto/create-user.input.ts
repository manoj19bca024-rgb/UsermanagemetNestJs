import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { UploadScalar } from '../../graphql/scalars/upload.scalar';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password!: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  age!: number;

  @Field(() => UploadScalar, { nullable: true })
  @IsOptional()
  profilePhoto?: any;
}
