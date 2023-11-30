import { Request, Response, NextFunction } from 'express';
import { Book } from "../../orm/entities/Book";
import dataSource from "../../orm/dataSource";
import { successResponse, errorResponse } from '../../utils/response';

export const list = async (req: Request, res: Response) => {
    try {
        const books = await dataSource.getRepository(Book).find();

        let message = books.length > 0 ? "Books Found" : "No Books Found";
        return successResponse(res, 200, message, books);
    } catch (error) {
        return errorResponse(res, 500, "Internal server error");
    }
}