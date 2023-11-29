import { body } from 'express-validator';

export const loginValidationRules = [
	body('email')
		.notEmpty().withMessage('Email is required')
		.isEmail().withMessage('Email is not valid')
		.normalizeEmail(),
		
	body('password')
		.notEmpty().withMessage('Password is required')
		.isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
];