import mongoose, { Document } from "mongoose";

const Product = new mongoose.Schema(
    {
        name: { type: String, unique: true },
        img: String,
        price: String
    }, {
    collection: 'products',
}
)
export { Product }

export interface ProductType extends Document {
    name: string,
    img: string,
    price: string
}