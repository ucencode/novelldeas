import { Request, Response, NextFunction } from 'express';
import { User } from "../../orm/entities/User";
import dataSource from "../../orm/dataSource";
import { successResponse, errorResponse } from '../../utils/response';

export const list = async (req: Request, res: Response) => {
    try {
        const users = await dataSource.getRepository(User).find();
        let message = users.length > 0 ? "Users Found" : "No Users Found";
        successResponse(res, 200, message, users);
    } catch (error) {
        errorResponse(res, 500, "Internal server error");
    }
}