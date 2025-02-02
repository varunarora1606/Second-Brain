import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { Content } from "../models/content.model";
import { ApiResponse } from "../utils/ApiResponse";

const addContent = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const { link, title, tags, description } = req.body;
  let type: string;
  if (link) {
    const site = link.split("/")[2];
    switch (site) {
      case "youtu.be":
        type = "youtube";
        break;
      case "x.com":
        type = "twitter";
        break;
      case "google.com":
        type = "google";
        break;
      case "instagram.com":
        type = "instagram";
        break;
      default:
        type = "document";
        break;
    }
  } else {
    type = "document";
  }
  const lowerType = type.toLowerCase();

  const content = await Content.create({
    link,
    title,
    tags,
    type: lowerType,
    userId: user?._id,
    description,
  });

  res
    .status(200)
    .json(new ApiResponse(200, content, "Content added successfully"));
});

const getAllContents = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;

  const contents = await Content.find({ userId: user?._id }).sort({
    createdAt: -1,
  });

  res
    .status(200)
    .json(new ApiResponse(200, contents, "Contents fetched successfully"));
});

const deleteContent = asyncHandler(async (req: Request, res: Response) => {
  const { contentId } = req.params;
  const user = req.user;

  const content = await Content.findOneAndDelete({
    _id: contentId,
    userId: user?._id,
  });

  res
    .status(200)
    .json(new ApiResponse(200, content, "Content deleted successfully"));
});

export { addContent, getAllContents, deleteContent };
