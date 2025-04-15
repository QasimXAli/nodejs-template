import { AppError } from './app-error';

export const Errors = {
  NotFound: (resource: string) =>
    new AppError(`${resource} not found`, 404),
  Unauthorized: new AppError('Unauthorized', 401),
  Forbidden: new AppError('Forbidden', 403),
  ValidationFailed: (errors: any[]) =>
    new AppError('Validation failed', 400, errors),
  InternalError: new AppError('Something went wrong', 500),
};
export const handleError = (err: Error): AppError => {
  if (err instanceof AppError) {
    return err;
  }

  console.error('🔥 Error:', err);

  return Errors.InternalError;
};