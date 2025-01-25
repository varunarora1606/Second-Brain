import { model, Schema } from "mongoose";

const tagSchema = new Schema({
    title: {
        type: String,
        unique: true,
        lowercase: true
    }
})

export const Tag = model("tags", tagSchema)