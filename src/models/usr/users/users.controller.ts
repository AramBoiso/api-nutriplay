import { Controller, Get, Post, UseGuards, Body, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService:UsersService){}

    // @UseGuards(JwtAuthGuard)
    @Get()
    async getMany(){
        return await this.userService.getMany();
    }

    @Get(':userId')
    async getOne(
        @Param('userId') userId:number
    ){
        return await this.userService.getUser({ userId });
    }

    @Post()
    async createOne(
        @Body() user:UserDto
    ){
        return await this.userService.createOne(user);
    }
    
    

}
