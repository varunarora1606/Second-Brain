"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const mongoose_1 = require("mongoose");
const contentSchema = new mongoose_1.Schema({
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
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Tag",
        },
    ],
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
exports.Content = (0, mongoose_1.model)("contents", contentSchema);
