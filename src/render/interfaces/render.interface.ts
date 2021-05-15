import { Document } from 'mongoose';

export interface Render extends Document {
  name: string,
  config: any,
  cards: Array<any>
}