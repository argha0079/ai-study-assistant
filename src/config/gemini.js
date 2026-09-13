import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY } from "./envConfig.js"

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

export default model;