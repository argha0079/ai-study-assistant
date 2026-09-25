import { explainTopic, explainTopicStream, generateQuiz, clearHistory } from "../services/aiService.js";

export const explainController = async (req, res) => {
    const { topic } = req.body;
    if (!topic?.trim()) {
        return res.status(400).json({ error: { code: "INVALID_INPUT", message: "topic is required" } });
    }
    const explanation = await explainTopic(req.userId, topic);
    res.json({ explanation });
};

export const explainStreamController = async (req, res) => {
    const { topic, mode } = req.body;
    if (!topic?.trim()) {
        return res.status(400).json({ error: { code: "INVALID_INPUT", message: "topic is required" } });
    }

    // SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    try {
        await explainTopicStream(req.userId, topic, mode, (token) => {
            res.write(`data: ${JSON.stringify({ token })}\n\n`);
        });

        res.write("data: [DONE]\n\n");
    } catch (err) {
        res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    }

    res.end();
};

export const quizController = async (req, res) => {
    const { topic, numQuestions, difficulty } = req.body;
    if (!topic?.trim()) {
        return res.status(400).json({ error: { code: "INVALID_INPUT", message: "topic is required" } });
    }
    const quiz = await generateQuiz(topic, numQuestions, difficulty);
    res.json({ quiz });
};

export const clearController = async (req, res) => {
    await clearHistory(req.userId);
    res.json({ message: "History cleared" });
};