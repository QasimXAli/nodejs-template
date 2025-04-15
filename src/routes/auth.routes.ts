import { Router } from 'express';
import { signup } from '../controllers/auth.controller';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.middleware';

const router = Router();

router.post(
    '/signup',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        validate,
    ],
    signup
);

export default router;
