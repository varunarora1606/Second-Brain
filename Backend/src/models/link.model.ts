import { model, Schema } from "mongoose";

const linkSchema = new Schema({
    hash: {
        type: String,
        unique: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

export const Link = model("links", linkSchema)