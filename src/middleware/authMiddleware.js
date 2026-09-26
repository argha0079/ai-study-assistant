import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envConfig.js";

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: { code: "UNAUTHORIZED", message: "No token provided" },
        });
    }
    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch {
        return res.status(401).json({
            error: {
                code: "UNAUTHORIZED",
                message: "Invalid or expired token",
            },
        });
    }
};
