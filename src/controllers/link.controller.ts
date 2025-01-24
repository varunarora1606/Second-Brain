import { Content } from "../models/content.model";
import { Link } from "../models/link.model";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const createShareBrainLink = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "Invalid user");
  }
  const link = await Link.findOne({ userId: user._id });

  if (link) {
    res
      .status(200)
      .json(new ApiResponse(200, link, "Link fetched successfully"));
  }

  const hash = Math.floor(Math.random() * 100000000000).toString();
  const generatedLink = await Link.create({ hash, userId: user._id });

  if (!generatedLink) {
    throw new ApiError(500, "Server could not create link!! Retry....");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { hash }, "Link generated successfully"));
});

const getUserBrain = asyncHandler(async (req, res) => {
  const { hash } = req.body;

  const link = await Link.findOne({ hash });

  if (!link) {
    throw new ApiError(400, "Invalid link");
  }

  const content = await Content.find({ userId: link.userId });

  const user = await User.findById(link.userId);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { username: user.username, content: content },
        "User's brain fetched successfully"
      )
    );
});

export { createShareBrainLink, getUserBrain };
