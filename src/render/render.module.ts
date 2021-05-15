import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RenderController } from './render.controller';
import { RenderService } from './render.service';
import { RenderSchema } from './schemas/render.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Render', schema: RenderSchema }
    ], 'nextdom')
  ],
  controllers: [RenderController],
  providers: [RenderService]
})
export class RenderModule { }
