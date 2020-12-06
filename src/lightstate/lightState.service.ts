import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LightState } from './interfaces/lightState.interface';

@Injectable()
export class LightStateService {
  constructor(@InjectModel('LightState') private readonly lightStateModel: Model<LightState>) { }

  async findAll(): Promise<LightState[]> {
    const lights = await this.lightStateModel.find();
    return lights
  }

  async findById(lightId: string): Promise<LightState> {
    const light = await this.lightStateModel.findOne({ id: lightId });
    return light;
  }
}
