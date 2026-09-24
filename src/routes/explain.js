import express from "express";
import { validateExplainRequest } from "../middleware/validate.js";
import { clearHistoryController, explainController, quizController } from "../controllers/explainController.js";

const router = express.Router();

router.post("/explain", validateExplainRequest, explainController);
router.post("/quiz", quizController);
router.post("/clear", clearHistoryController);

export default router;