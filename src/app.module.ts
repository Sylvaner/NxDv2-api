import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LightModule } from './light/light.module';
import { LightStateModule } from './lightstate/lightState.module';
import { configService } from './config/config.service';

@Module({
  imports: [
    LightModule,
    LightStateModule,
    configService.getMongooseModule('nextdom'),
    configService.getMongooseModule('nextdomstate')
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
