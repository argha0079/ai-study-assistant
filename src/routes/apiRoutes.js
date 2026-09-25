import { Router } from "express";
import authRouter from "./authRoutes.js"
import explainRouter from "./explain.js"
const router = Router();

router.use("/users", authRouter);
router.use("/chats", explainRouter);

export default router;