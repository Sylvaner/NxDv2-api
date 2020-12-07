import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeviceState } from './interfaces/deviceState.interface';

@Injectable()
export class DeviceStateService {
  constructor(@InjectModel('DeviceState') private readonly deviceStateModel: Model<DeviceState>) { }

  async findByObjectId(deviceId: string): Promise<DeviceState> {
    const deviceState = await this.deviceStateModel.findOne({ deviceId });
    return deviceState;
  }
}
