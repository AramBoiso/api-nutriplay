import { Controller, Get } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {

    constructor(private gameService:GamesService){}

    @Get()
    async getMany(){
        return await this.gameService.getMany();
    }

}
