import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeviceModule } from './device/device.module';
import { DeviceStateModule } from './devicestate/deviceState.module';
import { configService } from './config/config.service';

@Module({
  imports: [
    DeviceModule,
    DeviceStateModule,
    configService.getMongooseModule('nextdom'),
    configService.getMongooseModule('nextdomstate')
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
