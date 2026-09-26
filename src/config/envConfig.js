import { config } from "dotenv";

config();

export const {
    API_KEY,
    GROQ_MODEL,
    PORT,
    DATABASE_URL,
    REDIS_URL,
    JWT_SECRET,
    JWT_REFRESH_SECRET,
    RESEND_API_KEY,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL,
    FRONTEND_URL
} = process.env;
