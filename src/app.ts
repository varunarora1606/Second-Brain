import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))
app.use(express.json());

// Routes import
import userRouter from "./routes/user.routes"
import contentRouter from "./routes/content.routes"
import brainRouter from "./routes/brain.routes"
import tagRouter from "./routes/tag.routes"

app.use("/api/v1/user", userRouter)
app.use("/api/v1/content", contentRouter)
app.use("/api/v1/brain", brainRouter)
app.use("/api/v1/tag", tagRouter)

export { app };
