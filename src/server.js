import express from "express";
import explainRouter from "./routes/explain.js";

const app = express();
app.use(express.json());
app.use("/api", explainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));