import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { UploadScalar } from '../../graphql/scalars/upload.scalar';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  @IsNotEmpty()
  id!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  password?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  age?: number;

  @Field(() => UploadScalar, { nullable: true })
  @IsOptional()
  profilePhoto?: any;
}
