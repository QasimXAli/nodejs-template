import { Request, Response, NextFunction } from 'express';

export function responseFormatter(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const payload = res.locals.payload;

  if (!payload) {
    res.status(204).send();
    return;
  }

  if (res.locals.raw === true) {
    res.status(payload.statusCode || 200).send(payload);
    return;
  }

  const { success = true, message = '', data, errors, statusCode } = payload;

  const responseBody: any = {
    status: success,
    message,
  };

  if (data !== undefined && data !== null) {
    responseBody.data = data;
  }

  if (errors && errors.length > 0) {
    responseBody.errors = errors;
  }

  const finalStatusCode = success
    ? statusCode || 200
    : statusCode || 400;

  res.status(finalStatusCode).json(responseBody);
}