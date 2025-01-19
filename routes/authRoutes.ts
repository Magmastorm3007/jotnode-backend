import { Router } from "express";
import { signup, login } from "../controllers/authController"; // Correct import

const router = Router();

router.post("/signup", signup); // Use the correct function from authController
router.post("/login", login); // Use the correct function from authController

export default router;
