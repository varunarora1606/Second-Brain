import { Tag } from "../models/tag.model";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find();
  res
    .status(200)
    .json(new ApiResponse(200, { tags: tags }, "Successfully fetched tags"));
});

const createTag = asyncHandler(async (req, res) => {
  const { tag } = req.body;
  await Tag.create({ title: tag });
  res.status(200).json(new ApiResponse(200, tag, "Successfully added tag"));
});

export {getTags, createTag}
