import { BaseEntity,OneToMany,ManyToOne,ManyToMany,JoinTable, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Relation } from "typeorm";
import bcrypt from 'bcrypt'
import { Barber } from "./Barber.js";
import { Book } from "./Books.js";


@Entity('salon')
export class Salon extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // @Column(() => Name)
  // name: Name

  @Column({ nullable: false})
  name: string;

  @Column({ nullable: false ,type:'text'})
  city: string;

  @Column({ nullable: false,type:'text'})
  street: string;

  @Column({type: 'timestamp'})
  startWorkTime: Date;

  @Column('timestamp')
  endWorkTime: Date;

  @OneToMany(() => Barber, (book) => book.id ,{ cascade: true, eager: true })
  @JoinTable()
  barbers: Barber[];

  @OneToMany(() => Book, (book) => book.id , { cascade: true, eager: true })
  @JoinTable()
  books: Book[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
}