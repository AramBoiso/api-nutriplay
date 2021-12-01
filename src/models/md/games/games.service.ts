import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Game } from './entities';

@Injectable()
export class GamesService {

    constructor(private readonly connection:Connection){}

    async getMany(){
        let games:Game[] = await this.connection
            .createQueryBuilder(Game, "g")
            .select(["g.gameId","g.name"])
            .getMany();
        return games;
    }

}
