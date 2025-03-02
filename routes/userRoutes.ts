import express from "express";
import { getUserProfile } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
"../controllers/userController"
// Protect the route using authMiddleware
router.get("/profile", authMiddleware, getUserProfile);

export default router;
