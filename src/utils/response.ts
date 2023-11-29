import { Response } from "express";

export const successResponse = (response: Response, httpStatusCode: number, message: string, data: any = null): Response => {
    return response.status(httpStatusCode).json({
        success: true,
        message,
        data
    });
}

export const errorResponse = (response: Response, httpStatusCode: number, message: string, errors: any = null): Response => {
    return response.status(httpStatusCode).json({
        success: false,
        message, 
        errors: errors || []
    });
}
