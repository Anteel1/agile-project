import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createUserDto, signinUserDto } from '../dto/user.dto';
import { UserType } from '../models/user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User')
        private readonly model: Model<UserType>,
        private readonly jwtService: JwtService,
        private readonly mailService: MailerService,) { }


    async getAllUsers() {
        return await this.model.find({})
    }

    async createUser(user: createUserDto) {
        try {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const verifyCode = characters.charAt(Math.floor(Math.random() * 1000000));
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(user.password, salt)
            const newUser = new this.model({
                username: user.username,
                password: hashPassword,
                role: user.role,
                phone: user.phone,
                email: user.email,
                avatar: user.avatar,
                verifyCode: verifyCode
            })
            this.sendVerify(user.email, verifyCode)
            return await newUser.save()
        } catch (error) {
            throw new AuthenticatorResponse
        }
    }

    async signIn(user: signinUserDto) {
        const result = await this.model.findOne({ username: user.username })
        const isPassword = await bcrypt.compare(user.password, result.password)
        if (isPassword) {
            const payload = { username: result.username, sub: result._id };
            return {
                access_token: await this.jwtService.signAsync(payload),
                result: result
            };
        }
        throw new UnauthorizedException();
    }


    async getUserById(id: string) {
        return await this.model.findOne({ _id: id })
    }

    async editUser(_id: string, user: createUserDto) {
        return await this.model.findOneAndUpdate({ sid: _id }, user)
    }

    async deleteUser(_id: string) {
        return await this.model.findByIdAndDelete({ _id: _id })
    }

    sendVerify(email: string, verifyCode: string) {
        console.log(email)
        console.log(verifyCode)
        return this.mailService.sendMail({
            to: email,
            from: 'luonglkvn1000@gmail.com',
            subject: 'Verify your account !!!',
            text: 'Your verify code is :' + verifyCode,
        })
    }

    async verifyUser(_id: string, verifyCode: string) {
        const user = await this.model.findOne({ _id: _id })
        return verifyCode === user.verifyCode
    }
}
