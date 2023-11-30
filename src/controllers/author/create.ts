import { Request, Response, NextFunction } from 'express';
import dataSource from "../../orm/dataSource";
import { Author } from "../../orm/entities/Author";
import { errorResponse, successResponse } from '../../utils/response';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const { name, bio } = req.body;
    
    try {
        const authorRepository = dataSource.getRepository(Author);

        const author = new Author();
        author.name = name;
        author.bio = bio;
        await authorRepository.save(author);

        return successResponse(res, 200, "Author created successfully", author);
    } catch (err) {
        return errorResponse(res, 500, "Internal server error");
    }
};