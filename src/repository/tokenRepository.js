import { prisma } from "../config/dbConfig.js";
import PrismaError from "../utils/errors/PrismaError.js";
import AppError from "../utils/errors/AppError.js";
import { StatusCodes } from "http-status-codes";

export const createRefreshToken = async (token, userId, expiresAt) => {
    try {
        return await prisma.refreshToken.create({
            data: { token, userId, expiresAt },
        });
    } catch (error) {
        if (error.name.startsWith("Prisma")) {
            throw new PrismaError(error);
        }
        throw new AppError(
            "RepositoryError",
            "Cannot create refresh token",
            "There was an issue creating the refresh token",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "CREATE_TOKEN_ERROR"
        );
    }
};

export const findRefreshToken = async (token) => {
    try {
        return await prisma.refreshToken.findUnique({ where: { token } });
    } catch (error) {
        if (error.name.startsWith("Prisma")) {
            throw new PrismaError(error);
        }
        throw new AppError(
            "RepositoryError",
            "Cannot find refresh token",
            "There was an issue finding the refresh token",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "FIND_TOKEN_ERROR"
        );
    }
};

export const deleteRefreshToken = async (token) => {
    try {
        return await prisma.refreshToken.deleteMany({ where: { token } });
    } catch (error) {
        if (error.name.startsWith("Prisma")) {
            throw new PrismaError(error);
        }
        throw new AppError(
            "RepositoryError",
            "Cannot delete refresh token",
            "There was an issue deleting the refresh token",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "DELETE_TOKEN_ERROR"
        );
    }
};
