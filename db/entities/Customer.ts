import { BaseEntity,OneToMany,ManyToOne,ManyToMany,JoinTable, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Relation, OneToOne, JoinColumn } from "typeorm";
import bcrypt from 'bcrypt'
import { Role } from "./Roles.js";
import { Book } from "./Books.js";


@Entity('customer')
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false})
  firstName: string;

  @Column({ nullable: false})
  midName: string;

  @Column({ nullable: false})
  lastName: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }
  @Column({ nullable: false})
  password: string;


  @Column({  nullable: false ,unique:true})
  phoneNumber: string;

  @Column({ nullable: false , unique:true})
  email: string;

@Column({
  type: "set",
  enum: ["male","female"],nullable:false
})
gender: string


  @Column({    type: 'timestamp', 
  precision: 3,
})
  logoutAt: Date;

  @Column({ type: 'timestamp', precision: 4,
})
  passwordChangedAt: Date;


  @ManyToMany(() => Role, { cascade: true, eager: true })
  @JoinTable()
  roles: Role[];

  @OneToOne(() => Book)
  @JoinColumn()
  book : Book[];


  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
}