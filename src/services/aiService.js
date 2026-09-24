import model from "../config/gemini.js";

const sessions = new Map();

function getHistory(sessionId) {
    if (!sessions.has(sessionId)) {
        sessions.set(sessionId, []);
    }
    return sessions.get(sessionId);
}

export async function explainTopic(sessionId, userMessage) {
    const history = getHistory(sessionId);

    history.push({ role: "user", parts: [{ text: userMessage }] });

    const result = await model.generateContent({
        contents: history,
        systemInstruction: "You are a helpful study assistant. Explain concepts clearly and concisely.",
    });

    const responseText = result.response.text();
    history.push({ role: "model", parts: [{ text: responseText }] });

    return responseText;
}

export function clearHistory(sessionId) {
    sessions.delete(sessionId);
}