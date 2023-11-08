import { BaseEntity,OneToMany,ManyToOne,ManyToMany,JoinTable, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Relation } from "typeorm";
import bcrypt from 'bcrypt'
import { Role } from "./Roles";


@Entity('barber')
export class Barber extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // @Column(() => Name)
  // name: Name

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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
}