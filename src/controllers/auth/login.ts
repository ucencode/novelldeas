
import { Request, Response, NextFunction } from 'express';
import { Result, validationResult } from 'express-validator';
import dataSource from '../../orm/dataSource';
import { JwtPayload } from '../../types/JwtPayload';
import { createJwtToken } from '../../utils/createJwtToken';
import { User } from "../../orm/entities/User";
import { successResponse, errorResponse } from '../../utils/response';

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const result: Result = validationResult(req);
    console.log(result.array());
    if (!result.isEmpty()) {
        errorResponse(res, 400, "Validation error", result.array());
        return;
    }
    const { email, password } = req.body;

    const userRepository = dataSource.getRepository(User);
    try {
        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            errorResponse(res, 404, "User not found");
            return;
        }

        if (!user.checkIfPasswordMatch(password)) {
            errorResponse(res, 400, "Password is incorrect");
            return;
        }

        const jwtPayload: JwtPayload = {
            id: user.id,
            created_at: user.created_at,
        };

        try {
            const token = createJwtToken(jwtPayload);
            successResponse(res, 200, "Token successfully created", { token: `Bearer ${token}` });
        } catch (err) {
            errorResponse(res, 500, "Internal server error", [
                "An error occured while creating a token"
            ]);
        }
    } catch (err) {
        errorResponse(res, 500, "Internal server error");
    }
};