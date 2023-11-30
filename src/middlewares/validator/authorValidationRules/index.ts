import { body } from "express-validator";

export const authorValidationRules = [
    body("name").notEmpty().withMessage("Title is required"),

    body("bio").optional(),
];