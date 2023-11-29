import { body } from 'express-validator';

export const changePasswordValidationRules = [
	body('password')
		.notEmpty().withMessage('Old password is required')
		.isLength({ min: 8 }).withMessage('Old password must be at least 8 characters'),

	body('passwordNew')
		.notEmpty().withMessage('New password is required')
		.isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),

	body('passwordConfirm')
		.notEmpty().withMessage('Confirm new password is required')
		.custom((value, { req }) => {
			if (value !== req.body.newPassword) {
				throw new Error('Passwords must match');
			}
			return true;
		}),
];