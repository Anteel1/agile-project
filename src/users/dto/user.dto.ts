import { IsNotEmpty, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class createUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(4, 16)
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(6, 12)
    password: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    avatar: string;
    @ApiProperty()
    @IsNotEmpty()
    role: Number;
}

export class updateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(4, 16)
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(6, 12)
    password: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    file: string;

    @ApiProperty()
    @IsNotEmpty()
    role: Number;
}


export class signinUserDto {
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(6, 12)
    password: string;
}

export class verifyUser {

    @ApiProperty()
    @IsNotEmpty()
    _id: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(8)
    verifyCode: string
}

export class editVerifyCode {
    @ApiProperty()
    @IsNotEmpty()
    _id: string;

    @ApiProperty()
    verifyCode: string
}