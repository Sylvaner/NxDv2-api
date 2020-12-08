import { ApiProperty } from '@nestjs/swagger'

export class CreateZoneDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  children: string[];
}