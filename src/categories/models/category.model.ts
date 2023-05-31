import mongoose, { Document } from "mongoose";

const Category = new mongoose.Schema(
    {
        name: { type: String, unique: true },
        img: String
    }, {
    collection: 'categories',
}
)
export { Category }

export interface CategoryType extends Document {
    name: string,
    img: string
}