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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOutUser = exports.signInUser = exports.signUpUser = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const user_model_1 = require("../models/user.model");
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const contants_1 = require("../contants");
const signUpUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log("1");
    console.log(username);
    if (yield user_model_1.User.findOne({ username })) {
        throw new ApiError_1.ApiError(400, "User already exists");
    }
    const usernameLower = username.toLowerCase();
    const user = yield user_model_1.User.create({ username: usernameLower, password });
    user.password = "";
    res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, user, "User account created successfully"));
}));
exports.signUpUser = signUpUser;
const signInUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const usernameLower = username.toLowerCase();
    const user = yield user_model_1.User.findOne({ username: usernameLower, password });
    if (!user) {
        throw new ApiError_1.ApiError(403, "Wrong email or password");
    }
    const token = jsonwebtoken_1.default.sign({
        _id: user._id,
    }, process.env.JWT_SECRET);
    res
        .status(200)
        .cookie("token", token, contants_1.options)
        .json(new ApiResponse_1.ApiResponse(200, { user }, "User logged in successfully"));
}));
exports.signInUser = signInUser;
const logOutUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .status(200)
        .clearCookie("token")
        .json(new ApiResponse_1.ApiResponse(200, {}, "User logged out successfully"));
}));
exports.logOutUser = logOutUser;
