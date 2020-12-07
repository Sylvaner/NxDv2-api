import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) { }

  @Get('/')
  async findAll(@Res() res) {
    const devices = await this.deviceService.findAll();
    return res.status(HttpStatus.OK).json(
      devices
    )
  }

  @Get('/:deviceId')
  async findById(@Res() res, @Param() params) {
    const device = await this.deviceService.findById(params.deviceId);
    return res.status(HttpStatus.OK).json(
      device
    )
  }
}
