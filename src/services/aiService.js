import groq from "../config/groq.js";

const sessions = new Map();

function getHistory(sessionId) {
    if (!sessions.has(sessionId)) sessions.set(sessionId, []);
    return sessions.get(sessionId);
}

export async function explainTopic(sessionId, userMessage) {
    const history = getHistory(sessionId);

    history.push({ role: "user", content: userMessage });

    const result = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
            { role: "system", content: "You are a helpful study assistant. Explain concepts clearly and concisely." },
            ...history,
        ],
    });

    const responseText = result.choices[0].message.content;
    history.push({ role: "assistant", content: responseText });

    return responseText;
}

export async function generateQuiz(topic, numQuestions = 5, difficulty = "medium") {
    const difficultyInstructions = {
        easy: "Focus on basic definitions and simple recall.",
        medium: "Focus on application and understanding.",
        hard: "Focus on edge cases, tradeoffs, and deep understanding.",
    };

    const result = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
            {
                role: "system",
                content: "You are a quiz generator. Return ONLY valid JSON arrays. No markdown, no backticks, no explanation.",
            },
            {
                role: "user",
                content: `Generate a quiz about "${topic}" with exactly ${numQuestions} multiple choice questions.
Difficulty: ${difficulty} — ${difficultyInstructions[difficulty]}

Each question must follow this exact format:
[
  {
    "question": "What is a base case in recursion?",
    "options": ["A. The first function call", "B. The condition that stops recursion", "C. The return value", "D. The recursive call"],
    "answer": "B",
    "explanation": "The base case stops recursive calls, preventing infinite recursion."
  }
]`,
            },
        ],
    });

    const raw = result.choices[0].message.content.trim();

    try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) throw new Error("Response is not an array");
        return parsed;
    } catch (err) {
        throw new Error(`Failed to parse quiz response: ${err.message}`);
    }
}

export function clearHistory(sessionId) {
    sessions.delete(sessionId);
}