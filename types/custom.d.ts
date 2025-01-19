// src/types/custom.d.ts

import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId: string;  // Add 'userId' to the Request type
    }
  }
}
