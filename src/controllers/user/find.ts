import { Request, Response, NextFunction } from 'express';
import { User } from "../../orm/entities/User";
import dataSource from "../../orm/dataSource";
import { successResponse, errorResponse } from '../../utils/response';

export const find = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await dataSource.getRepository(User).findOne({where: {id}});
        if (!user) {
            errorResponse(res, 404, "User not found");
            return;
        }
        successResponse(res, 200, "User Found", user);
    } catch (error) {
        errorResponse(res, 500, "Internal server error");
    }
}