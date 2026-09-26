import {
    explainTopic,
    explainTopicStream,
    generateQuiz,
    clearHistory,
} from "../services/aiService.js";
import ValidationError from "../utils/errors/ValidationError.js";

export const explainController = async (req, res, next) => {
    try {
        const { topic } = req.body;
        if (!topic?.trim()) {
            throw new ValidationError("topic is required", { topic: true });
        }
        const explanation = await explainTopic(req.userId, topic);
        res.json({ explanation });
    } catch (error) {
        next(error);
    }
};

export const explainStreamController = async (req, res, next) => {
    try {
        const { topic, mode } = req.body;
        if (!topic?.trim()) {
            throw new ValidationError("topic is required", { topic: true });
        }

        // SSE headers
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.flushHeaders();

        await explainTopicStream(req.userId, topic, mode, (token) => {
            res.write(`data: ${JSON.stringify({ token })}\n\n`);
        });

        res.write("data: [DONE]\n\n");
        res.end();
    } catch (error) {
        if (!res.writableEnded) {
            res.write(
                `data: ${JSON.stringify({ error: { code: error.code || "SERVICE_ERROR", message: error.message } })}\n\n`
            );
            res.end();
        }
        next(error);
    }
};

export const quizController = async (req, res, next) => {
    try {
        const { topic, numQuestions, difficulty } = req.body;
        if (!topic?.trim()) {
            throw new ValidationError("topic is required", { topic: true });
        }
        const quiz = await generateQuiz(topic, numQuestions, difficulty);
        res.json({ quiz });
    } catch (error) {
        next(error);
    }
};

export const clearController = async (req, res, next) => {
    try {
        await clearHistory(req.userId);
        res.json({ message: "History cleared" });
    } catch (error) {
        next(error);
    }
};
