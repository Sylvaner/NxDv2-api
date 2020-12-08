import { Schema } from "mongoose";

export const DeviceSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  capabilities: {
    type: Object,
    required: true
  },
  zone: {
    type: String,
    required: false
  }
});