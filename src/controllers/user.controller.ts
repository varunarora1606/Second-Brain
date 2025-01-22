import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import jwt from "jsonwebtoken";

const signUpUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (await User.findOne({ username })) {
    throw new ApiError(400, "User already exists");
  }
  const usernameLower = username.toLowerCase();
  const user = await User.create({ username: usernameLower, password });
  user.password = "";
  res
    .status(200)
    .json(new ApiResponse(200, user, "User account created successfully"));
});

const signInUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const usernameLower = username.toLowerCase();
  const user = await User.findOne({ username: usernameLower, password });
  if (!user) {
    throw new ApiError(403, "Wrong email or password");
  }
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
  res
    .status(200)
    .json(new ApiResponse(200, { token }, "User logged in successfully"));
});

export { signUpUser, signInUser };
