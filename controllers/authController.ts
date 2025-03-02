import { Request, Response } from 'express';
import * as authService from '../services/authService';

// Explicitly typing the controller functions with Promise<void> to signal that we don't return a value
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const { token, error } = await authService.signup(username, email, password);

    // Check for error and return response accordingly
    if (error) {
      res.status(400).json({ message: error });
      return; // Ensure we exit after sending the response
    }

    // Return the generated token if no error
    res.json({ token });
  } catch (error: unknown) {
    // Improve error handling
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { token, error } = await authService.login(email, password);

    // Check for error and return response accordingly
    if (error) {
      res.status(400).json({ message: error });
      return; // Ensure we exuseNewUrlParser: true,
      
    }

    // Return the generated token if no erroruseUnifiedTopology: true
    res.json({ token });
  } catch (error: unknown) {
    // Improve error handling
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const signout = async (req: Request, res: Response): Promise<void> => {
  try {
    // Clear the token cookie. Adjust options if needed (e.g., secure, sameSite)
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Sign out successful" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};
