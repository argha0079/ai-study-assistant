import { config } from "dotenv";

config();

export const {
    API_KEY,
    PORT,
    DATABASE_URL,
    JWT_SECRET,
    JWT_REFRESH_SECRET
} = process.env;