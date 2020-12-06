import { Schema } from "mongoose";

export const LightStateSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
});