import { config } from "dotenv";

config();

export const {
    API_KEY,
    PORT
} = process.env;