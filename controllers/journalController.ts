import { Request, Response } from "express";
import mongoose from "mongoose"; // Import mongoose for ObjectId conversion
import * as journalService from "../services/journalService";

export const createCode = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized: User ID is required" });
    return;
  }

  try {
    // Convert string userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const { code, topic } = await journalService.createJournalCode(userObjectId);
    res.status(201).json({ code, topic });
  } catch (error) {
    console.error("Create Code Error:", error);
    res.status(500).json({
      message: "Server error creating journal code",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const joinCode = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized: User ID is required" });
    return;
  }

  try {
    const { code } = req.body;

    if (!code || typeof code !== "string") {
      res.status(400).json({ message: "Valid code is required" });
      return;
    }

    // Convert string userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const result = await journalService.joinJournalCode(userObjectId, code);
    res.json(result);
  } catch (error) {
    console.error("Join Code Error:", error);
    res.status(500).json({
      message: "Server error joining journal code",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const postMessage = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized: User ID is required" });
    return;
  }

  const { code, message } = req.body;

  if (!code || !message) {
    res.status(400).json({ message: "Code and message are required" });
    return;
  }

  try {
    // Convert string userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Call the service function to post the message to the room
    const result = await journalService.postMessageToRoom(userObjectId, code, message);

    // Respond with the result from the service function
    res.status(201).json(result);
  } catch (error) {
    console.error("Post Message Error:", error);
    res.status(500).json({
      message: "Server error posting message",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getMessages = async (req: Request, res: Response): Promise<void> => {
  const { code } = req.params;

  if (!code) {
    res.status(400).json({ message: "Code is required" });
    return;
  }

  try {
    const result = await journalService.getRoomMessages(code);
    res.status(200).json(result);
  } catch (error) {
    console.error("Get Messages Error:", error);
    res.status(500).json({
      message: "Server error retrieving messages",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getUserJournals = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    // ✅ Convert userId from string to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const userJournals = await journalService.getUserJournals(userObjectId);
    res.status(200).json(userJournals);
  } catch (error) {
    console.error("Error fetching user journals:", error);
    res.status(500).json({ message: "Server error fetching journals" });
  }
};
