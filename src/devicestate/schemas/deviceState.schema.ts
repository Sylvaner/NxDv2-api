import { Schema } from "mongoose";

export const DeviceStateSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
});