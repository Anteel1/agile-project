import { Module } from '@nestjs/common';
import { CategoriesAPIController } from './controller/category.api.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category } from './models/category.model';
import { CloudinaryModule } from 'src/config/cloudinary/cloudinary.module';
import { CategoriesService } from './services/categories.service';
@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'Category',
      schema: Category
    },
  ]),
    CloudinaryModule
  ],
  controllers: [CategoriesAPIController],
  providers: [CategoriesService]
})
export class CategoriesModule { }
