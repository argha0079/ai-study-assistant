import { config } from "dotenv";

config();

export const {
    API_KEY,
    GROQ_MODEL,
    PORT,
    DATABASE_URL,
    REDIS_URL,
    JWT_SECRET,
    JWT_REFRESH_SECRET
} = process.env;