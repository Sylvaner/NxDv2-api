import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { LightStateService } from './lightState.service';

@Controller('light/state')
export class LightStateController {
  constructor(private lightStateService: LightStateService) { }

  @Get('/')
  async findAll(@Res() res) {
    const lights = await this.lightStateService.findAll();
    return res.status(HttpStatus.OK).json(
      lights
    )
  }
}
