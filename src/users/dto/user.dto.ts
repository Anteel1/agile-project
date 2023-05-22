import { IsNotEmpty, Length } from "class-validator";

export class createUserDto {
    @IsNotEmpty()
    @Length(4, 16)
    username: string;

    @IsNotEmpty()
    @Length(6, 12)
    password: string;

    phone: string;

    email: string;

    avatar: string;
    @IsNotEmpty()
    role: Number;
}

export class signinUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @Length(6, 12)
    password: string;
}

export class verifyUser {
    @IsNotEmpty()
    _id: string;
    @IsNotEmpty()
    @Length(6)
    verifyCode: string
}