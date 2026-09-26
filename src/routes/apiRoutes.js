import { Router } from "express";
import authRouter from "./authRoutes.js";
import explainRouter from "./aiRoutes.js";
const router = Router();

router.use("/auth", authRouter);
router.use("/ai", explainRouter);

export default router;
