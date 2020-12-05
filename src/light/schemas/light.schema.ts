import { Schema } from "mongoose";

export const LightSchema = new Schema({
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
  }
});