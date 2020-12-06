import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { LightService } from './light.service';

@Controller('light')
export class LightController {
  constructor(private lightService: LightService) { }

  @Get('/')
  async findAll(@Res() res) {
    const lights = await this.lightService.findAll();
    return res.status(HttpStatus.OK).json(
      lights
    )
  }

  @Get('/:lightId')
  async findById(@Res() res, @Param() params) {
    const light = await this.lightService.findById(params.lightId);
    return res.status(HttpStatus.OK).json(
      light
    )
  }
}
