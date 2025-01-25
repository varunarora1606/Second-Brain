"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const mongoose_1 = require("mongoose");
const linkSchema = new mongoose_1.Schema({
    hash: {
        type: String,
        unique: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
});
exports.Link = (0, mongoose_1.model)("links", linkSchema);
