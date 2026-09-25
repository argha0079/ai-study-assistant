import redis from "../config/redisConfig.js";

const TTL = 60 * 60 * 24;

const MAX_MESSAGES = 10; 

export const getHistory = async (userId) => {
    const data = await redis.get(`session:${userId}`);
    const history = data ? JSON.parse(data) : [];

    if (history.length > MAX_MESSAGES) {
        return history.slice(-MAX_MESSAGES);
    }
    return history;
};


export const saveHistory = async (userId, history) => {
    await redis.setex(`session:${userId}`, TTL, JSON.stringify(history));
};

export const deleteHistory = async (userId) => {
    await redis.del(`session:${userId}`);
};