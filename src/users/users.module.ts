import { Module } from '@nestjs/common';
import { UsersAPIController } from './controller/users.api.controller';
import { UsersService } from './services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwtConstants.secret';
import { AuthGuard } from './guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { CloudinaryModule } from 'src/config/cloudinary/cloudinary.module';
@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'User',
      schema: User
    },
  ]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
  }),
  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      auth: {
        user: 'luonglkvn1000@gmail.com',
        pass: 'ictbnsnvhzzvbhgl',
      }
    }
  }),
    CloudinaryModule
  ],
  controllers: [UsersAPIController],
  providers: [UsersService]
})
export class UsersModule { }
