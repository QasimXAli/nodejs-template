import { Response } from 'express';

export const sendPayload = (
    res: Response,
    {
      success = true,
      message = '',
      data = null,
      statusCode = 200,
      errors = [],
      raw = false,
    }: {
      success?: boolean;
      message?: string;
      data?: any;
      statusCode?: number;
      errors?: any[];
      raw?: boolean;
    }
  ) => {
    res.locals.payload = { success, message, data, statusCode, errors };
    res.locals.raw = raw;
  };