import dotenv from "dotenv";
import { dbConnect } from "./db/mongodb";
import { app } from "./app";

dotenv.config({
    path: "./.env"
})

dbConnect()
.then(() => {
    app.on("error", (err) => {
        console.log("Error: ", err);
        throw err;
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log("Server is listening on port: " + process.env.PORT);
    })
})
.catch((err) => {
    console.log("MongoDB connection failed!! " + err)
})