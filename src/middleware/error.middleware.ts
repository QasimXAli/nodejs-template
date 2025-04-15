import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../utils/app-error';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error('🔥 Error:', err);

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: false,
            message: err.message,
            errors: err.errors ?? [],
        });
        return;
    }


    res.status(500).json({
        status: false,
        message: 'Something went wrong 😬',
        errors: [],
    });
};
