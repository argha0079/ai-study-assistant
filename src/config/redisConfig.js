import Redis from "ioredis";
import { REDIS_URL } from "./envConfig.js";

const redis = new Redis(REDIS_URL);

redis.on("connect", () => console.log("Redis connected"));
redis.on("error", (err) => console.error("Redis error:", err));

export default redis;