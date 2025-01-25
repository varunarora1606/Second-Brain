import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: { 
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true})

export const User = model('User', userSchema)