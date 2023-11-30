// import { Request, Response, NextFunction } from 'express';
// import dataSource from "../../orm/dataSource";
// import { Book } from "../../orm/entities/Book";
// import { errorResponse, successResponse } from '../../utils/response';

// export const create = async (req: Request, res: Response, next: NextFunction) => {
//     const { title, category, author, isbn, price, stock, image } = req.body;
    
//     try {
//         const bookRepository = dataSource.getRepository(Book);

//         const book = new Book();
//         book.title = title;
//         book.category = category;
//         book.author = author;
//         book.isbn = isbn;
//         book.price = price;
//         book.stock = stock;
//         await bookRepository.save(book);

//         return successResponse(res, 200, "Book created successfully", book);
//     } catch (err) {
//         return errorResponse(res, 500, "Internal server error");
//     }
// };