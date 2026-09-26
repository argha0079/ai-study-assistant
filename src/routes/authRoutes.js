import express from "express";
import {
    register,
    login,
    refresh,
    logout,
    verify,
    githubCallback,
} from "../controllers/authController.js";
import passport from "passport";

const router = express.Router();

router.post("/register", register);
router.post("/verify", verify);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

router.get(
    "/github",
    passport.authenticate("github", {
        scope: ["user:email"],
    })
);

router.get(
    "/github/callback",
    passport.authenticate("github", {
        session: false,
        failureRedirect: "/login",
    }),
    githubCallback
);

export default router;
