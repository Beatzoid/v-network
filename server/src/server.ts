global.__rootdir__ = __dirname || process.cwd();

import "dotenv-safe/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import logger from "./utils/logger";
import { initSentry } from "./utils/sentry";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRouter";

import { sanitizeInputMW } from "./middleware/sanitizeInputMiddleware";

if (
    process.env.ENABLE_SENTRY === "true" &&
    process.env.NODE_ENV !== "development"
)
    initSentry();

const app = express();
app.use(cors({ origin: "https://v-network.vercel.app", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", postRoutes);
app.use("/api", sanitizeInputMW, authRoutes);
app.use("/api", sanitizeInputMW, userRoutes);

mongoose.connect(
    process.env.MONGODB_URL,
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
