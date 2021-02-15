import { ApiProperty } from '@nestjs/swagger'

export class UpdateCategoryDTO {
    @ApiProperty()
    category: string;
    @ApiProperty()
    config: object;
}