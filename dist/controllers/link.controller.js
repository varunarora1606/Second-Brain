"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserBrain = exports.createShareBrainLink = void 0;
const content_model_1 = require("../models/content.model");
const link_model_1 = require("../models/link.model");
const user_model_1 = require("../models/user.model");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
const createShareBrainLink = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw new ApiError_1.ApiError(400, "Invalid user");
    }
    const link = yield link_model_1.Link.findOne({ userId: user._id });
    if (link) {
        res
            .status(200)
            .json(new ApiResponse_1.ApiResponse(200, link, "Link fetched successfully"));
    }
    const hash = Math.floor(Math.random() * 100000000000).toString();
    const generatedLink = yield link_model_1.Link.create({ hash, userId: user._id });
    if (!generatedLink) {
        throw new ApiError_1.ApiError(500, "Server could not create link!! Retry....");
    }
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, { hash }, "Link generated successfully"));
}));
exports.createShareBrainLink = createShareBrainLink;
const getUserBrain = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hash } = req.params;
    const link = yield link_model_1.Link.findOne({ hash });
    if (!link) {
        throw new ApiError_1.ApiError(400, "Invalid link");
    }
    const content = yield content_model_1.Content.find({ userId: link.userId });
    const user = yield user_model_1.User.findById(link.userId);
    if (!user) {
        throw new ApiError_1.ApiError(400, "User not found");
    }
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, { username: user.username, content: content }, "User's brain fetched successfully"));
}));
exports.getUserBrain = getUserBrain;
