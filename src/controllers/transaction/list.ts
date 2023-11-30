import { Request, Response, NextFunction } from 'express';
import { Transaction } from "../../orm/entities/Transaction";
import dataSource from "../../orm/dataSource";
import { successResponse, errorResponse } from '../../utils/response';

export const list = async (req: Request, res: Response) => {
    try {
        const transactions = await dataSource.getRepository(Transaction).find();

        let message = transactions.length > 0 ? "Transactions Found" : "No Transactions Found";
        return successResponse(res, 200, message, transactions);
    } catch (error) {
        return errorResponse(res, 500, "Internal server error");
    }
}