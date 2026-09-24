import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_REFRESH_SECRET } from "../config/envConfig.js";
import { findUserByEmail, createUser } from "../repository/userRepository.js";
import { createRefreshToken, findRefreshToken, deleteRefreshToken } from "../repository/tokenRepository.js";

const SALT_ROUNDS = 10;
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
    return { accessToken, refreshToken };
};

const getRefreshExpiry = () => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    return expiresAt;
};

export const registerUser = async (email, password, name) => {
    const existing = await findUserByEmail(email);
    if (existing) throw new Error("Email already in use");

    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser(email, hashed, name);

    const { accessToken, refreshToken } = generateTokens(user.id);
    await createRefreshToken(refreshToken, user.id, getRefreshExpiry());

    return { accessToken, refreshToken, user: { id: user.id, email: user.email, name: user.name } };
};

export const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const { accessToken, refreshToken } = generateTokens(user.id);
    await createRefreshToken(refreshToken, user.id, getRefreshExpiry());

    return { accessToken, refreshToken, user: { id: user.id, email: user.email, name: user.name } };
};

export const refreshAccessToken = async (refreshToken) => {
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    const stored = await findRefreshToken(refreshToken);
    if (!stored || stored.expiresAt < new Date()) throw new Error("Invalid refresh token");

    await deleteRefreshToken(refreshToken);

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(payload.userId);
    await createRefreshToken(newRefreshToken, payload.userId, getRefreshExpiry());

    return { accessToken, refreshToken: newRefreshToken };
};

export const logoutUser = async (refreshToken) => {
    await deleteRefreshToken(refreshToken);
};