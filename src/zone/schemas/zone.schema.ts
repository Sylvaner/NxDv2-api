import { Schema } from "mongoose";

export const ZoneSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  children: {
    type: Array,
    required: false
  }
});