import { explainTopic, clearHistory, generateQuiz } from "../services/aiService.js";

export async function explainController(req, res) {
    const { sessionId, topic } = req.body;
    const explanation = await explainTopic(sessionId, topic);
    res.status(200).json({
        explanation
    })
}
export async function quizController(req, res) {
    const { topic, numQuestions } = req.body;
    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
        return res.status(400).json({
            error: { code: "INVALID_INPUT", message: "topic must be a non-empty string" }
        });
    }
    const quiz = await generateQuiz(topic.trim(), numQuestions);
    res.status(200).json({ quiz });
}
export async function clearHistoryController (req, res) {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({
        error: { code: "INVALID_INPUT", message: "sessionId required" }
    });
    clearHistory(sessionId);
    res.json({ message: "History cleared" });
}
