import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm'
import { TransactionItem } from './TransactionItem'

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true
  })
  code: string

  @OneToMany(() => TransactionItem, (transactionItem) => transactionItem.transaction, { 
    eager: true,
    cascade: true
  })
  itemIds: TransactionItem[]

  @Column()
  discount: number

  @Column({type: 'float'})
  totalPrice: number

  @Column({type: 'float'})
  paid: number

  @CreateDateColumn()
  createdAt: Date

  @Column()
  createdBy: string

  countChange() {
    return this.paid - this.totalPrice
  }
}
