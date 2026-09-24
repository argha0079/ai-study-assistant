import { config } from "dotenv";

config();

export const {
    API_KEY,
    PORT,
    DATABASE_URL
} = process.env;