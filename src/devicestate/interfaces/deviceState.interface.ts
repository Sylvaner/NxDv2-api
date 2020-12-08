import { Document } from 'mongoose';

export interface DeviceState extends Document {
  id: string,
  name: string
}