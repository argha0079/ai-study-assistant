import { registerUser, loginUser, refreshAccessToken, logoutUser } from "../services/authService.js";
import ValidationError from "../utils/errors/ValidationError.js";

export const register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password) {
            throw new ValidationError("Email and password required", { email: !email, password: !password });
        }
        const data = await registerUser(email, password, name);
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ValidationError("Email and password required", { email: !email, password: !password });
        }
        const data = await loginUser(email, password);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw new ValidationError("Refresh token required", { refreshToken: true });
        }
        const data = await refreshAccessToken(refreshToken);
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (refreshToken) await logoutUser(refreshToken);
        res.json({ message: "Logged out" });
    } catch (error) {
        next(error);
    }
};