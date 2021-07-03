import "dotenv-safe/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./utils/logger";
import authRoutes from "./routes/authRoute";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
// eslint-disable-next-line @typescript-eslint/no-var-requires
app.use("/api", authRoutes);

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
