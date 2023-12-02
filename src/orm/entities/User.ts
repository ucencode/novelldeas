import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm'
import * as bcrypt from 'bcryptjs'

@Entity()
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  @CreateDateColumn()
  created_at: Date

  @Column()
  @UpdateDateColumn()
  updated_at: Date

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8)
  }

  checkIfPasswordMatch(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password)
  }

  toJSON() {
    const { password, ...user } = this
    return user
  }
}
