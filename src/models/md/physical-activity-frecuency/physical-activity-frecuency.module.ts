import { Module } from '@nestjs/common';
import { PhysicalActivityFrecuencyController } from './physical-activity-frecuency.controller';
import { PhysicalActivityFrecuencyService } from './physical-activity-frecuency.service';

@Module({
  controllers: [PhysicalActivityFrecuencyController],
  providers: [PhysicalActivityFrecuencyService]
})
export class PhysicalActivityFrecuencyModule {}
