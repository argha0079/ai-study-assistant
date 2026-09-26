import express from "express";
import {
    register,
    login,
    refresh,
    logout,
    verify,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verify);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
