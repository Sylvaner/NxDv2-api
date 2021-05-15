import { Schema } from "mongoose";

export const RenderSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  config: {
    type: Object,
    required: true
  },
  cards: {
    type: Array,
    required: true
  }
});