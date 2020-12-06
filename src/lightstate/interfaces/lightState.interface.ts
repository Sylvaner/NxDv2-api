import { Document } from 'mongoose';

export interface LightState extends Document {
  id: string,
  name: string,
}