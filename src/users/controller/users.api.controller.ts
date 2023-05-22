import { Body, Controller, Get, HttpStatus, Next, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { createUserDto, signinUserDto, verifyUser } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import { NextFunction, Response, Request } from 'express';
import { AuthGuard } from '../guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from 'src/config/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('user')
@Controller('api/user/')
export class UsersAPIController {
    constructor(
        private readonly usersService: UsersService,
        private readonly cloudinaryService: CloudinaryService) { }
    @Get("getall")
    @UseGuards(AuthGuard)
    async getAllUser(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            const result = await this.usersService.getAllUsers()
            if (result) {
                return res.status(HttpStatus.OK).json({ statusCode: 200, data: result })
            }
            return res.status(HttpStatus.BAD_REQUEST).json({ statusCode: 409, message: 'Error' })
        } catch (error) {
            next(error)
        }

    }

    @UsePipes(new ValidationPipe())
    @Post("signup")
    async createUser(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Body() user: createUserDto) {
        try {
            const result = await this.usersService.createUser(user);
            if (result) {
                return res.status(HttpStatus.OK).json({ statusCode: 200, message: 'Sending verify code !!' })
            }
        } catch (error) {
            next(error)
        }
    }
    @Post('verify')
    async verifyUser(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Body() verifyUser: verifyUser) {
        try {
            const result = await this.usersService.verifyUser(verifyUser._id, verifyUser.verifyCode);
            if (result) {
                return res.status(HttpStatus.OK).json({ statusCode: 200, message: 'Verify success !!' })
            }
        } catch (error) {
            next(error)
        }
    }

    @UsePipes(new ValidationPipe())
    @Post("signin")
    async signIn(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Body() user: signinUserDto) {
        try {
            const result = await this.usersService.signIn(user);
            if (result) {
                return res.status(HttpStatus.OK).json({
                    statusCode: 200,
                    message: 'Login success !',
                    data: result.result,
                    access_token: result.access_token
                })
            }
        }
        catch (error) {
            next(error)
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getUserById(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Param('id') id: string) {
        try {
            const result = await this.usersService.getUserById(String(id))
            if (result) {
                return res.status(HttpStatus.OK).json({ statusCode: 200, data: result })
            }
            return res.status(HttpStatus.BAD_REQUEST).json({ statusCode: 409, message: 'Error' })
        } catch (error) {
            next(error)
        }
    }

    @Post(':id/edit')
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    async editUser(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction,
        @Param('id') id: string, @Body() user: createUserDto, @UploadedFile() file: Express.Multer.File
    ) {
        try {
            const avatar = this.cloudinaryService.uploadFile(file)
            console.log(avatar)
            return avatar
            // const result = await this.usersService.editUser(String(id), user)
            // if (result) {
            //     return res.status(HttpStatus.OK).json({ statusCode: 200, data: result })
            // }
            // return res.status(HttpStatus.BAD_REQUEST).json({ statusCode: 409, message: 'Error' })
        } catch (error) {
            next(error)
        }
    }

    @Post(':id/delete')
    @UseGuards(AuthGuard)
    async deleteUser(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Param('id') id: string) {
        try {
            const result = await this.usersService.deleteUser(String(id))
            if (result) {
                return res.status(HttpStatus.OK).json({ statusCode: 200, message: 'Delete success !' })
            }
            return res.status(HttpStatus.BAD_REQUEST).json({ statusCode: 409, message: 'Error' })
        } catch (error) {
            next(error)
        }
    }
}
