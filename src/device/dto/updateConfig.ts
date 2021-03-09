import { ApiProperty } from '@nestjs/swagger'

export class UpdateConfigDTO {
    @ApiProperty()
    config: any;
}