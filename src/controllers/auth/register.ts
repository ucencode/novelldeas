import { Request, Response, NextFunction } from 'express';
import dataSource from "../../orm/dataSource";
import { User } from "../../orm/entities/User";
import { errorResponse, successResponse } from '../../utils/response';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;

    const userRepository = dataSource.getRepository(User);
    try {
        const user = await userRepository.findOne({ where: { email: email } });

        if (user) {
            errorResponse(res, 400, "User already exists", [
                `Email '${user.email}' already exists`
            ]);
            return;
        }

        try {
            const newUser = new User();
            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.password = password;
            newUser.hashPassword();
            await userRepository.save(newUser);

            successResponse(res, 200, "User created successfully", newUser);
        } catch (err) {
            errorResponse(res, 500, "Internal server error", err);
        }
    } catch (err) {
        errorResponse(res, 500, "Internal server error");
    }
};