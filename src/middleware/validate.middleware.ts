// middleware/validate.middleware.ts
import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { sendPayload } from '../utils/response';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendPayload(res, {
      success: false,
      statusCode: 422,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};