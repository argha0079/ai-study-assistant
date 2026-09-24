import model from "../config/gemini.js";

const sessions = new Map();

function getHistory(sessionId) {
    if (!sessions.has(sessionId)) sessions.set(sessionId, []);
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

export async function generateQuiz(topic, numQuestions = 5) {
    const prompt = `Generate a quiz about "${topic}" with exactly ${numQuestions} multiple choice questions.
Return ONLY a valid JSON array. No explanation, no markdown, no backticks.
Format:
[
  {
    "question": "...",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "answer": "A"
  }
]`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();

    try {
        const quiz = JSON.parse(raw);
        if (!Array.isArray(quiz)) throw new Error("Response is not an array");
        return quiz;
    } catch (err) {
        throw new Error(`Failed to parse quiz response: ${err.message}`);
    }
}

export function clearHistory(sessionId) {
    sessions.delete(sessionId);
}