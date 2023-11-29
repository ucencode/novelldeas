import { Request, Response, NextFunction } from 'express';
import { User } from "../../orm/entities/User";
import dataSource from "../../orm/dataSource";
import { successResponse, errorResponse } from '../../utils/response';

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const { password, passwordNew } = req.body;
        const { id } = req.jwtPayload;

        const userRepository = dataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id } });

        if (!user) {
            errorResponse(res, 404, "Not found");
            return;
        }

        if (!user.checkIfPasswordMatch(password)) {
            errorResponse(res, 400, "Your old password is incorrect");
            return;
        }

        user.password = passwordNew;
        user.hashPassword();
        userRepository.save(user);

        successResponse(res, 200, "Password changed successfully");
    } catch (err) {
        errorResponse(res, 500, "Internal server error");
    }
};