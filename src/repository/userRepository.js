import { prisma } from "../config/dbConfig.js";
import PrismaError from "../utils/errors/PrismaError.js";
import AppError from "../utils/errors/AppError.js";
import { StatusCodes } from "http-status-codes";

export const findUserByEmail = async (email) => {
    try {
        return await prisma.user.findUnique({ where: { email } });
    } catch (error) {
        if (error.name.startsWith("Prisma")) {
            throw new PrismaError(error);
        }
        throw new AppError(
            "RepositoryError",
            "Cannot find user",
            "There was an issue finding the user",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "FIND_USER_ERROR"
        );
    }
};

export const createUser = async (email, hashedPassword, name) => {
    try {
        return await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });
    } catch (error) {
        if (error.name.startsWith("Prisma")) {
            throw new PrismaError(error);
        }
        throw new AppError(
            "RepositoryError",
            "Cannot create user",
            "There was an issue creating the user",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "CREATE_USER_ERROR"
        );
    }
};

export const markUserVerified = async (email) => {
    try {
        return await prisma.user.update({
            where: { email },
            data: { isVerified: true },
        });
    } catch (error) {
        if (error.name.startsWith("Prisma")) {
            throw new PrismaError(error);
        }
        throw new AppError(
            "RepositoryError",
            "Cannot verify user",
            "There was an issue verifying the user",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "VERIFY_USER_ERROR"
        );
    }
};

export const findUserByProvider = async (provider, providerId) => {
    try {
        return await prisma.user.findFirst({
            where: {
                provider,
                providerId,
            },
        });
    } catch (error) {
        if (error.name.startsWith("Prisma")) {
            throw new PrismaError(error);
        }

        throw new AppError(
            "RepositoryError",
            "Cannot find OAuth user",
            "There was an issue finding the OAuth user",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "FIND_OAUTH_USER_ERROR"
        );
    }
};

export const createOAuthUser = async (email, name, provider, providerId) => {
    try {
        return await prisma.user.create({
            data: {
                email,
                name,
                password: null,
                provider,
                providerId,
                isVerified: true,
            },
        });
    } catch (error) {
        if (error.name.startsWith("Prisma")) {
            throw new PrismaError(error);
        }

        throw new AppError(
            "RepositoryError",
            "Cannot create OAuth user",
            "There was an issue creating the OAuth user",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "CREATE_OAUTH_USER_ERROR"
        );
    }
};

export const linkProvider = async (userId, provider, providerId) => {
    try {
        return await prisma.user.update({
            where: { id: userId },
            data: {
                provider,
                providerId,
            },
        });
    } catch (error) {
        if (error.name.startsWith("Prisma")) {
            throw new PrismaError(error);
        }

        throw new AppError(
            "RepositoryError",
            "Cannot link OAuth provider",
            "There was an issue linking the OAuth provider",
            StatusCodes.INTERNAL_SERVER_ERROR,
            "LINK_OAUTH_PROVIDER_ERROR"
        );
    }
};
