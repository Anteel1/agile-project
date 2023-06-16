import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from './config/cloudinary/cloudinary.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './product/products.module';

@Module({
  imports: [UsersModule, CategoriesModule, ProductsModule,
    MongooseModule.forRoot('mongodb+srv://luonglkvn100:10l10l10L@demomongodb.rshjmd0.mongodb.net/demoNestjs?retryWrites=true&w=majority'
      , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }), CloudinaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
