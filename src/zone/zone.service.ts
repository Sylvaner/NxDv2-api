import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Zone } from './interfaces/zone.interface';
import { CreateZoneDTO } from './dto/zone.dto';

@Injectable()
export class ZoneService {
  constructor(@InjectModel('Zone') private readonly zoneModel: Model<Zone>) { }

  async findAll(): Promise<Zone[]> {
    const zones = await this.zoneModel.find();
    return zones
  }

  async findById(zoneId: string): Promise<Zone> {
    const zone = await this.zoneModel.findById(zoneId);
    return zone;
  }

  async create(createZoneDto: CreateZoneDTO): Promise<Zone> {
    const zone = await new this.zoneModel(createZoneDto);
    return await zone.save();
  }

  async delete(zoneId: string): Promise<Zone> {
    const deletedZone = await new this.zoneModel.findByIdAndDelete(zoneId);
    return deletedZone
  }

  async update(zoneId: string, createZoneDto: CreateZoneDTO): Promise<Zone> {
    const updatedZone = await this.zoneModel.findByIdAndUpdate(zoneId, createZoneDto);
    return updatedZone;
  }
}
