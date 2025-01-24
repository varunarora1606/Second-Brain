"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("./db/mongodb");
const app_1 = require("./app");
dotenv_1.default.config({
    path: "./.env"
});
(0, mongodb_1.dbConnect)()
    .then(() => {
    app_1.app.on("error", (err) => {
        console.log("Error: ", err);
        throw err;
    });
    app_1.app.listen(process.env.PORT || 8000, () => {
        console.log("Server is listening on port: " + process.env.PORT);
    });
})
    .catch((err) => {
    console.log("MongoDB connection failed!! " + err);
});
