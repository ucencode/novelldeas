import { Request, Response, NextFunction } from 'express';
import dataSource from "../../orm/dataSource";
import { Transaction } from "../../orm/entities/Transaction";
import { errorResponse, successResponse } from '../../utils/response';
import { Book } from '../../orm/entities/Book';
import { TransactionItem } from '../../orm/entities/TransactionItem';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const { items, paid, discount } = req.body;
    
    // try {
        const transaction = new Transaction();

        await dataSource.manager.transaction(async (transactionalEntityManager) => {
            const transactionRepository = transactionalEntityManager.getRepository(Transaction);
            const { transactionItems, totalPrice } = await mapItems(items);

            transaction.code = await generateTransactionCode();
            transaction.discount = discount || 0;
            transaction.totalPrice = totalPrice;
            transaction.paid = paid;
            transaction.createdBy = req.jwtPayload.id;
            await transactionRepository.save(transaction);

            await putItems(transaction, transactionItems);
            await updateStock(transactionItems);
        });

        const responseTransaction = await dataSource.getRepository(Transaction).findOne({where: { id: transaction.id }, relations: ["itemIds"]});
        return successResponse(res, 200, "Transaction created successfully", responseTransaction);
    // } catch (err) {
    //     return errorResponse(res, 500, "Internal server error");
    // }
};

/**
 * Generates a transaction code based on the last transaction in the database.
 * If there are no previous transactions, the code will start with "TRX-1".
 * @returns The generated transaction code.
 */
const generateTransactionCode = async () => {
    const transactionRepository = dataSource.getRepository(Transaction);
    const lastTransaction = await transactionRepository
        .createQueryBuilder("transaction")
        .orderBy("transaction.createdAt", "DESC")
        .limit(1)
        .getOne();
    if (!lastTransaction) {
        return "TRX-1";
    }
    // remove the "TRX-" prefix and parse the ID to an integer
    const lastTransactionId = parseInt(lastTransaction.code.substring(4));
    const transactionCode = `TRX-${lastTransactionId + 1}`;
    return transactionCode;
}

/**
 * Maps the given items to transaction items and calculates the total price.
 * @param items - The items to be mapped.
 * @returns A promise that resolves to an object containing the transaction items and the total price.
 */
const mapItems = async (items: object[]): Promise<{ transactionItems: TransactionItem[], totalPrice: number }> => {
    const itemIds = items.map(item => item["id"]);
    const books = await dataSource
        .getRepository(Book)
        .createQueryBuilder("book")
        .where("book.id IN (:...itemIds)", { itemIds })
        .getMany();

    const transactionItems = books.map(book => {
        const item = items.find(item => item["id"] === book.id);
        const transactionItem = new TransactionItem();
        transactionItem.bookId = book.id;
        transactionItem.bookTitle = book.title;
        transactionItem.quantity = item["quantity"];
        transactionItem.price = book.price;
        return transactionItem;
    });

    const totalPrice = books.reduce((total: number, book: Book) => {
        const item = items.find(item => item["id"] === book.id);
        return total + (book.price * item["quantity"]);
    }, 0);

    return { transactionItems, totalPrice };
}

/**
 * Saves the given items to the transaction item repository with the specified transaction ID.
 * @param transactionId - The ID of the transaction.
 * @param items - The items to be saved.
 * @returns A promise that resolves when the items are successfully saved.
 */
const putItems = async (transaction: Transaction, items: TransactionItem[]): Promise<void> => {
    const transactionItemRepository = dataSource.getRepository(TransactionItem);
    items.forEach(async (item) => {
        item.transaction = transaction;
        await transactionItemRepository.save(item);
    });
};

/**
 * Updates the stock of books based on the provided transaction items.
 * @param items - The transaction items containing book IDs and quantities.
 * @returns A Promise that resolves when the stock is updated.
 */
const updateStock = async (items: TransactionItem[]): Promise<void> => {
    const bookIds = items.map(item => item.bookId);
    const books = await dataSource
        .getRepository(Book)
        .createQueryBuilder("book")
        .where("book.id IN (:...bookIds)", { bookIds })
        .getMany();

    books.forEach(book => {
        const item = items.find(item => item.bookId === book.id);
        book.stock = book.stock - item.quantity;
    });

    await dataSource.getRepository(Book).save(books);
}