import { Module } from '@nestjs/common';
import { ProductAPIController } from './controller/product.api.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product } from './models/product.model';
import { CloudinaryModule } from 'src/config/cloudinary/cloudinary.module';
import { ProductsService } from './services/products.service';
@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'Product',
      schema: Product
    },
  ]),
    CloudinaryModule
  ],
  controllers: [ProductAPIController],
  providers: [ProductsService]
})
export class ProductsModule { }
