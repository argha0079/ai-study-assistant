import {
    registerUser,
    loginUser,
    loginWithOAuth,
    refreshAccessToken,
    logoutUser,
    verifyEmail,
} from "../services/authService.js";
import ValidationError from "../utils/errors/ValidationError.js";
import UnauthorizedError from "../utils/errors/UnauthorizedError.js";
import { FRONTEND_URL } from "../config/envConfig.js";

export const register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password) {
            throw new ValidationError("Email and password required", {
                email: !email,
                password: !password,
            });
        }
        const data = await registerUser(email, password, name);
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
};

export const verify = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            throw new ValidationError("Email and OTP required", {
                email: !email,
                otp: !otp,
            });
        }
        await verifyEmail(email, otp);
        res.json({ message: "Email verified successfully" });
    } catch (error) {
        next(error);
    }
};

export const githubCallback = async (req, res, next) => {
    try {
        const data = await loginWithOAuth(req.user.id);
        res.cookie("refreshToken", data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.redirect(FRONTEND_URL);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ValidationError("Email and password required", {
                email: !email,
                password: !password,
            });
        }
        const data = await loginUser(email, password);
        res.cookie("refreshToken", data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            accessToken: data.accessToken,
            user: data.user,
        });
    } catch (error) {
        next(error);
    }
};

export const refresh = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new UnauthorizedError(
                "Refresh token required",
                "REFRESH_TOKEN_REQUIRED"
            );
        }
        const data = await refreshAccessToken(refreshToken);
        res.cookie("refreshToken", data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({
            accessToken: data.accessToken,
        });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            await logoutUser(refreshToken);
        }

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        res.json({ message: "Logged out" });
    } catch (error) {
        next(error);
    }
};