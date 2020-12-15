import { Schema } from "mongoose";

export const DeviceStateSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
});