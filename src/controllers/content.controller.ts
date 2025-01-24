import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Content } from "../models/content.model";
import { ApiResponse } from "../utils/ApiResponse";

const addContent = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const { link, title, tags, type } = req.body;

  const content = await Content.create({
    link,
    title,
    tags,
    type,
    userId: user?._id,
  });

  res
    .status(200)
    .json(new ApiResponse(200, content, "Content added successfully"));
});

const getAllContents = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;

  const contents = await Content.find({ userId: user?._id });

  res
    .status(200)
    .json(new ApiResponse(200, contents, "Contents fetched successfully"));
});

const deleteContent = asyncHandler(async (req: Request, res: Response) => {
  const { contentId } = req.params;
  const user = req.user;

  const content = await Content.findByIdAndDelete({contentId, userId: user?._id});

  res
    .status(200)
    .json(new ApiResponse(200, content, "Content deleted successfully"));
});

export {addContent, getAllContents, deleteContent}
