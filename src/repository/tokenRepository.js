import { prisma } from "../config/dbConfig.js";

export const createRefreshToken = async (token, userId, expiresAt) => {
    return prisma.refreshToken.create({
        data: { token, userId, expiresAt },
    });
};

export const findRefreshToken = async (token) => {
    return prisma.refreshToken.findUnique({ where: { token } });
};

export const deleteRefreshToken = async (token) => {
    return prisma.refreshToken.deleteMany({ where: { token } });
};