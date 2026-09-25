import groq from "../config/groq.js";
import { getHistory, saveHistory, deleteHistory } from "./sessionService.js";
import { GROQ_MODEL } from "../config/envConfig.js"

const systemPrompts = {
    eli5: `You are a study assistant explaining to a 10-year-old.
Use simple words, fun analogies, and short sentences.
No code. No jargon. Make it feel like a story.`,

    standard: `You are a study assistant for computer science students.
Always respond in this exact format:
**What it is:** (1 sentence)
**Why it matters:** (1-2 sentences)
**Example:** (code or real-world, 3-5 lines)
**Remember:** (one key takeaway)
Keep total response under 250 words.`,

    senior: `You are a study assistant for senior software engineers.
Skip fundamentals. Focus on edge cases, tradeoffs, performance implications, and production considerations.
Use technical terminology freely. Include non-obvious behavior and gotchas.`,
};

export async function explainTopicStream(userId, userMessage, mode = "standard", onToken) {
    const history = await getHistory(userId);
    history.push({ role: "user", content: userMessage });

    const systemPrompt = systemPrompts[mode] || systemPrompts.standard;

    const stream = await groq.chat.completions.create({
        model: GROQ_MODEL,
        temperature: mode === "eli5" ? 0.7 : 0.3,
        messages: [
            { role: "system", content: systemPrompt },
            ...history,
        ],
        stream: true,
    });

    let fullResponse = "";

    for await (const chunk of stream) {
        const token = chunk.choices[0]?.delta?.content || "";
        if (token) {
            fullResponse += token;
            onToken(token);
        }
    }

    history.push({ role: "assistant", content: fullResponse });
    await saveHistory(userId, history);
    return fullResponse;
}
export async function explainTopic(sessionId, userMessage) {
    const history = getHistory(sessionId);

    history.push({ role: "user", content: userMessage });

    const result = await groq.chat.completions.create({
        model: GROQ_MODEL,
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
        model: GROQ_MODEL,
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

export async function clearHistory(userId) {
    await deleteHistory(userId);
}

