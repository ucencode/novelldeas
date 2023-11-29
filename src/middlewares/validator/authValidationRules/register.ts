import { body } from 'express-validator';

export const registerValidationRules = [
    body('firstName')
        .notEmpty().withMessage('First name is required'),

    body('lastName')
        .notEmpty().withMessage('Last name is required'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is not valid')
        .normalizeEmail(),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

    body('passwordConfirm')
        .notEmpty().withMessage('Confirm password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords must match');
            }
            return true;
        }),
];