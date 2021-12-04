import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Game } from 'src/models/md/games/entities';
import { Connection } from 'typeorm';
import { User } from '../users/entities';
import { ScoreDto } from './dto';
import { ScoreUser } from './entities/score-users.entity';
import { ScoreUserI } from './interfaces';


@Injectable()
export class ScoreUsersService {

    constructor(private connection:Connection){}


    async getMany(scoreUserI:ScoreUserI){

        const { playerId, gameId } = scoreUserI;

        let playerQuery:string;
        let gameQuery:string;

        if(playerId && playerId > 0){
            playerQuery =  `p.userId = ${playerId}`;
        }

        if(gameId && gameId > 0){
            gameQuery = `g.gameId = ${gameId}`;
        }

        const scoreUsers = await this.connection
            .createQueryBuilder(ScoreUser, "su")
            .innerJoinAndSelect("su.player", "p", playerQuery)
            // .select(['p.name'])
            .innerJoinAndSelect("su.game", "g", gameQuery)
            .select(['su.score', 'p.username', 'g.name'])
            .orderBy("su.score", "DESC")
            .getMany();

        return scoreUsers;

    }


    async createScore(scoreDto:ScoreDto){

        const { score, userId, playerId, gameId } = scoreDto;


        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        let user:User;
        let player:User;
        let game:Game;
        let scoreUser:ScoreUser;

        try {

            user = await this.connection.getRepository(User).findOne(userId);

            if(!user)
                throw new NotFoundException({ message: "El usuario no fue encontrado." })

            if(user.role === "student")
                throw new BadRequestException({ message: "El usuario no tiene permitido añadir puntos a este jugador." });


            player = await this.connection.getRepository(User).findOne(playerId);

            if(!player)
                throw new NotFoundException({ message: "El jugador no fue encontrado." });

            game = await this.connection.getRepository(Game).findOne(gameId);

            if(!game)
                throw new NotFoundException({ message: "El juego no fue encontrado." });

            
            scoreUser = await this.connection.getRepository(ScoreUser).create({
                user,
                player,
                game,
                score
            });

            scoreUser = await queryRunner.manager.save(scoreUser);

            await queryRunner.commitTransaction();

          } catch (err) {
            console.log("Error: ", err);
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException({
                message: err.message? err.message : "Ocurrio un error al añadir la puntuación del jugador."
            });
          } finally {
            await queryRunner.release();
          }

          return {
            action: "created",
            code: 201,
            message:"Puntaje añadido",
            data:{
                scoreUser
            } 
        };

        
    }

}
