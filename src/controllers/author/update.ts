import { Request, Response, NextFunction } from 'express';
import { Author } from "../../orm/entities/Author";
import dataSource from "../../orm/dataSource";
import { successResponse, errorResponse } from '../../utils/response';

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    
    try {
        const authorRepository = dataSource.getRepository(Author);

        const author = await authorRepository.findOne({where: {id : parseInt(id)}});
        if (!author) {
            return errorResponse(res, 404, "Author not found");
        }
        
        author.name = name;
        author.bio = bio;
        await authorRepository.save(author);

        return successResponse(res, 200, "Author updated successfully", author);
    } catch (error) {
        return errorResponse(res, 500, "Internal server error");
    }
}