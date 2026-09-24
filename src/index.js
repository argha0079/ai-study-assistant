import express from "express";
import cors from "cors";
import explainRouter from "./routes/explain.js";
import errorHandler from "./middleware/errorHandler.js";
import { PORT } from "./config/envConfig.js";
import { connectDatabase } from "./config/dbConfig.js";

const app = express();
const setupAndStartServer = () => {

    app.use(cors({ origin: "http://localhost:5173" }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/health", (req, res) => {
        res.status(200).json({ 
            status: "ok", uptime: process.uptime() 
        });
    });

    app.use("/api", explainRouter);
    app.use(errorHandler);

    app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`)
        await connectDatabase();
    });
}

setupAndStartServer();