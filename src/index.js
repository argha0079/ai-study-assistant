import express from "express";
import explainRouter from "./routes/explain.js";
import errorHandler from "./middleware/errorHandler.js";
import { PORT } from "./config/envConfig.js";

const app = express();
const setupAndStartServer = () => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/health", (req, res) => {
        res.status(200).json({ 
            status: "ok", uptime: process.uptime() 
        });
    });

    app.use("/api", explainRouter);
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
}

setupAndStartServer();