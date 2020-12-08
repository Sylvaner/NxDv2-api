import { Module } from '@nestjs/common';
import { DeviceModule } from './device/device.module';
import { DeviceStateModule } from './devicestate/deviceState.module';
import { ZoneModule } from './zone/zone.module';
import { configService } from './config/config.service';

@Module({
  imports: [
    DeviceModule,
    DeviceStateModule,
    ZoneModule,
    configService.getMongooseModule('nextdom'),
    configService.getMongooseModule('nextdomstate')
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
