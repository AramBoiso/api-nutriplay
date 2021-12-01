import { Module } from '@nestjs/common';
import { ScoreUsersController } from './score-users.controller';
import { ScoreUsersService } from './score-users.service';

@Module({
  controllers: [ScoreUsersController],
  providers: [ScoreUsersService]
})
export class ScoreUsersModule {}
