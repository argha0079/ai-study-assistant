import model from "../config/gemini.js";

export async function explainTopic(topic) {
    const prompt = `You are an expert CS teacher. Explain this topic clearly and concisely to a first-year CS student: ${topic}`;

    const result = await model.generateContent(prompt);

    return result.response.text();
}