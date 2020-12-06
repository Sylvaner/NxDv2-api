import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LightStateController } from './lightState.controller';
import { LightStateService } from './lightState.service';
import { LightStateSchema } from './schemas/lightState.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'LightState', schema: LightStateSchema, collection: 'states' }
    ], 'nextdomstate')
  ],
  controllers: [LightStateController],
  providers: [LightStateService]
})
export class LightStateModule { }
