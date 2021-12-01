import { Module } from '@nestjs/common';
import { PhysicalActivitiesController } from './physical-activities.controller';
import { PhysicalActivitiesService } from './physical-activities.service';

@Module({
  controllers: [PhysicalActivitiesController],
  providers: [PhysicalActivitiesService]
})
export class PhysicalActivitiesModule {}
