import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { Transaction } from "../../orm/entities/Transaction";
import dataSource from "../../orm/dataSource";
import { successResponse, errorResponse } from '../../utils/response';

export const list = async (req: Request, res: Response) => {
    const { date } = req.query;
    try {
        console.log("date", typeof date, date);
        const transactionRepository = dataSource.getRepository(Transaction);

        let transactions: Transaction[] = [];
        if (date) {
            transactions = await getTransactionByDate(transactionRepository, date as string);
        } else {
            transactions = await getAllTransactions(transactionRepository);
        }

        const message = transactions.length > 0 ? transactions.length + " Transactions Found" : "No Transactions Found";
        return successResponse(res, 200, message, transactions);
    } catch (error) {
        return errorResponse(res, 500, "Internal server error");
    }
}

const getTransactionByDate = async (repository: Repository<Transaction>, date: string) => {
    const transactions = await repository
        .createQueryBuilder("transaction")
        .innerJoinAndSelect("transaction.itemIds", "itemIds")
        .where("DATE(transaction.createdAt) = :date", { date })
        .getMany();

    return transactions;
}

const getAllTransactions = async (repository: Repository<Transaction>) => {
    const transactions = await repository
        .createQueryBuilder("transaction")
        .innerJoinAndSelect("transaction.itemIds", "itemIds")
        .getMany();

    return transactions;
}