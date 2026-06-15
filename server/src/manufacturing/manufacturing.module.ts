import { Module } from '@nestjs/common';
import { ManufacturingService } from './manufacturing.service';
import { ManufacturingController } from './manufacturing.controller';

@Module({
  providers: [ManufacturingService],
  controllers: [ManufacturingController]
})
export class ManufacturingModule {}
