import { ApiProperty } from '@nestjs/swagger'

export class UpdateTypeDTO {
    @ApiProperty()
    category: string;
    @ApiProperty()
    config: object;
}