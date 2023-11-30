
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Author } from './Author';
import { Category } from './Category';
import slugify from 'slugify';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => Category, (category) => category.books, { eager: true })
    category: Category | null;

    @ManyToOne(() => Author, (author) => author.books, { eager: true })
    author: Author | null;

    @Column()
    isbn: string;

    @Column({type: "float"})
    price: number;

    @Column()
    stock: number;
}
