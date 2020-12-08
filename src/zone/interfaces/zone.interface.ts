import { Document } from 'mongoose';

export interface Zone extends Document {
  name: string,
  children: Array<string>
}