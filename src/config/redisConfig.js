import Redis from "ioredis";
import { REDIS_URL } from "./envConfig.js";
import logger from "./loggerConfig.js";

const redis = new Redis(REDIS_URL);

export const connectRedis = async () => {
    redis.on("connect", () => logger.info("Redis connected"));
    redis.on("error", (err) =>
        logger.error("Redis error", { error: err.message })
    );
};

export default redis;
