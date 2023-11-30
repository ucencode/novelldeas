import { Request, Response, NextFunction } from 'express';
import { Book } from "../../orm/entities/Book";
import dataSource from "../../orm/dataSource";
import { successResponse, errorResponse } from '../../utils/response';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    
    try {
        const book = await dataSource.getRepository(Book).findOne({where: {id : parseInt(id)}});

        if (!book) {
            return errorResponse(res, 404, "Book not found");
        }

        await dataSource.getRepository(Book).remove(book);
        return successResponse(res, 200, "Book deleted successfully", book);
    } catch (error) {
        return errorResponse(res, 500, "Internal server error");
    }
}