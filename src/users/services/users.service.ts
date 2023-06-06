import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { createUserDto, editVerifyCode, signinUserDto, updateUserDto } from '../dto/user.dto';
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
            const crypto = require('crypto')
            const randomEightDigits = crypto.randomBytes(4).readUInt32BE(0).toString().slice(0, 4)
            const verifyCode = randomEightDigits
            console.log(verifyCode)
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
            return verifyCode
        } catch (error) {
            throw new AuthenticatorResponse
        }
    }

    async signIn(user: signinUserDto) {
        const result = await this.model.findOne({ username: user.username })
        if (!result.verifyCode) {
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
        throw new HttpException('This user is not verify !!!', 409)
    }


    async getUserById(id: string) {
        return await this.model.findOne({ _id: id })
    }

    async editUser(_id: string, user: updateUserDto) {
        return await this.model.findOneAndUpdate({ _id: _id }, user, { new: true })
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
        if (verifyCode === user.verifyCode) {
            user.verifyCode = ""
            return await this.model.findOneAndUpdate({ _id: _id }, user)
        }
        return false
    }
}
