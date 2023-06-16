import { Body, Controller, Get, HttpStatus, Next, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { AuthGuard } from 'src/users/guard/auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from 'src/config/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from '../services/products.service';
import { ProductDto } from '../dto/product.dto';
import { PortalController } from 'src/decorator/decor.controller';

@PortalController({ path: 'product' })
export class ProductAPIController {
    constructor(
        private readonly productService: ProductsService,
        private readonly cloudinaryService: CloudinaryService) { }

    @Get("getall")
    @UseGuards(AuthGuard)
    async getAllUser(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<any> {
        try {
            const result = await this.productService.getAll()
            if (result) {
                return res.status(HttpStatus.OK).json({ statusCode: 200, data: result })
            }
            return res.status(HttpStatus.BAD_REQUEST).json({ statusCode: 409, message: 'Error' })
        } catch (error) {
            next(error)
        }

    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getCategoryById(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Param('id') id: string) {
        try {
            const result = await this.productService.getById(String(id))
            if (result) {
                return res.status(HttpStatus.OK).json({ statusCode: 200, data: result })
            }
            return res.status(HttpStatus.BAD_REQUEST).json({ statusCode: 409, message: 'Error' })
        } catch (error) {
            next(error)
        }
    }

    @Post('create')
    @UseGuards(AuthGuard)
    async createCategory(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction,
        @Body() product: ProductDto
    ) {
        try {
            const result = await this.productService.create(product)
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
        @Param('id') id: string, @Body() product: ProductDto, @UploadedFile() file: Express.Multer.File
    ) {
        try {
            const img = await this.cloudinaryService.uploadFile(file)
            console.log(img.url)
            product.img = img.url
            const result = await this.productService.edit(String(id), product)
            if (result) {
                return res.status(HttpStatus.OK).json({ statusCode: 200, data: result })
            }
            return res.status(HttpStatus.BAD_REQUEST).json({ statusCode: 409, message: 'Error' })
        } catch (error) {
            next(error)
        }
    }

    @Post(':id/delete')
    @UseGuards(AuthGuard)
    async deleteUser(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Param('id') id: string) {
        try {
            const result = await this.productService.delete(String(id))
            if (result) {
                return res.status(HttpStatus.OK).json({ statusCode: 200, message: 'Delete success !' })
            }
            return res.status(HttpStatus.BAD_REQUEST).json({ statusCode: 409, message: 'Error' })
        } catch (error) {
            next(error)
        }
    }
}
