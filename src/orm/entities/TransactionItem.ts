
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { Transaction } from './Transaction';
import { type } from 'os';
import { Book } from './Book';

@Entity()
export class TransactionItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Transaction, (transaction) => transaction.itemIds, { eager: false })
    transaction: Transaction;

    @Column()
    bookId: number;

    @Column()
    bookTitle: string;

    @Column({type: "float"})
    quantity: number;

    @Column({type: "float"})
    price: number;

    countSubTotal() {
        return this.quantity * this.price;
    }
}
