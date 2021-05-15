import { ApiProperty } from '@nestjs/swagger'

export class CreateRenderDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  config: any;
  @ApiProperty()
  cards: any[]
}