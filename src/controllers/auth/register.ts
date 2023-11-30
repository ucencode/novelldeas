import { Request, Response, NextFunction } from 'express';
import dataSource from "../../orm/dataSource";
import { User } from "../../orm/entities/User";
import { errorResponse, successResponse } from '../../utils/response';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const userRepository = dataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { email: email } });

        if (user) {
            return errorResponse(res, 400, "Email already exists");
        }

        const newUser = new User();
        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = password;
        newUser.hashPassword();
        await userRepository.save(newUser);

        return successResponse(res, 200, "User created successfully", newUser);
    } catch (err) {
        return errorResponse(res, 500, "Internal server error");
    }
};