"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express_1.default.json({ limit: "16kb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use((0, cookie_parser_1.default)());
// Routes import
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const content_routes_1 = __importDefault(require("./routes/content.routes"));
const brain_routes_1 = __importDefault(require("./routes/brain.routes"));
const tag_routes_1 = __importDefault(require("./routes/tag.routes"));
app.use("/api/v1/user", user_routes_1.default);
app.use("/api/v1/content", content_routes_1.default);
app.use("/api/v1/brain", brain_routes_1.default);
app.use("/api/v1/tag", tag_routes_1.default);
