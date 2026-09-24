import { prisma } from "../config/dbConfig.js";

export const findUserByEmail = async (email) => {
    return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (email, hashedPassword, name) => {
    return prisma.user.create({
        data: { email, password: hashedPassword, name },
    });
};