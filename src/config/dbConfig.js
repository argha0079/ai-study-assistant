import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "./envConfig.js";
import logger from "./loggerConfig.js";

const adapter = new PrismaPg({
    connectionString: DATABASE_URL,
});

export const prisma = new PrismaClient({
    adapter,
});

export async function connectDatabase() {
    try {
        await prisma.$connect();
        logger.info("[Database]: Connected successfully");
    } catch (error) {
        logger.error("[Database]: Failed to connect", error);
        process.exit(1);
    }
}
