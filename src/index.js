import express from "express";
import cors from "cors";
import apiRoutes from "./routes/apiRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import morganMiddleware from "./config/morganConfig.js";
import logger from "./config/loggerConfig.js";
import cookieParser from "cookie-parser";
import { PORT } from "./config/envConfig.js";
import { connectDatabase } from "./config/dbConfig.js";
import { connectRedis } from "./config/redisConfig.js";
import passport from "passport";
import "./config/passport.js";

const app = express();
const setupAndStartServer = () => {
    app.use(
        cors({
            origin: [
                "http://localhost:5173",
                "https://ai-study-assistant-frontend-j44eg030i-hack-nova5.vercel.app",
            ],
            credentials: true,
        })
    );
    app.use(morganMiddleware);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(passport.initialize());

    app.get("/health", (req, res) => {
        res.status(200).json({
            status: "ok",
            uptime: process.uptime(),
        });
    });

    app.use("/api", apiRoutes);
    app.use(errorHandler);

    app.listen(PORT, async () => {
        logger.info(`Server running on port ${PORT}`);
        await connectDatabase();
        await connectRedis();
    });
};

setupAndStartServer();
