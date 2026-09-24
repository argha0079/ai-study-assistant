export function validateExplainRequest(req, res, next) {
    const { sessionId, topic } = req.body;

    if (!sessionId || typeof sessionId !== "string") {
        return res.status(400).json({
            error: { code: "INVALID_INPUT", message: "sessionId must be a non-empty string" }
        });
    }

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
        return res.status(400).json({
            error: { code: "INVALID_INPUT", message: "topic must be a non-empty string" }
        });
    }

    req.body.topic = topic.trim();
    next();
}