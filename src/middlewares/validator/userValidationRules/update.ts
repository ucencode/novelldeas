import { body } from "express-validator";

export const updateValidationRules = [
    body('firstName')
        .notEmpty().withMessage('First name is required'),

    body('lastName')
        .notEmpty().withMessage('Last name is required'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is not valid')
        .normalizeEmail()
];