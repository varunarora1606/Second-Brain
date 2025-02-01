import { model, Schema } from "mongoose";

const contentSchema = new Schema(
  {
    title: {
      type: String,
    },
    link: {
      type: String,
    },
    type: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Content = model("contents", contentSchema);
