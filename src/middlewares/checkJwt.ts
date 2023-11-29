import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JwtPayload } from '../types/JwtPayload';
import { createJwtToken } from '../utils/createJwtToken';
import { errorResponse } from '../utils/response';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		errorResponse(res, 400, "Authorization header not provided");
		return;
	}

	const token = authHeader.split(' ')[1];
	let jwtPayload: { [key: string]: any };
	try {
		jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as { [key: string]: any };
		['iat', 'exp'].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
		req.jwtPayload = jwtPayload as JwtPayload;
	} catch (err) {
		errorResponse(res, 401, "Invalid token");
		return;
	}

	try {
		// Refresh and send a new token on every request
		const newToken = createJwtToken(jwtPayload as JwtPayload);
		res.setHeader('token', `Bearer ${newToken}`);
		return next();
	} catch (err) {
		errorResponse(res, 500, "Internal server error");
		return;
	}
};