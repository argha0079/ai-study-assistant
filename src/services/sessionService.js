import redis from "../config/redisConfig.js";

const TTL = 60 * 60 * 24; 

export const getHistory = async (userId) => {
    const data = await redis.get(`session:${userId}`);
    return data ? JSON.parse(data) : [];
};

export const saveHistory = async (userId, history) => {
    await redis.setex(`session:${userId}`, TTL, JSON.stringify(history));
};

export const deleteHistory = async (userId) => {
    await redis.del(`session:${userId}`);
};