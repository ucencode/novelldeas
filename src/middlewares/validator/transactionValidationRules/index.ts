import { body } from 'express-validator';

export const transactionValidationRules = [
    body('items')
        .notEmpty().withMessage('Items is required')
        .isArray().withMessage('Items must be array'),
    body('items.*.id')
        .notEmpty().withMessage('Book ID is required')
        .isNumeric().withMessage('Book ID must be numeric'),
    body('items.*.quantity')
        .notEmpty().withMessage('Quantity is required')
        .isNumeric().withMessage('Quantity must be numeric')
        .isFloat({ min: 0 }).withMessage('Quantity cannot be negative number'),

    body('paid')
        .notEmpty().withMessage('Paid is required')
        .isNumeric().withMessage('Paid must be numeric')
        .isFloat({ min: 0 }).withMessage('Paid cannot be negative number')
        .custom((value, { req }) => {
            const { items } = req.body;
            if(!items) return true;
            const totalPrice = items.reduce((acc:number, item: any) => {
                return acc + (item.quantity * item.price);
            }, 0);
            if (value < totalPrice) {
                throw new Error('Paid must be greater than or equal to total price');
            }
            return true;
        })
];