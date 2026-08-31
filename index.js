import dotenv from "dotenv";
dotenv.config();

import * as readline from "readline";
import { explainTopic } from "./services/aiService.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter a topic to learn: ", async (topic) => {
    const explanation = await explainTopic(topic);
    console.log("\n" + explanation);
    rl.close();
});