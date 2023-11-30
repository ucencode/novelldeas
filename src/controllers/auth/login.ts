
import { Request, Response, NextFunction } from 'express';
import { Result, validationResult } from 'express-validator';
import dataSource from '../../orm/dataSource';
import { JwtPayload } from '../../types/JwtPayload';
import { createJwtToken } from '../../utils/createJwtToken';
import { User } from "../../orm/entities/User";
import { successResponse, errorResponse } from '../../utils/response';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    
    try {
        const userRepository = dataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            return errorResponse(res, 401, "The Credentials you provided does not match our records");
        }

        if (!user.checkIfPasswordMatch(password)) {
            return errorResponse(res, 401, "The Credentials you provided does not match our records");
        }

        const jwtPayload: JwtPayload = {
            id: user.id,
            created_at: user.created_at,
        };

        const token = createJwtToken(jwtPayload);
        return successResponse(res, 200, "Token successfully created", { token: `Bearer ${token}` });
    } catch (err) {
        return errorResponse(res, 500, "Internal server error");
    }
};