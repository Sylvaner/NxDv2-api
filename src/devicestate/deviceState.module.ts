import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceStateController } from './deviceState.controller';
import { DeviceStateService } from './deviceState.service';
import { DeviceStateSchema } from './schemas/deviceState.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DeviceState', schema: DeviceStateSchema, collection: 'states' }
    ], 'nextdomstate')
  ],
  controllers: [DeviceStateController],
  providers: [DeviceStateService]
})
export class DeviceStateModule { }
