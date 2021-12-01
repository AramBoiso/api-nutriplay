import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ScoreUser } from '../../../usr/score-users/entities/score-users.entity';

@Entity('games')
export class Game {

    @PrimaryGeneratedColumn()
    gameId:number;

    @Column()
    name:string;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updateAt:Date;

    @DeleteDateColumn()
    deleteAt:Date;

    @OneToMany( () => ScoreUser, su => su.game )
    scoreUser:ScoreUser[];

}