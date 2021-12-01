import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ScoreDto } from './dto';
import { ScoreUsersService } from './score-users.service';

@Controller('score')
export class ScoreUsersController {

    constructor(private scoreUserService:ScoreUsersService){}

    @Get()
    async getMany(
        @Query('playerId') playerId:number,
        @Query('gameId') gameId:number,
    ){
        return await this.scoreUserService.getMany({
            playerId,
            gameId
        });
    }

    @Post()
    async createScore(
        @Body() scoreDto:ScoreDto
    ){
        return await this.scoreUserService.createScore(scoreDto);
    }

}
