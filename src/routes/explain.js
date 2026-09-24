import express from "express";
import { explainTopic, clearHistory } from "../services/aiService.js";

const router = express.Router();

router.post("/explain", async (req, res) => {
    const { sessionId, topic } = req.body;

    if (!sessionId || !topic) {
        return res.status(400).json({ error: "sessionId and topic are required" });
    }

    try {
        const explanation = await explainTopic(sessionId, topic);
        res.json({ explanation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/clear", (req, res) => {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ error: "sessionId required" });
    clearHistory(sessionId);
    res.json({ message: "History cleared" });
});

export default router;