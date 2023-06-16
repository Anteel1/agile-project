import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ProductType } from '../models/product.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel('Product')
        private readonly model: Model<ProductType>) { }


    async getAll() {
        return await this.model.find({})
    }

    async create(product: ProductDto) {
        try {
            const newCate = new this.model(product)
            return await newCate.save()
        } catch (error) {
            throw new BadRequestException
        }
    }

    async getById(id: string) {
        return await this.model.findOne({ _id: id })
    }

    async edit(_id: string, product: ProductDto) {
        return await this.model.findOneAndUpdate({ _id: _id }, product, { new: true })
    }

    async delete(_id: string) {
        return await this.model.findByIdAndDelete({ _id: _id })
    }
}
