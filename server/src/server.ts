import "dotenv-safe/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import logger from "./utils/logger";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (_req, res) => {
    return res.json({ msg: "Hello world!" });
});

const MONGO_URL = process.env.MONGODB_URL;
mongoose.connect(
    MONGO_URL!,
    {
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    (err) => {
        if (err) throw err;
        logger.info("Successfully connected to MongoDB!");
    }
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
    logger.info(`Server is now running on http://localhost:${PORT}`)
);
