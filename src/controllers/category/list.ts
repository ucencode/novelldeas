import { Request, Response, NextFunction } from 'express';
import { Category } from "../../orm/entities/Category";
import dataSource from "../../orm/dataSource";
import { successResponse, errorResponse } from '../../utils/response';

export const list = async (req: Request, res: Response) => {
    try {
        const categories = await dataSource.getRepository(Category).find();

        let message = categories.length > 0 ? "Categories Found" : "No Categories Found";
        return successResponse(res, 200, message, categories);
    } catch (error) {
        return errorResponse(res, 500, "Internal server error");
    }
}