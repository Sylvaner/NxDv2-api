import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Light } from './interfaces/light.interface';

@Injectable()
export class LightService {
  constructor(@InjectModel('Light') private readonly lightModel: Model<Light>) { }

  async findAll(): Promise<Light[]> {
    const lights = await this.lightModel.find();
    return lights
  }

  async findById(lightId: string): Promise<Light> {
    const light = await this.lightModel.findOne({ id: lightId });
    return light;
  }
}
