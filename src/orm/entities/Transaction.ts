import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, BeforeInsert, OneToMany } from 'typeorm';
import { TransactionItem } from './TransactionItem';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    code: string;

    @OneToMany(() => TransactionItem, (transactionItem) => transactionItem.transaction, { eager: true })
    itemIds: TransactionItem[];

    @Column()
    discount: number;

    @Column({type: "float"})
    totalPrice: number;

    @Column({type: "float"})
    paid: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    createdBy: string;

    @DeleteDateColumn()
    softDelete: Date;

    countChange() {
        return this.paid - this.totalPrice;
    }
}
