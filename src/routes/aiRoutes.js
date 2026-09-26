import express from "express";
import {
    clearController,
    explainController,
    quizController,
    explainStreamController,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/explain", explainController);
router.post("/explain/stream", explainStreamController);
router.post("/quiz", quizController);
router.post("/clear", clearController);

export default router;
