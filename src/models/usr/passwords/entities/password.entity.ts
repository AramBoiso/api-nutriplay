import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SHA256 } from 'crypto-js';
import { User } from "../../users/entities";

@Entity({ name: 'passwords'})
export class Password{

    @PrimaryGeneratedColumn()
    passwordId:string;

    @ManyToOne(type => User, user => user.password)
    @JoinColumn({ name: 'userId' })
    user:User;

    @Column()
    password:string;

    @CreateDateColumn()
    create_at:Date;

    @UpdateDateColumn()
    update_at:Date;

    @DeleteDateColumn()
    delete_at:Date;

    @BeforeInsert()
    async hashPassword(){
        this.password = SHA256( SHA256(this.password).toString() ).toString();
    }

}