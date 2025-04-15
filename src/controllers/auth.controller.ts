import { Request, Response, NextFunction } from 'express';
import { sendPayload } from '../utils/response';
import { signupService } from '../services/auth.service';


export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const user = await signupService({ name, email, password });
    return sendPayload(res, {
      statusCode: 201,
      message: 'User created successfully',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
