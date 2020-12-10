import { ApiProperty } from '@nestjs/swagger'

export class CreateScenarioDTO {
  @ApiProperty()
  model: string;
  @ApiProperty()
  triggerDevice?: string;
  @ApiProperty()
  triggerCapability?: any;
  @ApiProperty()
  actionDevice?: string;
  @ApiProperty()
  actionCapability?: any;
  @ApiProperty()
  triggerValue?: string;
  @ApiProperty()
  actionValue?: string;
}