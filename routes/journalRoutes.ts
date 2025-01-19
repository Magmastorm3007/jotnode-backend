import { Router } from "express";
import * as journalController from "../controllers/journalController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.post("/create-code", journalController.createCode);
router.post("/join-code", journalController.joinCode);

export default router;
