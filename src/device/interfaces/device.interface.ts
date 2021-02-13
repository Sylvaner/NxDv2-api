import { Document } from 'mongoose';

type MqttFormat = 'raw' | 'json';

export class MqttAccessDesc {
  topic: string = '';
  path: string = '';
  format?: MqttFormat = 'raw';
  type: string = '';
}

export interface CapabilityAccessor {
  get?: MqttAccessDesc,
  set?: MqttAccessDesc
}

interface Capabilities {
  [capabilityName: string]: CapabilityAccessor
}

export interface Device extends Document {
  id: string,
  name: string,
  capabilities: Capabilities,
  zone: string
  config: object
}