import mongoose, { Document } from "mongoose";

const User = new mongoose.Schema(
    {
        username: {
            type: String, require: true,
            unique: true,
            index: true,
        },
        password: { type: String, require: true },
        role: { type: Number, require: true },
        phone: String,
        email: String,
        avatar: String,
        verifyCode: String
    }, {
    collection: 'users',
}
)
export { User }

export interface UserType extends Document {
    username: string,
    password: string,
    phone: string,
    email: string,
    verifyCode: string
}