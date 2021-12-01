import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Game } from '../../../md/games/entities/games.entity';

@Entity('score_users')
export class ScoreUser{

    @PrimaryGeneratedColumn()
    scoreUserId:number;

    @Column()
    score:number;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updateAt:Date;

    @DeleteDateColumn()
    deleteAt:Date;

    @ManyToOne(() => User, user => user.scoreUser)
    @JoinColumn({ name: 'userId'})
    user:User;

    @ManyToOne(() => User, player => player.scorePlayer)
    @JoinColumn({ name: 'playerId'})
    player:User;

    @ManyToOne(() => Game, game => game.scoreUser)
    @JoinColumn({ name: 'gameId'})
    game:Game;

}