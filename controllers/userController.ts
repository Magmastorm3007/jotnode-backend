import { Request, Response } from "express";
import User from "../models/User";

// Controller to get user profile
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    // Ensure the userId is set by the authMiddleware
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Fetch user profile from the database
    const user = await User.findById(userId).select("-password"); // Exclude the password

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Return the user profile
    res.json({
      username: user.username,
      email: user.email,
      id:userId
      
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
