import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CategoryType } from '../models/category.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel('Category')
        private readonly model: Model<CategoryType>) { }


    async getAll() {
        return await this.model.find({})
    }

    async create(category: CategoryDto) {
        try {
            const newCate = new this.model(category)
            return await newCate.save()
        } catch (error) {
            throw new BadRequestException
        }
    }

    async getById(id: string) {
        return await this.model.findOne({ _id: id })
    }

    async edit(_id: string, category: CategoryDto) {
        return await this.model.findOneAndUpdate({ sid: _id }, category)
    }

    async delete(_id: string) {
        return await this.model.findByIdAndDelete({ _id: _id })
    }
}
