import { body } from "express-validator";

export const categoryValidationRules = [
    body("name").notEmpty().withMessage("Title is required"),

    body("description").optional(),
];