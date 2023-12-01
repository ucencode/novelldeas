import { Request, Response, NextFunction } from 'express';
import { Book } from "../../orm/entities/Book";
import dataSource from "../../orm/dataSource";
import { successResponse, errorResponse } from '../../utils/response';
import { Repository } from 'typeorm';

export const list = async (req: Request, res: Response) => {
    const { search } = req.query;
    try {
        const bookRepository = dataSource.getRepository(Book);

        let books: Book[] = [];

        if (search) {
            books = await getBookBySearch(bookRepository, search as string);
        } else {
            books = await getAllBooks(bookRepository);
        }

        let message = books.length > 0 ? books.length + " Books Found" : "No Books Found";
        return successResponse(res, 200, message, books);
    } catch (error) {
        return errorResponse(res, 500, "Internal server error");
    }
}

const getBookBySearch = async (repository: Repository<Book>, search: string) => {
    const books = await repository
        .createQueryBuilder("book")
        .innerJoinAndSelect("book.category", "category")
        .innerJoinAndSelect("book.author", "author")
        .where("book.title LIKE :search", { search })
        .getMany();

    return books;
}

const getAllBooks = async (repository: Repository<Book>) => {
    const books = await repository
        .createQueryBuilder("book")
        .innerJoinAndSelect("book.category", "category")
        .innerJoinAndSelect("book.author", "author")
        .getMany();

    return books;
}