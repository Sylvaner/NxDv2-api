import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LightState } from './interfaces/lightState.interface';

@Injectable()
export class LightStateService {
  constructor(@InjectModel('LightState') private readonly lightStateModel: Model<LightState>) { }

  async findByObjectId(lightId: string): Promise<LightState> {
    const lightState = await this.lightStateModel.findOne({ objectId: lightId });
    return lightState;
  }
}
