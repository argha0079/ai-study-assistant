import { registerUser, loginUser, refreshAccessToken, logoutUser } from "../services/authService.js";

export const register = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: { code: "INVALID_INPUT", message: "Email and password required" } });
    }
    const data = await registerUser(email, password, name);
    res.status(201).json(data);
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: { code: "INVALID_INPUT", message: "Email and password required" } });
    }
    const data = await loginUser(email, password);
    res.json(data);
};

export const refresh = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ error: { code: "INVALID_INPUT", message: "Refresh token required" } });
    }
    const data = await refreshAccessToken(refreshToken);
    res.json(data);
};

export const logout = async (req, res) => {
    const { refreshToken } = req.body;
    if (refreshToken) await logoutUser(refreshToken);
    res.json({ message: "Logged out" });
};