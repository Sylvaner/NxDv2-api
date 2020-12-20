import { ApiProperty } from '@nestjs/swagger'

export class CreateScenarioDTO {
  @ApiProperty()
  model: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  triggerDevice?: string;
  @ApiProperty()
  triggerCapability?: any;
  @ApiProperty()
  triggerCondition: any;
  @ApiProperty()
  triggerValue: any;
  @ApiProperty()
  actionDevice?: string;
  @ApiProperty()
  actionCapability?: any;
  @ApiProperty()
  actionValue?: string;
}