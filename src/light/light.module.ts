import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LightController } from './light.controller';
import { LightService } from './light.service';
import { LightSchema } from './schemas/light.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Light', schema: LightSchema }
    ], 'nextdom')
  ],
  controllers: [LightController],
  providers: [LightService]
})
export class LightModule { }
