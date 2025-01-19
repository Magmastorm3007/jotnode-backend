import { Request, Response } from 'express';
import * as journalService from '../services/journalService';

export const createCode = async (
  req: Request, 
  res: Response
): Promise<void> => {
  // Strict type checking and conversion
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: User ID is required' });
    return;
  }

  try {
    const { code, topic } = await journalService.createJournalCode(userId);
    res.status(201).json({ code, topic });
  } catch (error) {
    console.error('Create Code Error:', error);
    res.status(500).json({ 
      message: 'Server error creating journal code',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const joinCode = async (
  req: Request, 
  res: Response
): Promise<void> => {
  // Strict type checking and conversion
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: User ID is required' });
    return;
  }

  try {
    const { code } = req.body;
    
    // Enhanced input validation
    if (!code || typeof code !== 'string') {
      res.status(400).json({ message: 'Valid code is required' });
      return;
    }

    const result = await journalService.joinJournalCode(userId, code);
    res.json({ 
      message: result.message, 
      topic: result.topic 
    });
  } catch (error) {
    console.error('Join Code Error:', error);
    res.status(500).json({ 
      message: 'Server error joining journal code',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
