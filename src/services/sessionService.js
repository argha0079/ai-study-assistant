import redis from "../config/redisConfig.js";
import ServiceError from "../utils/errors/ServiceError.js";

const TTL = 60 * 60 * 24;
const MAX_MESSAGES = 10;

export const getHistory = async (userId) => {
    try {
        const data = await redis.get(`session:${userId}`);
        const history = data ? JSON.parse(data) : [];

        if (history.length > MAX_MESSAGES) {
            return history.slice(-MAX_MESSAGES);
        }
        return history;
    } catch (error) {
        throw new ServiceError(
            "Failed to retrieve session history",
            error.message
        );
    }
};

export const saveHistory = async (userId, history) => {
    try {
        await redis.setex(`session:${userId}`, TTL, JSON.stringify(history));
    } catch (error) {
        throw new ServiceError("Failed to save session history", error.message);
    }
};

export const deleteHistory = async (userId) => {
    try {
        await redis.del(`session:${userId}`);
    } catch (error) {
        throw new ServiceError(
            "Failed to delete session history",
            error.message
        );
    }
};
