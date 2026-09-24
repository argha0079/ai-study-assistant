import express from "express";
import { explainTopic, clearHistory } from "../services/aiService.js";
import { validateExplainRequest } from "../middleware/validate.js";

const router = express.Router();

router.post("/explain", validateExplainRequest, async (req, res, next) => {
    try {
        const { sessionId, topic } = req.body;
        const explanation = await explainTopic(sessionId, topic);
        res.json({ explanation });
    } catch (err) {
        next(err); // passes to global error handler
    }
});

router.post("/clear", (req, res) => {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({
        error: { code: "INVALID_INPUT", message: "sessionId required" }
    });
    clearHistory(sessionId);
    res.json({ message: "History cleared" });
});

export default router;