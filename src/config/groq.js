import Groq from "groq-sdk";
import { API_KEY } from "./envConfig.js";

const groq = new Groq({ apiKey: API_KEY });

export default groq;
