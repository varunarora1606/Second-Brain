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
exports.deleteContent = exports.getAllContents = exports.addContent = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const content_model_1 = require("../models/content.model");
const ApiResponse_1 = require("../utils/ApiResponse");
const addContent = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { link, title, tags, type } = req.body;
    const lowerType = type.toLowerCase();
    const content = yield content_model_1.Content.create({
        link,
        title,
        tags,
        type: lowerType,
        userId: user === null || user === void 0 ? void 0 : user._id,
    });
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, content, "Content added successfully"));
}));
exports.addContent = addContent;
const getAllContents = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const contents = yield content_model_1.Content.find({ userId: user === null || user === void 0 ? void 0 : user._id });
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, contents, "Contents fetched successfully"));
}));
exports.getAllContents = getAllContents;
const deleteContent = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.params;
    const user = req.user;
    const content = yield content_model_1.Content.findOneAndDelete({
        _id: contentId,
        userId: user === null || user === void 0 ? void 0 : user._id,
    });
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, content, "Content deleted successfully"));
}));
exports.deleteContent = deleteContent;
