import { Router } from "express";
import * as journalController from "../controllers/journalController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.post("/create-code", journalController.createCode);
router.post("/join-code", journalController.joinCode);
router.post("/post-message", journalController.postMessage);
router.get("/get-messages/:code", journalController.getMessages);
router.get("/user/journals", authMiddleware, journalController.getUserJournals);

export default router;
    