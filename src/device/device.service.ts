import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device } from './interfaces/device.interface';

@Injectable()
export class DeviceService {
  constructor(@InjectModel('Device') private readonly deviceModel: Model<Device>) { }

  async findAll(): Promise<Device[]> {
    const devices = await this.deviceModel.find();
    return devices
  }

  async findById(deviceId: string): Promise<Device> {
    const device = await this.deviceModel.findOne({ id: deviceId });
    return device;
  }

  async linkToZone(deviceId: string, zoneId: string): Promise<Device> {
    const device = await this.deviceModel.findOneAndUpdate({ id: deviceId }, { $set: { zone: zoneId } })
    return device;
  }
}
