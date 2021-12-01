import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../../usr/users/entities/user.entity';
@Entity('genders')
export class Gender {

    @PrimaryGeneratedColumn()
    genderId:number;

    @Column()
    name:string;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updateAt:Date;

    @DeleteDateColumn()
    deleteAt:Date;

    @OneToOne(() => User, user => user.gender )
    user:User[];

}