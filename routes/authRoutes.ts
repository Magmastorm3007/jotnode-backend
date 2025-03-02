import { Router } from "express";
import { signup, login,signout } from "../controllers/authController"; // Correct import
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();

router.post("/signup", signup); // Use the correct function from authController
router.post("/login", login); // Use the correct function from authController
router.post("/signout", signout); 

export default router;
