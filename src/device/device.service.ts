import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device } from './interfaces/device.interface';
import {UpdateCategoryDTO} from "./dto/updateCategory";
import {UpdateConfigDTO} from "./dto/updateConfig";

@Injectable()
export class DeviceService {
  constructor(@InjectModel('Device') private readonly deviceModel: Model<Device>) { }

  async findAll(): Promise<Device[]> {
    return await this.deviceModel.find();
  }

  async findById(deviceId: string): Promise<Device> {
    return await this.deviceModel.findOne({ id: deviceId });
  }

  async linkToZone(deviceId: string, zoneId: string): Promise<Device> {
    return await this.deviceModel.findOneAndUpdate({ id: deviceId }, { $set: { zone: zoneId } }, {new: true});
  }

  async updateCategory(deviceId: string, updateCategoryDto: UpdateCategoryDTO): Promise<Device> {
    return await this.deviceModel.findOneAndUpdate({ id: deviceId }, { $set: updateCategoryDto }, {new: true});
  }

  async updateConfig(deviceId: string, updateConfigDto: UpdateConfigDTO): Promise<Device> {
    return await this.deviceModel.findOneAndUpdate({ id: deviceId }, { $set: updateConfigDto }, {new: true});
  }
}
