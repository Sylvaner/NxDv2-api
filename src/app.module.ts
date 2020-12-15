import { Module } from '@nestjs/common';
import { MqttModule } from 'nest-mqtt';
import { DeviceModule } from './device/device.module';
import { DeviceStateModule } from './devicestate/deviceState.module';
import { ScenarioModule } from './scenario/scenario.module';
import { ZoneModule } from './zone/zone.module';
import { configService } from './config/config.service';

@Module({
  imports: [
    DeviceModule,
    DeviceStateModule,
    ScenarioModule,
    ZoneModule,
    configService.getMongooseModule('nextdom'),
    configService.getMongooseModule('nextdomstate'),
    MqttModule.forRoot(configService.getMqttConfig())
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
