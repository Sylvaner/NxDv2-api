import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { LightStateService } from './lightState.service';

@Controller('light')
export class LightStateController {
  constructor(private lightStateService: LightStateService) { }

  @Get('/:lightId/state')
  async findById(@Res() res, @Param() params) {
    const lightState = await this.lightStateService.findByObjectId(params.lightId);
    return res.status(HttpStatus.OK).json(
      lightState
    )
  }
}
