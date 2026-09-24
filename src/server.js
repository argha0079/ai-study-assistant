import express from "express";
import explainRouter from "./routes/explain.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
});

app.use("/api", explainRouter);
app.use(errorHandler); // must be last

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));