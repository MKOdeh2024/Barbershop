import { BaseEntity,OneToMany,ManyToOne,ManyToMany,JoinTable, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Relation, JoinColumn } from "typeorm";
import bcrypt from 'bcrypt'
import { Customer } from "./Customer.js";


@Entity('book')
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  

  @Column({ nullable: false ,type:'text'})
  salon: string;

  @Column({ nullable: false,type:'text'})
  street: string;

  @Column({ type: 'date', nullable: false })
  Date: Date;
  
  @Column('timestamp')
  time: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
}