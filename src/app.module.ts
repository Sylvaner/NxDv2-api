import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LightModule } from './light/light.module';

@Module({
  imports: [LightModule, MongooseModule.forRoot(
    'mongodb://nextdom:admin@localhost/nextdom'
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
