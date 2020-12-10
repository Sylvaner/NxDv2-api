export interface Scenario {
  model: string,
  triggerDevice?: string,
  triggerCapability?: any,
  actionDevice?: string,
  actionCapability?: any,
  triggerValue?: string,
  actionValue?: string
}