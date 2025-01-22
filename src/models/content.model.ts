import { model, Schema } from "mongoose";

const contentSchema = new Schema(
  {
    link: {
      type: String,
    },
    title: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Content = model("contents", contentSchema);
