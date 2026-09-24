import * as readline from "readline";
import { explainTopic } from "./src/services/aiService.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const prompt = () => rl.question("You: ", async (input) => {

    const trimmed = input.trim();

    if (!trimmed) return prompt();
    if (trimmed === "/exit") {
        console.log("Goodbye!");
        rl.close();
        return;
    }
    if (trimmed === "/clear") {
        clearHistory();
        console.log("Conversation cleared.\n");
        return prompt();
    }
    try {
        const response = await explainTopic(trimmed);
        console.log(`\nAssistant: ${response}\n`);
    } catch (err) {
        console.error(`Error: ${err.message}\n`);
    }

    prompt();
});

console.log('AI Study Assistant ready. Type /clear to reset, /exit to quit.\n');

prompt();