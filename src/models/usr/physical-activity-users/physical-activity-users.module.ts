import { Module } from '@nestjs/common';
import { PhysicalActivityUsersController } from './physical-activity-users.controller';
import { PhysicalActivityUsersService } from './physical-activity-users.service';

@Module({
  controllers: [PhysicalActivityUsersController],
  providers: [PhysicalActivityUsersService]
})
export class PhysicalActivityUsersModule {}
