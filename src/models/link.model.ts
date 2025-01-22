import { model, Schema } from "mongoose";

const linkSchema = new Schema({
    hash: {
        type: String,
        unique: true,
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

export const Link = model("links", linkSchema)