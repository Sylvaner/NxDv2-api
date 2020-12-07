import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { DeviceSchema } from './schemas/device.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Device', schema: DeviceSchema }
    ], 'nextdom')
  ],
  controllers: [DeviceController],
  providers: [DeviceService]
})
export class DeviceModule { }
